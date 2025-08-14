// src/components/CompactNavbar.tsx - Small hamburger navbar in right corner
import React, { useState, useEffect } from "react";
import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4,
  Brightness7,
  GitHub,
  LinkedIn,
  Email,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme as useThemeContext } from "../theme/ThemeContext";

const navItems = [
  { label: "Home", id: "home", icon: "🏠" },
  { label: "About", id: "about", icon: "👨‍💻" },
  { label: "Experience", id: "experience", icon: "💼" },
  { label: "Projects", id: "projects", icon: "🚀" },
  { label: "Contact", id: "contact", icon: "📧" },
];

const socialLinks = [
  {
    icon: <GitHub />,
    href: "https://github.com/rohit-bharmal",
    label: "GitHub",
  },
  {
    icon: <LinkedIn />,
    href: "https://www.linkedin.com/in/rohitbharmal/",
    label: "LinkedIn",
  },
  { icon: <Email />, href: "mailto:rohitbharmal01@gmail.com", label: "Email" },
];

const CompactNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Compact Hamburger Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1300,
        }}
      >
        <IconButton
          onClick={() => setMobileOpen(true)}
          sx={{
            width: 48,
            height: 48,
            background:
              theme.palette.mode === "light"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(15, 23, 42, 0.9)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${
              theme.palette.mode === "light"
                ? "rgba(30, 64, 175, 0.2)"
                : "rgba(59, 130, 246, 0.2)"
            }`,
            color: theme.palette.primary.main,
            boxShadow:
              theme.palette.mode === "light"
                ? "0 4px 20px rgba(30, 64, 175, 0.15)"
                : "0 4px 20px rgba(59, 130, 246, 0.15)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "scale(1.1)",
              background:
                theme.palette.mode === "light"
                  ? "rgba(30, 64, 175, 0.1)"
                  : "rgba(59, 130, 246, 0.1)",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 8px 30px rgba(30, 64, 175, 0.25)"
                  : "0 8px 30px rgba(59, 130, 246, 0.25)",
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      </motion.div>

      {/* Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 320,
                background:
                  theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.95)"
                    : "rgba(15, 23, 42, 0.95)",
                backdropFilter: "blur(20px)",
                border: `1px solid ${
                  theme.palette.mode === "light"
                    ? "rgba(203, 213, 225, 0.3)"
                    : "rgba(71, 85, 105, 0.3)"
                }`,
              },
            }}
          >
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Box
                sx={{
                  p: 3,
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)"
                          : "linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 700,
                    }}
                  >
                    Portfolio
                  </Typography>
                  <IconButton
                    onClick={() => setMobileOpen(false)}
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(30, 64, 175, 0.1)"
                          : "rgba(59, 130, 246, 0.1)",
                      "&:hover": {
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(30, 64, 175, 0.2)"
                            : "rgba(59, 130, 246, 0.2)",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                {/* Navigation Items */}
                <Box sx={{ flex: 1 }}>
                  <List sx={{ p: 0 }}>
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <ListItem
                          button
                          onClick={() => scrollToSection(item.id)}
                          sx={{
                            borderRadius: "12px",
                            mb: 1,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              background:
                                theme.palette.mode === "light"
                                  ? "rgba(30, 64, 175, 0.08)"
                                  : "rgba(59, 130, 246, 0.08)",
                              transform: "translateX(8px)",
                            },
                          }}
                        >
                          <Box sx={{ mr: 2, fontSize: "1.2rem" }}>
                            {item.icon}
                          </Box>
                          <ListItemText
                            primary={item.label}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                              },
                            }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Theme Toggle */}
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                  <IconButton
                    onClick={toggleColorMode}
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(30, 64, 175, 0.1)"
                          : "rgba(59, 130, 246, 0.1)",
                      border: `1px solid ${
                        theme.palette.mode === "light"
                          ? "rgba(30, 64, 175, 0.2)"
                          : "rgba(59, 130, 246, 0.2)"
                      }`,
                      "&:hover": {
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(30, 64, 175, 0.2)"
                            : "rgba(59, 130, 246, 0.2)",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                  </IconButton>
                </Box>

                {/* Social Links */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                    >
                      <IconButton
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          background:
                            theme.palette.mode === "light"
                              ? "rgba(255, 255, 255, 0.8)"
                              : "rgba(30, 41, 59, 0.8)",
                          border: `1px solid ${
                            theme.palette.mode === "light"
                              ? "rgba(30, 64, 175, 0.2)"
                              : "rgba(59, 130, 246, 0.2)"
                          }`,
                          color: theme.palette.text.secondary,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            color: theme.palette.primary.main,
                            borderColor: theme.palette.primary.main,
                            background:
                              theme.palette.mode === "light"
                                ? "rgba(30, 64, 175, 0.1)"
                                : "rgba(59, 130, 246, 0.1)",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </motion.div>
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default CompactNavbar;
