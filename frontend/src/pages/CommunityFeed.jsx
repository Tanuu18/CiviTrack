
import React, { useState, useEffect } from "react";
import "./CommunityFeed.css";
import api from "../utils/axios";
import {useTranslation} from "react-i18next";
const CommunityFeed = () => {
    const {t}=useTranslation();
    const [supportedIds, setSupportedIds] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [area, setArea] = useState("All Areas");
    const [sort, setSort] = useState("Latest");
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const complaintsPerPage = 4;
    const [communityStats, setCommunityStats] = useState({
        totalComplaints: 0,
        totalSupports: 0,
        resolvedIssues: 0,
    });
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await api.get("/complaints/community");

                console.log("Community API Response:", response.data);
                setComplaints(response.data.complaints || []);
                const statsResponse = await api.get("/complaints/community/stats");

                setCommunityStats(statsResponse.data);
                console.log("Trending Categories:", statsResponse.data.trendingCategories);
            } catch (error) {
                console.log("Community Feed Error:", error);
                setError("Failed to load complaints");
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);
    const handleSupport = async (complaint) => {
        try {
            const complaintId = complaint._id;

            if (complaint.isSupported) {
                await api.delete(`/complaints/${complaintId}/support`);
            } else {
                await api.post(`/complaints/${complaintId}/support`);
            }

            // Refresh complaints after successful action
            const response = await api.get("/complaints/community");
            setComplaints(response.data.complaints || []);

        } catch (error) {
            console.error("Support Error:", error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    const filteredComplaints = complaints
        .filter((complaint) => {
            const searchText = search.toLowerCase().trim();

            return (
                complaint.title?.toLowerCase().includes(searchText) ||
                complaint.description?.toLowerCase().includes(searchText) ||
                complaint.category?.toLowerCase().includes(searchText) ||
                complaint.location?.toLowerCase().includes(searchText)
            );
        })
        //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        .sort((a, b) => {
            if (sort === "Oldest") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }

            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    useEffect(() => {
        setCurrentPage(1);
    }, [search, category, area, sort]);
    const totalPages = Math.ceil(
        filteredComplaints.length / complaintsPerPage
    );

    const startIndex = (currentPage - 1) * complaintsPerPage;

    const currentComplaints = filteredComplaints.slice(
        startIndex,
        startIndex + complaintsPerPage
    );
    return (
        <div className="community-page">
            <div className="community-main">

                <div className="community-heading">
                    <h2>👥 {t("communityFeed")}</h2>
                    <p>
                       {t("communityDescription")}
                    </p>
                </div>

                <div className="community-toolbar">
                    <input
                        type="text"
                        placeholder={`🔍 ${t("searchComplaints")}`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />



                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="Latest">{t("latest")}</option>
                        <option value="Most Supported">{t("mostSupported")}</option>
                    </select>
                </div>

                <div className="community-complaints">
                    {filteredComplaints.length > 0 ? (
                        currentComplaints.map((complaint) => (
                            <div className="community-card" key={complaint.id}>
                                <img
                                    src={complaint.image}
                                    alt={complaint.title}
                                    className="community-card-image"
                                />

                                <div className="community-card-content">
                                    <div className="community-card-top">
                                        <h3>{complaint.title}</h3>
                                        <span
                                            className={`complaint-status ${complaint.status === "Open" ?
                                                 "open" : "progress"
                                                }`}
                                        >
                                          { t(`status.${complaint.status}`,complaint.status)}
                                        </span>
                                    </div>

                                    <p className="community-description">
                                        {complaint.description}
                                    </p>
                                    <div className="community-location">
                                        📍 {complaint.location}
                                    </div>
                                    <div className="community-meta">
                                        <span> {complaint.category}</span>
                                        
                                    </div>

                                    <div className="community-card-actions">
                                        <button
                                            className={`support-btn ${complaint.isSupported ? "supported" : ""
                                                }`}
                                            onClick={() => handleSupport(complaint)}
                                        >
                                            👍 {complaint.isSupported
                                                ?t( "supported")
                                                : t("support")}
                                        </button>

                                        <span className="support-count">
                                            👍 {complaint.supportCount} {t("supports")}
                                        </span>

                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-community-results">
                            No complaints found{t("noComplaints")}
                        </p>
                    )}
                </div>


                <div className="community-pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                    >
                        ‹ {t("previous")}
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={currentPage === index + 1 ? "current-page" : ""}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages || totalPages === 0}
                    >
                       {t("next")}›
                    </button>
                </div>
            </div>

            <aside className="community-sidebar">

                <div className="support-info-box">
                    <h3>📢{t("yourSupport")}</h3>
                    <p>
                        {t("supportInfo")}
                    </p>
                </div>

                <div className="community-stats-box">
                    <h3>📊 {t("communityStats")}</h3>
                    <p>
                        ▤ {t("totalComplaints")}
                        <strong>{communityStats.totalComplaints}</strong>
                    </p>

                    <p>
                        👍 {t("totalSupports")}
                        <strong>{communityStats.totalSupports}</strong>
                    </p>

                    <p>
                        🟢 {t("resolvedIssues")}
                        <strong>{communityStats.resolvedIssues}</strong>
                    </p>
                </div>

                <div className="trending-box">
                    <h3>🔥 {t("trendingCategories")}</h3>
                    <div className="trending-box">

                        {communityStats.trendingCategories?.map((item) => (
                            <p key={item._id}>
                                {item._id} - {item.count}
                            </p>
                        ))}
                    </div>
                </div>

            </aside>
        </div>
    );
};

export default CommunityFeed;
