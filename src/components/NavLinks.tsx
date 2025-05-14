import { Stack, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NavLinks = () => {
  const location = useLocation();

  return (
    <Stack
      direction="row"
      spacing={4}
      alignItems="center"
      sx={{
        position: "fixed",
        top: 40,
        right: 40,
        zIndex: 1000,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(10, 25, 47, 0.9)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        padding: "8px 16px",
      }}
    >
      {[
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/projects", label: "Projects" },
        { path: "/contact", label: "Contact" },
      ].map(({ path, label }) => (
        <Button
          key={path}
          component={Link}
          to={path}
          sx={{
            color: (theme) =>
              location.pathname === path
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
            textDecoration: "none",
            position: "relative",
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              backgroundColor: "transparent",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: location.pathname === path ? "100%" : "0%",
              height: "2px",
              bottom: -2,
              left: 0,
              backgroundColor: (theme) => theme.palette.primary.main,
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
  );
};

export default NavLinks;
