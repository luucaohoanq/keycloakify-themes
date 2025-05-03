import { PageProps } from "../../types";
import {
  Box,
  Button,
  CardContent,
  Divider,
  Grid2 as Grid,
  Link,
  TextField,
  Typography,
  Stack,
  useTheme,
  Paper,
} from "@mui/material";
import { HintBox } from "../../../components/HintBox";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const Login = (props: PageProps<"login.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, Template, kcContext } = props;
  const { url, realm, social, message, messagesPerField } = kcContext;
  const { loginWithEmailAllowed, resetPasswordAllowed, registrationAllowed } =
    realm;
  const { msgStr } = i18n;
  const theme = useTheme();

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <Paper elevation={4}>
        <CardContent sx={{ p: 4 }}>
          <Box mb={3} textAlign="center">
            <Typography variant="h4" fontWeight="medium" color="primary">
              {/* {msgStr("doLogIn")} */}
              {"Shoppe"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              {msgStr("loginAccountTitle", "Sign in to your account")}
            </Typography>
          </Box>

          <form
            onSubmit={() => setLoading(true)}
            id="kc-form-login"
            action={url.loginAction}
            method="post"
          >
            <Stack spacing={2.5} mb={3}>
              <TextField
                error={messagesPerField.existsError("username")}
                helperText={messagesPerField.getFirstError("username")}
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
              />

              <TextField
                error={messagesPerField.existsError("password")}
                helperText={messagesPerField.getFirstError("password")}
                fullWidth
                type="password"
                label={msgStr("password")}
                name="password"
                id="password"
                variant="outlined"
                size="medium"
                autoComplete="current-password"
              />

              <LoadingButton
                fullWidth
                variant="contained"
                loading={loading}
                type="submit"
                size="large"
                sx={{
                  mt: 1,
                  py: 1.2,
                  fontWeight: "medium",
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
                    underline="hover"
                  >
                    {msgStr("doForgotPassword")}
                  </Typography>
                )}
                {registrationAllowed && (
                  <Typography
                    variant="body2"
                    component={Link}
                    href={url.registrationUrl}
                    underline="hover"
                  >
                    {msgStr("doRegister")}
                  </Typography>
                )}
              </Box>
            )}

            {/* Social providers */}
            {!!social?.providers?.length && (
              <>
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary" px={1}>
                    {msgStr(
                      "identity-provider-login-label",
                      "Or continue with"
                    )}
                  </Typography>
                </Divider>

                <Grid container spacing={2}>
                  {social.providers.map((provider, i) => (
                    <Grid
                      size={(social.providers ?? []).length > 3 ? 6 : 12}
                      key={i}
                    >
                      <Button
                        id={`social-${provider.alias}`}
                        href={provider.loginUrl}
                        variant="outlined"
                        fullWidth
                        size="large"
                        sx={{
                          borderRadius: 1,
                          textTransform: "none",
                          justifyContent: "flex-start",
                          py: 1,
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
                          <i className={provider.iconClasses}></i>
                        </Box>
                        {provider.displayName}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </form>
        </CardContent>
      </Paper>
    </Template>
  );
};

export { Login };
