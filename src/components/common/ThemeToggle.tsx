import { IconButton, Tooltip } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../theme/ThemeProvider";

type ThemeToggleProps = {
  size?: "small" | "medium" | "large";
  color?: string;
};

export const ThemeToggle = ({ size = "medium", color }: ThemeToggleProps) => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Tooltip
      title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <IconButton
        onClick={toggleTheme}
        aria-label="toggle theme"
        size={size}
        sx={{
          color: color || (mode === "light" ? "inherit" : "white"),
        }}
      >
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};
