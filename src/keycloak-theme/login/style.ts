import { Theme } from "@mui/material";

// Paper styles
export const paperStyles = (mode: string) => ({
  bgcolor: "background.paper",
  boxShadow:
    mode === "dark"
      ? "0 8px 32px rgba(0, 0, 0, 0.5)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
});

// Card content styles
export const cardContentStyles = {
  p: 4,
};

// Title container styles
export const titleContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 3,
};

// Title text styles
export const titleTextStyles = (mode: string) => ({
  fontWeight: "medium",
  color: mode === "dark" ? "white" : "black",
});

// QR button styles
export const qrButtonStyles = (mode: string) => ({
  display: "flex",
  alignItems: "center",
  px: 2,
  py: 1,
  backgroundColor: mode === "dark" ? "#423500" : "#FFF9E6",
  border: "2px solid #FFA500",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    boxShadow: "0 0 0 2px #FFCF66",
  },
});

// QR text styles
export const qrTextStyles = {
  color: "#FFA500",
  fontWeight: 500,
  mr: 1,
};

// Dialog close button styles
export const dialogCloseButtonStyles = {
  position: "absolute",
  right: 8,
  top: 8,
};

// Dialog content styles
export const dialogContentStyles = {
  display: "flex",
  justifyContent: "center",
  p: 4,
};

// Text field styles
export const getTextFieldStyles = (theme: Theme, hasError: boolean) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: hasError ? theme.palette.error.main : theme.palette.divider,
    },
    "&:hover fieldset": {
      borderColor: hasError ? theme.palette.error.main : theme.palette.divider,
    },
    "&.Mui-focused fieldset": {
      borderColor: hasError ? theme.palette.error.main : theme.palette.divider,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.disabled, // always gray
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.text.disabled, // still gray on focus
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: theme.palette.error.main, // red on error (optional)
  },
});

// Login button styles
export const loginButtonStyles = {
  mt: 1,
  py: 1.2,
  backgroundColor: "#EE4D2D",
  fontWeight: "medium",
  "&:disabled": {
    backgroundColor: "#f4826c",
    color: "white",
  },
};

// Account links container styles
export const accountLinksContainerStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 2,
};

// Divider text styles
export const dividerTextStyles = {
  px: 1,
};

// Social button styles
export const socialButtonStyles = {
  color: "black",
  borderRadius: 1,
  textTransform: "none",
  justifyContent: "center",
  borderColor: "divider",
};

// Social icon container styles
export const socialIconContainerStyles = {
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mr: 1,
};

// Registration prompt container styles
export const registrationPromptContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mt: 4,
};

// Registration text styles
export const registrationTextStyles = {
  px: 1,
};

// Registration link styles
export const registrationLinkStyles = {
  underline: "hover",
  color: "#EE4D2D",
  fontWeight: "bold",
};
