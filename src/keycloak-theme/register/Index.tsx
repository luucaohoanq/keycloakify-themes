import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { HintBox } from "../../components/common/HintBox";
import { KcContext } from "../../core/keycloak/KcContext";
import { I18n } from "../../i18n/config";
import { AuthTemplate } from "../templates/AuthTemplate";

// Use this simplified props type
type RegisterProps = {
  kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
  i18n: I18n;
};

const Register = (props: RegisterProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { i18n, kcContext } = props;
  const {
    url,
    message,
    messagesPerField,
    profile,
    recaptchaRequired,
    recaptchaSiteKey,
    termsAcceptanceRequired,
  } = kcContext;

  // Safe message retrieval with fallbacks for missing translations
  const { msgStr } = i18n;

  // Parse profile attributes
  const { attributesByName = {} } = profile || {};

  return (
    <AuthTemplate i18n={i18n} kcContext={kcContext}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: "450px",
          width: "100%",
          mx: "auto",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box mb={4} textAlign="center">
            <Typography
              variant="h4"
              fontWeight="500"
              color="primary"
              gutterBottom
            >
              {msgStr("registerTitle", "Create Account")}
            </Typography>
          </Box>

          <form
            onSubmit={() => setLoading(true)}
            id="kc-register-form"
            action={url.registrationAction}
            method="post"
          >
            <Stack spacing={3}>
              {/* Username field */}
              {attributesByName.username !== undefined && (
                <TextField
                  id="username"
                  name="username"
                  label={msgStr("username", "Username")}
                  defaultValue={attributesByName.username?.value || ""}
                  error={messagesPerField.existsError("username")}
                  helperText={messagesPerField.get("username")}
                  fullWidth
                  autoComplete="username"
                  autoFocus
                  disabled={attributesByName.username?.readOnly === true}
                  required
                  size="medium"
                />
              )}

              {/* Email field */}
              {attributesByName.email !== undefined && (
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label={msgStr("email", "Email")}
                  defaultValue={attributesByName.email?.value || ""}
                  error={messagesPerField.existsError("email")}
                  helperText={
                    messagesPerField.get("email") ||
                    attributesByName.email?.annotations?.inputHelperTextBefore
                  }
                  fullWidth
                  autoComplete="email"
                  disabled={attributesByName.email?.readOnly === true}
                  required
                  size="medium"
                />
              )}

              {/* Name fields in a row */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* First name field */}
                {attributesByName.firstName !== undefined && (
                  <TextField
                    id="firstName"
                    name="firstName"
                    label={msgStr("firstName", "First name")}
                    defaultValue={attributesByName.firstName?.value || ""}
                    error={messagesPerField.existsError("firstName")}
                    helperText={messagesPerField.get("firstName")}
                    fullWidth
                    autoComplete="given-name"
                    disabled={attributesByName.firstName?.readOnly === true}
                    required={attributesByName.firstName?.required !== false}
                    size="medium"
                  />
                )}

                {/* Last name field */}
                {attributesByName.lastName !== undefined && (
                  <TextField
                    id="lastName"
                    name="lastName"
                    label={msgStr("lastName", "Last name")}
                    defaultValue={attributesByName.lastName?.value || ""}
                    error={messagesPerField.existsError("lastName")}
                    helperText={messagesPerField.get("lastName")}
                    fullWidth
                    autoComplete="family-name"
                    disabled={attributesByName.lastName?.readOnly === true}
                    required={attributesByName.lastName?.required !== false}
                    size="medium"
                  />
                )}
              </Box>

              <Divider sx={{ my: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {"Security"}
                </Typography>
              </Divider>

              {/* Password field */}
              <TextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label={msgStr("password", "Password")}
                error={messagesPerField.existsError("password")}
                helperText={messagesPerField.get("password")}
                fullWidth
                autoComplete="new-password"
                required
                size="medium"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm password field */}
              <TextField
                id="password-confirm"
                name="password-confirm"
                type={showConfirmPassword ? "text" : "password"}
                label={msgStr("passwordConfirm", "Confirm password")}
                error={messagesPerField.existsError("password-confirm")}
                helperText={messagesPerField.get("password-confirm")}
                fullWidth
                autoComplete="new-password"
                required
                size="medium"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Terms acceptance */}
              {termsAcceptanceRequired && (
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="termsAccepted"
                        id="termsAccepted"
                        required
                      />
                    }
                    label={
                      <Typography variant="body2">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: msgStr(
                              "termsText",
                              "I agree to the Terms of Service"
                            ),
                          }}
                        />
                      </Typography>
                    }
                  />
                  {messagesPerField.existsError("termsAccepted") && (
                    <FormHelperText error>
                      {messagesPerField.get("termsAccepted")}
                    </FormHelperText>
                  )}
                </Box>
              )}

              {/* reCAPTCHA */}
              {recaptchaRequired && (
                <Box my={2} display="flex" justifyContent="center">
                  <div
                    className="g-recaptcha"
                    data-sitekey={recaptchaSiteKey}
                  ></div>
                </Box>
              )}

              {/* Submit button */}
              <LoadingButton
                fullWidth
                variant="contained"
                loading={loading}
                type="submit"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.5,
                  fontWeight: "500",
                  borderRadius: "8px",
                }}
              >
                {msgStr("doRegister", "Register")}
              </LoadingButton>

              {/* Error/info message display */}
              {message && (
                <HintBox
                  type={message?.type === "success" ? "info" : message.type}
                  message={message.summary}
                />
              )}

              {/* Login link */}
              <Box textAlign="center" mt={2}>
                <Typography variant="body2">
                  {"Already have an account?"}{" "}
                  <Link href={url.loginUrl} underline="hover" fontWeight="500">
                    {msgStr("doLogIn", "Sign in")}
                  </Link>
                </Typography>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Paper>
    </AuthTemplate>
  );
};

export default Register;
