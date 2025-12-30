import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Fade,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme as useThemeContext } from "../../theme/ThemeContext";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const FloatingNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, toggleColorMode } = useThemeContext();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrolled = currentScrollY > 20;
      
      setScrolled(isScrolled);
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

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

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={() => setMobileOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} button onClick={() => scrollToSection(item.id)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <IconButton onClick={toggleColorMode}>
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
          >
            <AppBar
              position="static"
              elevation={0}
              sx={{
                backgroundColor: scrolled
                  ? theme.palette.mode === "light"
                    ? "rgba(255, 255, 255, 0.8)"
                    : "rgba(15, 23, 42, 0.8)"
                  : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? `1px solid ${theme.palette.divider}` : "none",
                transition: "all 0.3s ease-in-out",
                borderRadius: scrolled ? 0 : "0px",
                border: scrolled ? "none" : "none",
                boxShadow: scrolled 
                  ? "none" 
                  : theme.palette.mode === "light"
                    ? "0 8px 32px rgba(0, 0, 0, 0.1)"
                    : "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Toolbar sx={{ 
                justifyContent: "space-between",
                px: { xs: 2, sm: 3, md: 4 },
                py: 1
              }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    cursor: "pointer",
                  }}
                  onClick={() => scrollToSection("home")}
                >
                  Rohit Bharmal
                </Typography>

                {!isMobile ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        sx={{
                          color: theme.palette.text.primary,
                          textTransform: "none",
                          fontWeight: 500,
                          borderRadius: "8px",
                          px: 2,
                          "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                            transform: "translateY(-1px)",
                          },
                          transition: "all 0.2s ease-in-out",
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                    <IconButton 
                      onClick={toggleColorMode} 
                      sx={{ 
                        ml: 1,
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setMobileOpen(true)}
                  >
                    <MenuIcon />
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>
          </motion.div>
        )}
      </AnimatePresence>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};
