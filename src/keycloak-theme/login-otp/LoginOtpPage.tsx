import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { HintBox } from "../../components/common/HintBox";
import { FingerPrintIcon, KeyIcon } from "../../components/common/Icons";
import { useThemeContext } from "../../theme/ThemeProvider";
import { PageProps } from "../../types";
import { Template } from "./Template";
import {
  credentialTitleStyle,
  loginButtonStyle,
  otpInputStyle,
  paperStyle,
  subtitleTextStyle,
  titleTextStyle,
} from "./style";

const numberOfDigits = 6;

const LoginOtpPage = (props: PageProps<"login-otp.ftl">) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { i18n, kcContext } = props;
  const { messagesPerField, otpLogin, url, message } = kcContext;
  const { msgStr } = i18n;
  const { mode } = useThemeContext();

  const isOtpValid = otp.length === numberOfDigits;

  const handleSubmit = () => {
    if (isOtpValid) {
      setLoading(true);
    }
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

            <Box display="flex" justifyContent="center">
              <OtpInput
                value={otp}
                onChange={(value) => {
                  // Only allow numeric input
                  const numericValue = value.replace(/[^0-9]/g, "");
                  setOtp(numericValue);
                }}
                numInputs={numberOfDigits}
                inputType="text"
                shouldAutoFocus
                inputStyle={otpInputStyle}
                containerStyle={{ gap: "8px" }}
                renderInput={(props) => (
                  <input
                    {...props}
                    name="otp"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onKeyPress={(e) => {
                      // Prevent non-numeric keystrokes
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                )}
              />
            </Box>

            {messagesPerField.existsError("totp") && (
              <Typography color="error" fontSize="0.8rem" textAlign="center">
                {messagesPerField.get("totp")}
              </Typography>
            )}

            {message && message.type !== "success" && (
              <HintBox type={message.type} message={message.summary} />
            )}

            {/* <Typography
              variant="caption"
              textAlign="center"
              color={
                isOtpValid
                  ? "success.main"
                  : otp.length > 0
                  ? "text.secondary"
                  : "transparent"
              }
            >
              {isOtpValid
                ? "OTP is complete"
                : otp.length > 0
                ? `Please enter all ${6 - otp.length} remaining digits`
                : "Enter 6-digit code"}
            </Typography> */}

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              loading={loading}
              disabled={!isOtpValid || loading}
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
