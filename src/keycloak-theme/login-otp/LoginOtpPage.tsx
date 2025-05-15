import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { HintBox } from "../../components/common/HintBox";
import { FingerPrintIcon, KeyIcon } from "../../components/common/Icons";
import { useThemeContext } from "../../theme/ThemeProvider";
import { PageProps } from "../../types";
import { Template } from "./Template";
import {
  credentialTitleStyle,
  loginButtonStyle,
  paperStyle,
  subtitleTextStyle,
  titleTextStyle,
} from "./style";

const LoginOtpPage = (props: PageProps<"login-otp.ftl">) => {
  const [loading, setLoading] = useState(false);
  const { i18n, kcContext } = props;
  const { messagesPerField, otpLogin, url, message } = kcContext;
  const { msgStr } = i18n;
  const { mode } = useThemeContext();

  const handleSubmit = () => {
    setLoading(true);
  };

  const getCredentialIcon = (type: string) =>
    type.toLowerCase().includes("totp") ? (
      <KeyIcon fontSize="small" />
    ) : (
      <FingerPrintIcon fontSize="small" />
    );

  return (
    <Template i18n={i18n} kcContext={kcContext}>
      <Paper elevation={3} sx={paperStyle}>
        <form
          id="kc-otp-login-form"
          action={url.loginAction}
          method="post"
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <Box sx={titleTextStyle}>
              <Typography variant="h5" fontWeight={600} color="primary">
                {msgStr("doLogIn", "Log In")}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={subtitleTextStyle}
              >
                {msgStr("loginTotpIntro", "Enter your one-time passcode")}
              </Typography>
            </Box>

            {otpLogin.userOtpCredentials?.length > 1 && (
              <FormControl>
                <Typography variant="subtitle2" sx={credentialTitleStyle}>
                  {msgStr("loginTotpAlgorithm", "Choose authentication method")}
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
                      control={<Radio size="small" />}
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getCredentialIcon(credential.id || "")}
                          <Typography variant="body2">
                            {credential.userLabel}
                          </Typography>
                        </Stack>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            <Box>
              <TextField
                id="otp"
                name="otp"
                label={msgStr("loginOtpOneTime", "One-time code")}
                variant="outlined"
                fullWidth
                autoFocus
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  dir: "ltr",
                }}
                error={messagesPerField.existsError("totp")}
                helperText={
                  messagesPerField.existsError("totp")
                    ? messagesPerField.get("totp")
                    : ""
                }
                required
              />
            </Box>

            {message && message.type !== "success" && (
              <HintBox type={message.type} message={message.summary} />
            )}

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={loading}
              sx={loginButtonStyle}
            >
              {msgStr("doLogIn", "Log In")}
            </LoadingButton>
          </Stack>
        </form>
      </Paper>
    </Template>
  );
};

export default LoginOtpPage;
