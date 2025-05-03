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
import { JSX, useState } from "react";
import { HintBox } from "../components/HintBox";
import { KcContext } from "../login/KcContext";
import { I18n } from "../login/i18n";
import type { CustomTemplateProps } from "../login/types";

// Define the props type inline if importing doesn't work
export type RegisterPageProps = {
  Template: (props: CustomTemplateProps<"register.ftl">) => JSX.Element;
  kcContext: Extract<KcContext, { pageId: "register.ftl" }>;
  i18n: I18n;
};

const Register = (props: RegisterPageProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { i18n, Template, kcContext } = props;
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
  // const attributes = Object.entries(attributesByName || {});

  return (
    <Template i18n={i18n} kcContext={kcContext}>
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

              {/* Custom attributes rendering */}
              {/* {attributes
                .filter(
                  ([name]) =>
                    !["username", "email", "firstName", "lastName"].includes(
                      name
                    )
                )
                .map(([name, attribute]) => {
                  if (!attribute) return null;

                  const {
                    displayName,
                    required = true,
                    readOnly = false,
                    annotations = {},
                    validators = {},
                    value = "",
                  } = attribute;

                  // Select dropdown
                  if (validators.options?.options) {
                    return (
                      <FormControl
                        key={name}
                        fullWidth
                        error={messagesPerField.existsError(name)}
                        disabled={readOnly}
                        size="medium"
                      >
                        <InputLabel id={`${name}-label`}>
                          {displayName}
                        </InputLabel>
                        <Select
                          labelId={`${name}-label`}
                          id={name}
                          name={name}
                          defaultValue={value || ""}
                          label={displayName}
                          required={required}
                        >
                          {validators.options.options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {annotations.inputOptionLabelsI18nPrefix
                                ? msgStr(
                                    `${annotations.inputOptionLabelsI18nPrefix}.${option}`,
                                    option
                                  )
                                : option}
                            </MenuItem>
                          ))}
                        </Select>
                        {messagesPerField.existsError(name) && (
                          <FormHelperText>
                            {messagesPerField.get(name)}
                          </FormHelperText>
                        )}
                      </FormControl>
                    );
                  }

                  // Checkbox options
                  if (annotations.inputType === "multiselect-checkboxes") {
                    const options = validators.options?.options || [];
                    const optionLabels = annotations.inputOptionLabels || {};

                    return (
                      <Box key={name}>
                        <Typography variant="subtitle2" mb={1}>
                          {displayName}
                        </Typography>
                        {options.map((option) => (
                          <FormControlLabel
                            key={option}
                            control={
                              <Checkbox
                                name={`${name}[${option}]`}
                                value={option}
                                disabled={readOnly}
                                defaultChecked={value === option}
                              />
                            }
                            label={optionLabels[option] || option}
                          />
                        ))}
                        {messagesPerField.existsError(name) && (
                          <FormHelperText error>
                            {messagesPerField.get(name)}
                          </FormHelperText>
                        )}
                      </Box>
                    );
                  }

                  // Default text input
                  return (
                    <TextField
                      key={name}
                      id={name}
                      name={name}
                      label={displayName}
                      defaultValue={value || ""}
                      error={messagesPerField.existsError(name)}
                      helperText={
                        messagesPerField.get(name) ||
                        annotations.inputHelperTextBefore
                      }
                      fullWidth
                      disabled={readOnly}
                      required={required}
                      size="medium"
                    />
                  );
                })} */}

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
    </Template>
  );
};

export default Register;
