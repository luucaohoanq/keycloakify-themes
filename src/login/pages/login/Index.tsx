import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import QrCode2Icon from "@mui/icons-material/QrCode2";
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
import { HintBox } from "../../../components/HintBox";
import { PageProps } from "../../types";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import WindowIcon from "@mui/icons-material/Window";

const getProviderIcon = (alias: string) => {
  switch (alias.toLowerCase()) {
    case "google":
      return <GoogleIcon fontSize="small" />;
    case "facebook":
      return <FacebookIcon fontSize="small" />;
    case "microsoft":
      return <WindowIcon fontSize="small" />;
    default:
      return null;
  }
};

const Login = (props: PageProps<"login.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, Template, kcContext } = props;
  const { url, realm, social, message, messagesPerField } = kcContext;
  const { loginWithEmailAllowed, resetPasswordAllowed, registrationAllowed } =
    realm;
  const { msgStr } = i18n;
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpenQR = () => setOpen(true);
  const handleCloseQR = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <Paper elevation={4}>
        <CardContent sx={{ p: 4 }}>
          <Box
            mb={3}
            textAlign="left"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight="medium" color="black">
              {"Log In"}
            </Typography>

            <Box
              onClick={handleOpenQR}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1,
                backgroundColor: "#FFF9E6",
                border: "2px solid #FFA500",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 0 2px #FFCF66",
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "#FFA500", fontWeight: 500, mr: 1 }}
              >
                Log in with QR
              </Typography>
              <QrCode2Icon sx={{ color: "#FF5722" }} />
            </Box>
          </Box>

          <Dialog open={open} onClose={handleCloseQR}>
            <DialogTitle>
              Scan QR Code to Login
              <IconButton
                onClick={handleCloseQR}
                sx={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent
              sx={{ display: "flex", justifyContent: "center", p: 4 }}
            >
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
                // helperText={messagesPerField.getFirstError("username")}
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: messagesPerField.existsError("username")
                        ? theme.palette.error.main
                        : theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: messagesPerField.existsError("username")
                        ? theme.palette.error.main
                        : theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: messagesPerField.existsError("username")
                        ? theme.palette.error.main
                        : theme.palette.divider,
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
                }}
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: messagesPerField.existsError("username")
                        ? theme.palette.error.main
                        : theme.palette.divider,
                    },
                    "&:hover fieldset": {
                      borderColor: messagesPerField.existsError("username")
                        ? theme.palette.error.main
                        : theme.palette.divider,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: messagesPerField.existsError("username")
                        ? theme.palette.error.main
                        : theme.palette.divider,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.text.disabled,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: theme.palette.text.disabled,
                  },
                  "& .MuiInputLabel-root.Mui-error": {
                    color: theme.palette.error.main,
                  },
                }}
              />

              {/* if the validation still error then disable the button */}

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
                sx={{
                  mt: 1,
                  py: 1.2,
                  backgroundColor: "#EE4D2D",
                  fontWeight: "medium",
                  //change color button background on disable
                  "&:disabled": {
                    backgroundColor: "#f4826c",
                    color: theme.palette.common.white,
                  },
                }}
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
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
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
                  <Typography variant="body2" color="text.secondary" px={1}>
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
                        sx={{
                          color: "black",
                          borderRadius: 1,
                          textTransform: "none",
                          justifyContent: "center",
                          borderColor: "divider",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{
                            width: 24,
                            height: 24,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 1,
                          }}
                        >
                          {/* <i className={provider.iconClasses}></i> */}
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
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={4}
              >
                <Typography variant="body2" color="text.secondary" px={1}>
                  {"New to Shoppe?"}
                </Typography>

                {registrationAllowed && (
                  <Typography
                    variant="body2"
                    component={Link}
                    href={url.registrationUrl}
                    underline="hover"
                    color="#EE4D2D"
                    fontWeight={"bold"}
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
