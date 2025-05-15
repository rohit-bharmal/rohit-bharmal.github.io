import {
  Stack,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import ThemeToggle from "./ThemeToggle";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const NavLinks = () => {
  const theme: Theme = useTheme();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = isMobile ? 56 : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      if (mobileOpen) {
        handleDrawerToggle();
      }
    }
  };

  const drawer = (
    <List>
      {navItems.map(({ id, label }) => (
        <ListItem
          key={id}
          onClick={() => scrollToSection(id)}
          sx={{
            color: theme.palette.text.secondary,
            cursor: "pointer",
            "&:hover": {
              color: theme.palette.primary.main,
            },
          }}
        >
          <ListItemText primary={label} />
        </ListItem>
      ))}
      <ListItem>
        <ThemeToggle />
      </ListItem>
    </List>
  );

  if (isMobile) {
    return (
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: "100%",
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(10, 25, 47, 0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", padding: 0 }}>
            <Typography
              variant="h6"
              onClick={() => scrollToSection("home")}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              RB
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(10, 25, 47, 0.95)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <Stack
        direction="row"
        spacing={4}
        alignItems="center"
        sx={{
          position: "absolute",
          top: 40,
          right: 0,
          backgroundColor: (theme: Theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(10, 25, 47, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          padding: "8px 16px",
          margin: 0,
        }}
      >
        {navItems.map(({ id, label }) => (
          <Button
            key={id}
            onClick={() => scrollToSection(id)}
            sx={{
              color: (theme: Theme) => theme.palette.text.secondary,
              textDecoration: "none",
              position: "relative",
              "&:hover": {
                color: (theme: Theme) => theme.palette.primary.main,
                backgroundColor: "transparent",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: -2,
                left: 0,
                backgroundColor: (theme: Theme) => theme.palette.primary.main,
                transition: "width 0.3s ease-in-out",
              },
              "&:hover::after": {
                width: "100%",
              },
            }}
          >
            {label}
          </Button>
        ))}
        <ThemeToggle />
      </Stack>
    </Container>
  );
};

export default NavLinks;
