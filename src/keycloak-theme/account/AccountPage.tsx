// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Box,
  Button,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useThemeContext } from "../../theme/ThemeProvider";
import { PageProps } from "../../types";
import { AccountTemplate } from "./AccountTemplate";

const AccountPage = (props: PageProps<"account.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { kcContext, i18n } = props;
  const { url, realm, messagesPerField, stateChecker, account, referrer } =
    kcContext;
  const { msgStr } = i18n;
  const { mode } = useThemeContext();
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent, action: string) => {
    if (action === "Save") {
      setLoading(true);
    }
    // The form will naturally submit to Keycloak backend
  };

  return (
    <AccountTemplate i18n={i18n} kcContext={kcContext} active="account">
      <Box mb={4}>
        <Typography variant="h4" gutterBottom fontWeight="medium">
          {msgStr("editAccountHtmlTitle", "Edit Account")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {msgStr(
            "editAccountSubtitle",
            "Update your account information and preferences"
          )}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" fontWeight="medium">
              {msgStr("personalInfo", "Personal Information")}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              <span style={{ color: theme.palette.error.main }}>*</span>{" "}
              {msgStr("requiredFields", "Required fields")}
            </Typography>
          </Box>

          <Box component="form" action={url.accountUrl} method="post" p={3}>
            <input
              type="hidden"
              id="stateChecker"
              name="stateChecker"
              value={stateChecker}
            />

            <Grid container spacing={3}>
              {/* Username field (if not using email as username) */}
              {!realm.registrationEmailAsUsername && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label={msgStr("username", "Username")}
                    defaultValue={account.username || ""}
                    disabled={!realm.editUsernameAllowed}
                    required={realm.editUsernameAllowed}
                    error={messagesPerField.existsError("username")}
                    helperText={
                      messagesPerField.existsError("username")
                        ? messagesPerField.get("username")
                        : ""
                    }
                  />
                </Grid>
              )}

              {/* Email field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={msgStr("email", "Email")}
                  defaultValue={account.email || ""}
                  required
                  error={messagesPerField.existsError("email")}
                  helperText={
                    messagesPerField.existsError("email")
                      ? messagesPerField.get("email")
                      : ""
                  }
                />
              </Grid>

              {/* First name field */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label={msgStr("firstName", "First name")}
                  defaultValue={account.firstName || ""}
                  required
                  error={messagesPerField.existsError("firstName")}
                  helperText={
                    messagesPerField.existsError("firstName")
                      ? messagesPerField.get("firstName")
                      : ""
                  }
                />
              </Grid>

              {/* Last name field */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label={msgStr("lastName", "Last name")}
                  defaultValue={account.lastName || ""}
                  required
                  error={messagesPerField.existsError("lastName")}
                  helperText={
                    messagesPerField.existsError("lastName")
                      ? messagesPerField.get("lastName")
                      : ""
                  }
                />
              </Grid>
            </Grid>

            {/* Form buttons */}
            <Box
              mt={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                type="submit"
                name="submitAction"
                value="Cancel"
                onClick={(e) => handleSubmit(e, "Cancel")}
              >
                {msgStr("doCancel", "Cancel")}
              </Button>
              <Button
                variant="contained"
                type="submit"
                name="submitAction"
                value="Save"
                onClick={(e) => handleSubmit(e, "Save")}
              >
                {msgStr("doSave", "Save")}
              </Button>
            </Box>

            {/* Show back to application link if referrer exists */}
            {referrer && (
              <Box mt={2} textAlign="center">
                <Button
                  variant="text"
                  href={referrer.url}
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  {msgStr("backToApplication", "Back to application")}
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Paper>
    </AccountTemplate>
  );
};

export default AccountPage;
