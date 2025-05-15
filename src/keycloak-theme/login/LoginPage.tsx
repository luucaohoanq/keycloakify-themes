import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2 as Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { HintBox } from "../../components/common/HintBox";
import {
  VisibilityIcon,
  VisibilityOffIcon,
  CloseButtonIcon,
  QrCodeIcon,
  getProviderIcon,
} from "../../components/common/Icons";
import { useThemeContext } from "../../theme/ThemeProvider";
import { PageProps } from "../../types";
import {
  paperStyles,
  cardContentStyles,
  titleContainerStyles,
  titleTextStyles,
  qrButtonStyles,
  qrTextStyles,
  dialogCloseButtonStyles,
  dialogContentStyles,
  getTextFieldStyles,
  loginButtonStyles,
  accountLinksContainerStyles,
  dividerTextStyles,
  socialButtonStyles,
  socialIconContainerStyles,
  registrationPromptContainerStyles,
  registrationTextStyles,
  registrationLinkStyles,
} from "./style";

const Login = (props: PageProps<"login.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, Template, kcContext } = props;
  const { url, realm, social, message, messagesPerField } = kcContext;
  const { loginWithEmailAllowed, resetPasswordAllowed, registrationAllowed } =
    realm;
  const { msgStr } = i18n;
  const theme = useTheme();
  const { mode } = useThemeContext();

  const [open, setOpen] = useState(false);

  const handleOpenQR = () => setOpen(true);
  const handleCloseQR = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <Paper elevation={4} sx={paperStyles(mode)}>
        <CardContent sx={cardContentStyles}>
          <Box mb={3} textAlign="left" sx={titleContainerStyles}>
            <Typography variant="h6" sx={titleTextStyles(mode)}>
              {"Log In"}
            </Typography>

            <Box onClick={handleOpenQR} sx={qrButtonStyles(mode)}>
              <Typography variant="body2" sx={qrTextStyles}>
                Log in with QR
              </Typography>
              <QrCodeIcon sx={{ color: "#FF5722" }} />
            </Box>
          </Box>

          <Dialog open={open} onClose={handleCloseQR}>
            <DialogTitle>
              Scan QR Code to Login
              <IconButton onClick={handleCloseQR} sx={dialogCloseButtonStyles}>
                <CloseButtonIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={dialogContentStyles}>
              <QRCodeCanvas
                value="https://your-login-link.com/qr-session"
                size={200}
              />
            </DialogContent>
          </Dialog>

          <form
            onSubmit={() => setLoading(true)}
            id="kc-form-login"
            action={url.loginAction}
            method="post"
          >
            <Stack spacing={4} mb={2}>
              <TextField
                error={messagesPerField.existsError("username")}
                fullWidth
                label={
                  loginWithEmailAllowed
                    ? msgStr("usernameOrEmail")
                    : msgStr("username")
                }
                name="username"
                id="username"
                variant="outlined"
                size="medium"
                autoComplete="username"
                autoFocus
                sx={getTextFieldStyles(
                  theme,
                  messagesPerField.existsError("username")
                )}
              />

              <TextField
                error={messagesPerField.existsError("password")}
                fullWidth
                type={showPassword ? "text" : "password"}
                label={msgStr("password")}
                name="password"
                id="password"
                variant="outlined"
                size="medium"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={getTextFieldStyles(
                  theme,
                  messagesPerField.existsError("password")
                )}
              />

              <LoadingButton
                fullWidth
                variant="contained"
                loading={loading}
                disabled={
                  loading ||
                  messagesPerField.existsError("username") ||
                  messagesPerField.existsError("password")
                }
                type="submit"
                size="large"
                sx={loginButtonStyles}
              >
                {msgStr("doLogIn")}
              </LoadingButton>
            </Stack>

            {message && (
              <HintBox
                style={{ marginBottom: theme.spacing(2) }}
                type={message?.type === "success" ? "info" : message.type}
                message={message.summary}
              />
            )}

            {/* Account links */}
            {(resetPasswordAllowed || registrationAllowed) && (
              <Box sx={accountLinksContainerStyles}>
                {resetPasswordAllowed && (
                  <Typography
                    variant="body2"
                    component={Link}
                    href={url.loginResetCredentialsUrl}
                    underline="none"
                  >
                    {msgStr("doForgotPassword")}
                  </Typography>
                )}
                {registrationAllowed && (
                  <Typography
                    variant="body2"
                    component={Link}
                    href={url.registrationUrl}
                    underline="none"
                  >
                    {"Log In with Phone Number"}
                  </Typography>
                )}
              </Box>
            )}

            {/* Social providers */}
            {!!social?.providers?.length && (
              <>
                <Divider sx={{ my: 3 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={dividerTextStyles}
                  >
                    {msgStr("identity-provider-login-label", "OR")}
                  </Typography>
                </Divider>

                <Grid container spacing={2}>
                  {social.providers.map((provider, i) => (
                    <Grid
                      size={(social.providers ?? []).length > 1 ? 6 : 12}
                      key={i}
                    >
                      <Button
                        id={`social-${provider.alias}`}
                        href={provider.loginUrl}
                        variant="outlined"
                        fullWidth
                        size="large"
                        sx={socialButtonStyles}
                      >
                        <Box component="span" sx={socialIconContainerStyles}>
                          {getProviderIcon(provider.alias)}
                        </Box>
                        {provider.displayName}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}

            {/* Account links */}
            {registrationAllowed && (
              <Box sx={registrationPromptContainerStyles}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={registrationTextStyles}
                >
                  {"New to Shoppe?"}
                </Typography>

                {registrationAllowed && (
                  <Typography
                    variant="body2"
                    component={Link}
                    href={url.registrationUrl}
                    sx={registrationLinkStyles}
                  >
                    {msgStr("doRegister")}
                  </Typography>
                )}
              </Box>
            )}
          </form>
        </CardContent>
      </Paper>
    </Template>
  );
};

export default Login;
