import { PageProps } from "../../types";
import { Box, Button, CardContent, Divider, Grid2 as Grid, Link, TextField, Typography } from "@mui/material";
import { HintBox } from "../../../components/HintBox";

const Login = (props: PageProps<"login.ftl">) => {
  const { i18n, Template, kcContext } = props;
  const { url, realm, social, message, messagesPerField } = kcContext;
  const { loginWithEmailAllowed, resetPasswordAllowed, registrationAllowed } = realm
  const { msgStr } = i18n;

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Box marginBottom="20px" textAlign="center">
          <Typography variant="h4">{msgStr('doLogIn')}</Typography>
        </Box>
        <form id="kc-form-login" action={url.loginAction} method="post">
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField error={messagesPerField.existsError('username')} helperText={messagesPerField.getFirstError('username')}  fullWidth label={loginWithEmailAllowed ? msgStr('usernameOrEmail') : msgStr('username')} name="username" id="username"></TextField>
            </Grid>
            <Grid size={12}>
              <TextField error={messagesPerField.existsError('password')} fullWidth type="password" label={msgStr('password')} name="password" id="password"></TextField>
            </Grid>
            <Grid display="flex" flexDirection="column" size={12}>
              <Button fullWidth sx={{ marginLeft: 'auto' }} variant="contained" type="submit">{msgStr('doLogIn')}</Button>
              {message && <HintBox style={{ marginTop: "10px", textAlign: "center" }} type={message?.type === 'success' ? 'info' : message.type} message={message.summary} />}
            </Grid>
          </Grid>
          {(resetPasswordAllowed || registrationAllowed || !!social?.providers?.length) && (
            <Box textAlign="center">
              <Divider sx={{ margin: "20px 0px" }}></Divider>
              {!!social?.providers?.length && (
                social.providers.map((x, i) => <Button id={`social-${x.alias}`} href={x.loginUrl} sx={{ marginBottom: "10px" }} key={i} variant="outlined" fullWidth>{x.displayName}</Button>)
              )}
              {registrationAllowed && (
                <Box display="flex" justifyContent="center" alignItems="center" columnGap="5px">
                  <Typography variant="caption">{msgStr('noAccountYet')}</Typography>
                  <Typography variant="caption" href={url.registrationUrl} component={Link}>{msgStr('doRegister')}</Typography>
                </Box>
              )}
              {resetPasswordAllowed && (
                <Box display="flex" justifyContent="center" alignItems="center" columnGap="5px">
                  <Typography variant="caption">{msgStr('doForgotPassword')}</Typography>
                  <Typography variant="caption" href={url.loginResetCredentialsUrl} component={Link}>{msgStr('resetPassword')}</Typography>
                </Box>
              )}
            </Box>
          )}
        </form>
      </CardContent>
    </Template>
  );
};

export { Login };
