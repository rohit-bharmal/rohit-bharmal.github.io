import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../theme/ThemeContext";

const ThemeToggle = () => {
  const { mode, toggleColorMode } = useTheme();

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        sx={{
          ml: 1,
          "&:hover": {
            color: (theme) => theme.palette.primary.main,
          },
        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
