import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { ThemeProvider, ThemeMode } from "../theme/ThemeProvider";

type MultiThemeViewProps = {
  children: ReactNode;
  title?: string;
};

export const MultiThemeView = ({ children, title }: MultiThemeViewProps) => {
  return (
    <Box>
      {title && (
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          "& > *": {
            flex: 1,
          },
        }}
      >
        <Box>
          <Typography variant="h6" mb={2} align="center">
            Light Theme
          </Typography>
          <ThemeProvider>
            <ForcedTheme mode="light">{children}</ForcedTheme>
          </ThemeProvider>
        </Box>
        <Box>
          <Typography variant="h6" mb={2} align="center">
            Dark Theme
          </Typography>
          <ThemeProvider>
            <ForcedTheme mode="dark">{children}</ForcedTheme>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );
};

// Component to force a specific theme
const ForcedTheme = ({
  children,
  mode,
}: {
  children: ReactNode;
  mode: ThemeMode;
}) => {
  return (
    <div className={`${mode}-theme`} style={{ overflow: "hidden" }}>
      {children}
    </div>
  );
};
