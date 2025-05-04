import { useState } from "react";
import {
  Box,
  TextField,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { HintBox } from "../../components/common/HintBox";
import { useThemeContext } from "../../theme/ThemeProvider";
import { KeyIcon, FingerPrintIcon } from "../../components/common/Icons";
import { PageProps } from "../../types";
import { Template } from "./Template";

const LoginOtpPage = (props: PageProps<"login-otp.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, kcContext } = props;
  const { messagesPerField, otpLogin, url } = kcContext;
  const { msgStr } = i18n;
  const { mode } = useThemeContext();

  // Handle form submission
  const handleSubmit = () => {
    setLoading(true);
    // The form will naturally submit to the Keycloak backend
  };

  // Get icon based on credential type (could be expanded)
  const getCredentialIcon = (type: string) => {
    if (type.toLowerCase().includes("totp")) {
      return <KeyIcon fontSize="small" />;
    }
    return <FingerPrintIcon fontSize="small" />;
  };

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <Paper
        elevation={4}
        sx={{
          bgcolor: "background.paper",
          boxShadow:
            mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.5)"
              : "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box mb={3} textAlign="center">
            <Typography
              variant="h5"
              fontWeight="medium"
              color="primary"
              gutterBottom
            >
              {msgStr("doLogIn", "Log In")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {msgStr("loginTotpIntro", "Please enter your one-time code")}
            </Typography>
          </Box>

          <form
            id="kc-otp-login-form"
            action={url.loginAction}
            method="post"
            onSubmit={handleSubmit}
          >
            <Stack spacing={3}>
              {/* Multiple OTP credentials selection if available */}
              {otpLogin.userOtpCredentials &&
                otpLogin.userOtpCredentials.length > 1 && (
                  <FormControl component="fieldset">
                    <Typography
                      variant="subtitle2"
                      mb={1}
                      color="text.secondary"
                    >
                      {msgStr("loginTotpAlgorithm", "Authentication method")}
                    </Typography>
                    <RadioGroup
                      defaultValue={
                        otpLogin.selectedCredentialId ||
                        otpLogin.userOtpCredentials[0].id
                      }
                      name="selectedCredentialId"
                    >
                      {otpLogin.userOtpCredentials.map((credential) => (
                        <FormControlLabel
                          key={credential.id}
                          value={credential.id}
                          control={<Radio />}
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {getCredentialIcon(credential.id || "")}
                              <Typography>{credential.userLabel}</Typography>
                            </Box>
                          }
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}

              {/* OTP Input Field */}
              <TextField
                id="otp"
                name="otp"
                label={msgStr("loginOtpOneTime", "One-time code")}
                variant="outlined"
                fullWidth
                autoComplete="one-time-code"
                autoFocus
                inputProps={{
                  maxLength: 6,
                  dir: "ltr",
                  pattern: "[0-9]*",
                  inputMode: "numeric",
                }}
                error={messagesPerField.existsError("totp")}
                helperText={
                  messagesPerField.existsError("totp")
                    ? messagesPerField.get("totp")
                    : ""
                }
                required
              />

              {/* Error message display */}
              {messagesPerField.existsError("totp") && (
                <FormHelperText error>
                  {messagesPerField.get("totp")}
                </FormHelperText>
              )}

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={loading}
                sx={{ mt: 2, py: 1.5 }}
              >
                {msgStr("doLogIn", "Log In")}
              </LoadingButton>

              {/* Display error messages */}
              {kcContext.message && kcContext.message.type !== "success" && (
                <Box mt={2}>
                  <HintBox
                    type={kcContext.message.type}
                    message={kcContext.message.summary}
                  />
                </Box>
              )}
            </Stack>
          </form>
        </CardContent>
      </Paper>
    </Template>
  );
};

export default LoginOtpPage;
