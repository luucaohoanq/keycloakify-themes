// style.ts
import { SxProps, Theme } from "@mui/material";

export const paperStyle: SxProps<Theme> = {
  bgcolor: "background.paper",
  borderRadius: 3,
  px: { xs: 3, sm: 6 },
  py: 5,
  width: "100%",
  maxWidth: 420,
  mx: "auto",
};

export const titleTextStyle: SxProps<Theme> = {
  textAlign: "center",
};

export const subtitleTextStyle: SxProps<Theme> = {
  mt: 1,
};

export const credentialTitleStyle: SxProps<Theme> = {
  mb: 1,
  color: "text.secondary",
  fontWeight: 500,
};

export const loginButtonStyle: SxProps<Theme> = {
  textTransform: "none",
  py: 1.5,
  borderRadius: 2,
};
