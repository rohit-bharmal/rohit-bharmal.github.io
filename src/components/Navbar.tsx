import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  useMediaQuery,
  useTheme,
  Container,
  Badge,
  Avatar,
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
import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme as useThemeContext } from "../theme/ThemeContext";

const navItems = [
  { label: "Home", to: "/", icon: "🏠" },
  { label: "About", to: "/about", icon: "👨‍💻" },
  { label: "Projects", to: "/projects", icon: "🚀" },
  { label: "Experience", to: "/experience", icon: "💼" },
  { label: "Contact", to: "/contact", icon: "📧" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavButton = ({
    item,
    mobile = false,
  }: {
    item: (typeof navItems)[0];
    mobile?: boolean;
  }) => {
    const isActive = location.pathname === item.to;

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          component={RouterLink}
          to={item.to}
          onClick={() => mobile && setMobileOpen(false)}
          sx={{
            position: "relative",
            px: { xs: 2, md: 3 },
            py: { xs: 1.5, md: 1 },
            mx: mobile ? 0 : 0.5,
            my: mobile ? 1 : 0,
            borderRadius: "16px",
            textTransform: "none",
            fontWeight: 600,
            fontSize: { xs: "1rem", md: "0.95rem" },
            color: isActive
              ? theme.palette.primary.main
              : theme.palette.text.primary,
            background: isActive
              ? theme.palette.mode === "light"
                ? "rgba(99, 102, 241, 0.1)"
                : "rgba(139, 92, 246, 0.1)"
              : "transparent",
            backdropFilter: isActive ? "blur(10px)" : "none",
            border: isActive
              ? `2px solid ${theme.palette.primary.main}20`
              : "2px solid transparent",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&::before": {
              content: `"${item.icon}"`,
              marginRight: 1,
              fontSize: mobile ? "1.2rem" : "1rem",
            },
            "&:hover": {
              background:
                theme.palette.mode === "light"
                  ? "rgba(99, 102, 241, 0.15)"
                  : "rgba(139, 92, 246, 0.15)",
              transform: "translateY(-2px)",
              boxShadow:
                theme.palette.mode === "light"
                  ? "0 8px 25px rgba(99, 102, 241, 0.25)"
                  : "0 8px 25px rgba(139, 92, 246, 0.25)",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -2,
              left: "50%",
              transform: "translateX(-50%)",
              width: isActive ? "80%" : "0%",
              height: "3px",
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(90deg, #6366f1, #ec4899)"
                  : "linear-gradient(90deg, #8b5cf6, #f59e0b)",
              borderRadius: "2px",
              transition: "width 0.3s ease",
            },
          }}
        >
          {item.label}
        </Button>
      </motion.div>
    );
  };

  const MobileDrawer = (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <Box
        sx={{
          width: 300,
          height: "100vh",
          background:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(15, 15, 35, 0.95)",
          backdropFilter: "blur(20px)",
          border: `1px solid ${
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(148, 163, 184, 0.1)"
          }`,
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Mobile Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            pb: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              background:
                theme.palette.mode === "light"
                  ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                  : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 800,
            }}
          >
            Rohit Bharmal
          </Typography>
          <IconButton
            onClick={() => setMobileOpen(false)}
            sx={{
              background:
                theme.palette.mode === "light"
                  ? "rgba(99, 102, 241, 0.1)"
                  : "rgba(139, 92, 246, 0.1)",
              "&:hover": {
                background:
                  theme.palette.mode === "light"
                    ? "rgba(99, 102, 241, 0.2)"
                    : "rgba(139, 92, 246, 0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Mobile Navigation */}
        <Box sx={{ flex: 1 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <NavButton item={item} mobile />
            </motion.div>
          ))}
        </Box>

        {/* Mobile Footer */}
        <Box
          sx={{
            pt: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <IconButton
            href="https://github.com/rohit-bharmal"
            target="_blank"
            sx={{ color: theme.palette.text.secondary }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://linkedin.com/in/rohitbharmal"
            target="_blank"
            sx={{ color: theme.palette.text.secondary }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            href="mailto:rohitbharmal01@gmail.com"
            sx={{ color: theme.palette.text.secondary }}
          >
            <Email />
          </IconButton>
        </Box>
      </Box>
    </motion.div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.8)"
              : "rgba(15, 15, 35, 0.8)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? `1px solid ${
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(148, 163, 184, 0.1)"
              }`
            : "none",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          py: { xs: 0.5, md: 1 },
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              px: { xs: 2, md: 0 },
              minHeight: { xs: "64px", md: "80px" },
            }}
          >
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Box
                component={RouterLink}
                to="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  gap: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                        : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                    color: "white",
                    fontWeight: 800,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                  }}
                >
                  RB
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    background:
                      theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #6366f1 0%, #ec4899 100%)"
                        : "linear-gradient(135deg, #8b5cf6 0%, #f59e0b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 800,
                    fontSize: { sm: "1.3rem", md: "1.5rem" },
                  }}
                >
                  Rohit Bharmal
                </Typography>
              </Box>
            </motion.div>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background:
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(30, 41, 59, 0.7)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  border: `1px solid ${
                    theme.palette.mode === "light"
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(148, 163, 184, 0.2)"
                  }`,
                  px: 1,
                  py: 0.5,
                }}
              >
                {navItems.map((item) => (
                  <NavButton key={item.label} item={item} />
                ))}
              </Box>
            )}

            {/* Right Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={toggleColorMode}
                  sx={{
                    background:
                      theme.palette.mode === "light"
                        ? "rgba(99, 102, 241, 0.1)"
                        : "rgba(139, 92, 246, 0.1)",
                    border: `1px solid ${
                      theme.palette.mode === "light"
                        ? "rgba(99, 102, 241, 0.2)"
                        : "rgba(139, 92, 246, 0.2)"
                    }`,
                    "&:hover": {
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(139, 92, 246, 0.2)",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </motion.div>

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    onClick={() => setMobileOpen(true)}
                    sx={{
                      background:
                        theme.palette.mode === "light"
                          ? "rgba(99, 102, 241, 0.1)"
                          : "rgba(139, 92, 246, 0.1)",
                      border: `1px solid ${
                        theme.palette.mode === "light"
                          ? "rgba(99, 102, 241, 0.2)"
                          : "rgba(139, 92, 246, 0.2)"
                      }`,
                      "&:hover": {
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(99, 102, 241, 0.2)"
                            : "rgba(139, 92, 246, 0.2)",
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                background: "transparent",
                boxShadow: "none",
              },
            }}
          >
            {MobileDrawer}
          </Drawer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
