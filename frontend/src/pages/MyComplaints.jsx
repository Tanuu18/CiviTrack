
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ClipboardList,
    Clock,
    CheckCircle,
    AlertCircle,
    MapPin,
    Pencil,
    Trash2,
    X,
    ImagePlus,
    Loader
} from "lucide-react";

import api from "../utils/axios";
import "./MyComplaints.css";
import { useTranslation } from "react-i18next";


const MyComplaints = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingComplaint, setEditingComplaint] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        image: null
    });

    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [deletingComplaint, setDeletingComplaint] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const complaintsPerPage = 4;

    const totalPages = Math.ceil(
        complaints.length / complaintsPerPage
    );

    const startIndex = (currentPage - 1) * complaintsPerPage;

    const currentComplaints = complaints.slice(
        startIndex,
        startIndex + complaintsPerPage
    );
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const showToast = (type, message) => {
        setToast({ type, message });
    };

    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [toast]);

    // Fetch citizen's complaints
    const fetchComplaints = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/complaints/my");

            setComplaints(response.data.complaints || []);
        } catch (err) {
            console.error("Fetch complaints error:", err);
            setError(
                err.response?.data?.message ||
                "Unable to fetch your complaints."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // Calculate dashboard statistics
    const total = complaints.length;

    const pending = complaints.filter(
        (c) => c.status === "Pending"
    ).length;

    const inProgress = complaints.filter(
        (c) =>
            c.status === "In Progress" ||
            c.status === "Assigned"
    ).length;

    const resolved = complaints.filter(
        (c) => c.status === "Resolved"
    ).length;

    // Open edit form
    const handleEdit = (complaint) => {
        setEditingComplaint(complaint);

        setFormData({
            title: complaint.title || "",
            description: complaint.description || "",
            category: complaint.category || "",
            location: complaint.location || "",
            image: null
        });
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const data = new FormData();

            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("location", formData.location);

            if (formData.image) {
                data.append("image", formData.image);
            }

            await api.put(
                `/complaints/my/${editingComplaint._id}`,
                data
            );

            setEditingComplaint(null);

            await fetchComplaints();

            showToast("success", t("myComplaints2.toast.updated"));
        } catch (err) {
            console.error("Update complaint error:", err);

            showToast(
                "error",
                err.response?.data?.message ||
                t("myComplaints2.errors.update")
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingComplaint) return;

        try {
            setDeleting(true);

            await api.delete(
                `/complaints/my/${deletingComplaint._id}`
            );

            setComplaints((prev) =>
                prev.filter(
                    (complaint) =>
                        complaint._id !== deletingComplaint._id
                )
            );

            setDeletingComplaint(null);

            showToast("success", t("myComplaints2.toast.deleted"));
        } catch (err) {
            console.error("Delete complaint error:", err);

            showToast(
                "error",
                err.response?.data?.message ||
                "Unable to delete complaint."
            );
        } finally {
            setDeleting(false);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "pending";

            case "Assigned":
                return "assigned";

            case "In Progress":
                return "in-progress";

            case "Resolved":
                return "resolved";

            default:
                return "pending";
        }
    };

    const formatDate = (date) => {
        if (!date) return "Date unavailable";

        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    if (loading) {
        return (
            <div className="my-complaints-loading">
                <Loader size={30} className="loading-icon" />
                <p>Loading your complaints...</p>
            </div>
        );
    }

    return (
        <div className="my-complaints-page">

            {/* Page Header */}
            <div className="my-complaints-header">
                <div>
                    <h1>{t("myComplaints2.title")}</h1>
                    <p>{t("myComplaints2.subtitle")}</p>
                </div>

                <button
                    className="report-new-btn"
                    onClick={() => navigate("/report-issue")}
                >
                    {t("myComplaints2.reportNewIssue")}
                </button>
            </div>

            {error && (
                <div className="complaint-error">
                    {error}
                    <button onClick={fetchComplaints}>{t("myComplaints.retry")}</button>
                </div>
            )}

            {/* Statistics */}
            <div className="complaint-stats">

                <div className="stat-card">
                    <div className="stat-icon blue">
                        <ClipboardList />
                    </div>
                    <p>{t("myComplaints2.stats.total")}</p>
                    <h2>{total}</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        <Clock />
                    </div>
                    <p>{t("myComplaints2.stats.pending")}</p>
                    <h2>{pending}</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        <AlertCircle />
                    </div>
                    <p>{t("myComplaints2.stats.inProgress")}</p>
                    <h2>{inProgress}</h2>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        <CheckCircle />
                    </div>
                    <p>{t("myComplaints2.stats.resolved")}</p>
                    <h2>{resolved}</h2>
                </div>

            </div>

            {/* Complaints List */}
            <div className="my-reports-section">

                <div className="reports-heading">
                    <h2>{t("myComplaints2.yourReports")}</h2>
                    <span>{t("myComplaints2.complaintsCount", { count: total })}</span>
                </div>

                {complaints.length === 0 ? (
                    <div className="no-complaints">
                        <ClipboardList size={45} />
                        <h3>{t("myComplaints2.empty.title")}</h3>
                        <p>
                            {t("myComplaints2.empty.description")}
                        </p>

                        <button
                            onClick={() => navigate("/report-issue")}
                        >
                            {t("myComplaints2.empty.button")}
                        </button>
                    </div>
                ) : (

                    <div className="complaints-grid">

                        {currentComplaints.map((complaint) => (

                            <div
                                className="my-complaint-card"
                                key={complaint._id}
                            >

                                {complaint.image && (
                                    <img
                                        src={complaint.image}
                                        alt={complaint.title}
                                        className="complaint-card-image"
                                    />
                                )}

                                <div className="complaint-card-content">

                                    <div className="complaint-card-top">
                                        <span className="complaint-category">
                                            {complaint.category}
                                        </span>


                                        <span
                                            className={`complaint-status ${getStatusClass(complaint.status)}`}
                                        >
                                            {t(`myComplaints2.status.${complaint.status === "In Progress" ? "inProgress" : complaint.status.toLowerCase()}`)}
                                        </span>
                                    </div>

                                    <h3>{complaint.title}</h3>

                                    <p className="complaint-description">
                                        {complaint.description}
                                    </p>

                                    <div className="complaint-location">
                                        <MapPin size={15} />
                                        <span>{complaint.location}</span>
                                    </div>

                                    <div className="complaint-card-meta">
                                        <span>
                                            ID:{t("myComplaints2.complaintId")}:{complaint.complaintId}
                                        </span>

                                        <span>
                                            {formatDate(complaint.createdAt)}
                                        </span>
                                    </div>

                                    <div className="complaint-card-actions">

                                        {complaint.status === "Pending" ? (
                                            <>
                                                <button
                                                    className="edit-complaint-btn"
                                                    onClick={() => handleEdit(complaint)}
                                                >
                                                    <Pencil size={16} />
                                                    {t("myComplaints2.actions.edit")}
                                                </button>

                                                <button
                                                    className="delete-complaint-btn"
                                                    onClick={() => setDeletingComplaint(complaint)}
                                                >
                                                    <Trash2 size={16} />
                                                    {t("myComplaints2.actions.delete")}
                                                </button>
                                            </>
                                        ) : (
                                            <span className="action-disabled">
                                                {t("myComplaints2.actions.editUnavailable")}
                                            </span>
                                        )}

                                    </div>

                                </div>
                            </div>

                        ))}

                    </div>

                )}

            </div>
            {complaints.length > complaintsPerPage && (
                <div className="pagination">

                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                    >
                        {t("myComplaints2.pagination.previous")}
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((page) => (
                        <button
                            key={page}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {t("myComplaints2.pagination.next")}
                    </button>

                </div>
            )}


            {/* Toast Message */}
            {toast && (
                <div className={`custom-toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deletingComplaint && (
                <div className="delete-modal-overlay">
                    <div className="delete-confirm-modal">

                        <div className="delete-modal-icon">
                            <Trash2 size={26} />
                        </div>

                        <h2><h2>{t("myComplaints2.deleteModal.title")}</h2></h2>

                        <p>
                            {t("myComplaints2.deleteModal.confirmStart")}{" "}
                            "<strong>{deletingComplaint.title}</strong>"?
                            {t("myComplaints2.deleteModal.warning")}
                        </p>
                        <div className="delete-modal-actions">
                            <button
                                className="cancel-delete-btn"
                                onClick={() => setDeletingComplaint(null)}
                                disabled={deleting}
                            >
                                {t("myComplaints2.actions.cancel")}
                            </button>

                            <button
                                className="confirm-delete-btn"
                                onClick={handleDelete}
                                disabled={deleting}
                            >
                                {deleting ? t("myComplaints2.deleteModal.deleting")
                                    : t("myComplaints2.deleteModal.confirm")}
                            </button>
                        </div>

                    </div>
                </div>
            )}
            {/* Edit Complaint Modal */}
            {editingComplaint && (

                <div className="edit-modal-overlay">

                    <div className="edit-complaint-modal">

                        <div className="edit-modal-header">
                            <div>

                                <h2>{t("myComplaints2.editModal.title")}</h2>
                                <p>{t("myComplaints2.editModal.subtitle")}</p>
                            </div>

                            <button
                                className="close-edit-modal"
                                onClick={() => setEditingComplaint(null)}
                            >
                                <X />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate}>

                            <label>{t("myComplaints2.form.title")}</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                            <label>{t("myComplaints2.form.description")}</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="4"
                            />

                            <label>{t("myComplaints2.form.category")}</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />

                            <label>{t("myComplaints2.form.location")}</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />


                            <label className="image-upload-label">
                                <ImagePlus size={18} />
                                {t("myComplaints2.form.changeImage")}
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                            />

                            <div className="edit-modal-actions">

                                <button
                                    type="button"
                                    className="cancel-edit-btn"
                                    onClick={() => setEditingComplaint(null)}
                                >
                                    {t("myComplaints2.actions.cancel")}
                                </button>

                                <button
                                    type="submit"
                                    className="save-edit-btn"
                                    disabled={saving}
                                >
                                    {saving ? t("myComplaints2.editModal.saving") : t("myComplaints2.editModal.save")}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
};

export default MyComplaints;

