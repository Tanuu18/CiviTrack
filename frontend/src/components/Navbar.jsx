import React from 'react'
import { useState } from 'react';
import { Typography, Button, Box, IconButton } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import "./Navbar.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    handleProfileClose();
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "0 30px",
            boxSizing: "border-box",
            height: "72px",
            display: "flex",
            position: "relative",
            alignItems: "center",

          }}
        >
          <Box sx={{
            display: "flex", alignItems: "center", gap: "10px"
          }}>
            <Box sx={{
              width: "42px",
              height: "42px",
              backgroundColor: "#0f9d58",
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <LocationCityIcon sx={{
                color: "white",
                fontSize: "25px",
                transform: "rotate(45deg)",
              }} />
            </Box>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#0f3d63",
              letterSpacing: "1px",
              //flexGrow:1,
            }}>CIVI<span className="track">TRACK</span>
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "24px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button sx={{
                color: "#17202a", fontSize: "16px", fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#0a6732",
                  backgroundColor: "#87d5ac",
                  fontWeight: 600,
                  borderRadius: "8px"
                }
              }}>{t("home")}</Button>
            </Link>
            <Link to="how-it-works" style={{ textDecoration: "none" }}>
              <Button sx={{
                color: "#17202a", fontSize: "16px", fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#0a6732",
                  backgroundColor: "#87d5ac",
                  fontWeight: 600,
                  borderRadius: "8px"
                }
              }}>{t("howItWorks")}</Button>
            </Link>
            {/* <Link to="issues" style={{ textDecoration: "none" }}>
              <Button sx={{
                color: "#17202a", fontSize: "16px", fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#0a6732",
                  backgroundColor: "#87d5ac",
                  fontWeight: 600,
                  borderRadius: "8px"
                }
              }}>{t("issues")}</Button>
            </Link> */}
            <Link to="community-feed" style={{ textDecoration: "none" }}>
              <Button sx={{
                color: "#17202a", fontSize: "16px", fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#0a6732",
                  backgroundColor: "#87d5ac",
                  fontWeight: 600,
                  borderRadius: "8px"
                }
              }}>{t("communityFeed")}</Button>
            </Link>

            {user && user.role === "citizen" && (
              <Link to="my-complaints" style={{ textDecoration: "none" }}>
                <Button sx={{
                color: "#17202a", fontSize: "16px", fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  color: "#0a6732",
                  backgroundColor: "#87d5ac",
                  fontWeight: 600,
                  borderRadius: "8px"
                }
              }}> {t("myComplaints")}</Button>
               
              </Link>
            )}

            <Link to="about" style={{ textDecoration: "none" }}>
              <Button sx={{
                color: "#17202a", fontSize: "16px", fontWeight: 500, textTransform: "none",
                "&:hover": {
                  color: "#0a6732",
                  backgroundColor: "#87d5ac",
                  fontWeight: 600,
                  borderRadius: "8px"
                }
              }}>{t("aboutUs")}</Button>
            </Link>
            <Button
              onClick={() => {
                const newLanguage = i18n.language === "en" ? "hi" : "en";

                i18n.changeLanguage(newLanguage);
                localStorage.setItem("language", newLanguage);
              }
              }
              sx={{
                color: "#17202a",
                fontSize: "14px",
                textTransform: "none",
                border: "1px solid #87d5ac",
                borderRadius: "8px",
              }}
            >
              {i18n.language === "en" ? "हिंदी" : "English"}
            </Button>

          </Box>
          <Box sx={{
            position: "absolute", right: "30px",
            display: { xs: "none", md: "flex" }, alignItems: "center", gap: "12px"
          }}>
            {/* <Link to="login" >

              <Button variant='outlined' sx={{
                color: "#0f7a3d",
                borderColor: "#0f7a3d",
                fontWeight: 600,
                textTransform: "none",
                marginRight: "50px",
                "&:hover": {
                  backgroundColor: "#e8f5ee",
                  borderColor: "#0f7a3d"
                }
              }}>{t("login")}</Button>
            </Link> */}
            {!user ? (
              <Link to="login">
                <Button variant="outlined" fullWidth
                //   sx={{
                //     color: "#0f7a3d",
                //     borderColor: "#0f7a3d",
                //     fontWeight: 600,
                //     textTransform: "none",
                //     marginRight: "50px"
                //   }
                // }
                >
                  {t("login")}
                </Button>
              </Link>
            ) : (

              <Avatar onClick={handleProfileClick}
                sx={{ width: 36, height: 36, bgcolor: "#15966f", cursor: "pointer" }}>
                {user.name?.charAt(0)?.toUpperCase() ||
                  user.fullName?.charAt(0)?.toUpperCase() ||
                  <PersonIcon />}
              </Avatar>

            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography fontWeight={600}>
                {user?.name || user?.fullName || "Citizen"}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
          {/* Mobile Hamburger Button */}

          <IconButton
            onClick={() => setMenuOpen(!menuOpen)}
            sx={{
              display: { xs: "flex", md: "none" },
              color: "#0f3d63",
              marginLeft: "auto"
            }}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        {/* Mobile Navigation Menu */}

        {menuOpen && (
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              position: "absolute",
              top: "72px",
              right: 0,
              width: "220px",
              backgroundColor: "#ffffff",
              padding: "15px 20px",
              boxSizing: "border-box",
              gap: "10px",
              borderTop: "1px solid #e2e8f0",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              zIndex: 1000
            }}
          >

            <Link to="/" onClick={() => setMenuOpen(false)}>
              <Button fullWidth>{t("home")}</Button>
            </Link>

            <Link to="how-it-works" onClick={() => setMenuOpen(false)}>
              <Button fullWidth>{t("howItWorks")}</Button>
            </Link>

            <Link to="community-feed" onClick={() => setMenuOpen(false)}>
              <Button fullWidth>{t("communityFeed")}</Button>
            </Link>

            <Link to="about" onClick={() => setMenuOpen(false)}>
              <Button fullWidth>{t("aboutUs")}</Button>
            </Link>

            <Button
              fullWidth
              onClick={() => {
                const newLanguage = i18n.language === "en" ? "hi" : "en";
                i18n.changeLanguage(newLanguage);
                localStorage.setItem("language", newLanguage);
              }}
            >
              {i18n.language === "en" ? "हिंदी" : "English"}
            </Button>

            {/* <Link to="login" onClick={() => setMenuOpen(false)}>
              <Button fullWidth variant="outlined">
                {t("login")}
              </Button>
            </Link> */}
            {!user ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                style={{ textDecoration: "none" }}
              >
                <Button fullWidth variant="outlined">
                  {t("login")}
                </Button>
              </Link>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                onClick={(event) => {
                  setMenuOpen(false);
                  handleProfileClick(event);
                }}
              >
                My Profile
              </Button>
            )}
          </Box>
        )}
      </Box>

    </>
  )
}

export default Navbar
