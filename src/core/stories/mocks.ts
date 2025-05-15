import { JSX } from "@emotion/react/jsx-runtime";
import React from "react";
import type { I18n } from "../../i18n/config";

// Base mock context for Keycloak themes
export const mockKcContext = {
  pageId: "login.ftl",
  url: {
    loginAction: "#",
    registrationUrl: "#",
    loginResetCredentialsUrl: "#",
  },
  realm: {
    displayName: "Test Realm",
    internationalizationEnabled: true,
    loginWithEmailAllowed: true,
    resetPasswordAllowed: true,
    registrationAllowed: true,
    rememberMe: true,
    password: true,
  },
  social: {
    providers: [
      {
        loginUrl: "#",
        alias: "google",
        displayName: "Google",
        iconClasses: "fa fa-google",
      },
    ],
  },
  message: null,
  messagesPerField: {
    existsError: (_field: string) => false,
    get: (_field: string) => "",
    getFirstError: () => "",
  },
  properties: {
    FDN_THEME_PRIMARY_COLOR: "#1976d2",
    FDN_THEME_SECONDARY_COLOR: "#9c27b0",
  },
};

// Mock i18n that implements the full I18n interface
export const mockI18n: I18n = {
  advancedMsgStr: (key: string, ...args: (string | undefined)[]) => {
    const translations: Record<string, string> = {
      // Add translations here if needed
    };
    let message = translations[key] || key;
    if (args) {
      Object.entries(args).forEach(([argKey, argValue]) => {
        message = message.replace(`{${argKey}}`, argValue ?? "");
      });
    }
    return message;
  },
  isFetchingTranslations: false,
  advancedMsg: (key: string, ...args: (string | undefined)[]) => {
    const message = mockI18n.advancedMsgStr(key, ...args);
    return React.createElement("span", null, message);
  },
  currentLanguage: { label: "English", languageTag: "en" },
  enabledLanguages: [
    { label: "English", languageTag: "en", href: "#" },
    { label: "Deutsch", languageTag: "de", href: "#" },
  ],
  // A more robust msgStr implementation that handles common keys
  msgStr: (key: string, defaultValue?: string) => {
    const translations: Record<string, string> = {
      // Login page translations
      doLogIn: "Log In",
      doRegister: "Register",
      loginTitle: "Sign in to your account",
      loginAccountTitle: "Sign in",
      usernameOrEmail: "Username or email",
      username: "Username",
      email: "Email",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      doForgotPassword: "Forgot your password?",
      doSubmit: "Submit",
      noAccount: "Don't have an account?",
      doCreateAccount: "Create account",
      alreadyHaveAccount: "Already have an account?",

      // OTP page translations
      loginOtpTitle: "Authentication Code",
      loginOtpIntro: "Enter the verification code from your authenticator",
      loginOtpOneTime: "One-time code",
      loginOtpCredential: "Authentication method",

      // Registration page translations
      registerTitle: "Create Account",
      registerAccountTitle: "Register a new account",
      firstName: "First name",
      lastName: "Last name",
      passwordConfirm: "Confirm password",
      passwordSettingTitle: "Set your password",
      termsTitle: "Terms and Conditions",
      termsText: "I agree to the Terms of Service",
      termsPlainText: "I agree to the Terms of Service",

      // Error messages
      invalidUserMessage: "Invalid username or password",
      invalidEmailMessage: "Invalid email address",
      accountNotVerifiedMessage: "Your account is not verified",
      accountDisabledMessage: "Your account is disabled",
      accountTemporarilyDisabledMessage: "Your account is temporarily disabled",

      // Success messages
      successHeader: "Success",
      instructionHeader: "Instructions",
      errorHeader: "Error",
    };

    // Return the translation if it exists, otherwise the default value or the key itself
    return translations[key] || defaultValue || key;
  },

  // Additional methods from the I18n interface
  msg: function (
    messageKey: string,
    ...parameters: (string | undefined)[]
  ): JSX.Element {
    // Basic implementation for messages with parameters
    let message = this.msgStr(messageKey as keyof typeof mockI18n.msgStr);
    parameters.forEach((param, index) => {
      message = message.replace(`{${index}}`, param ?? "");
    });
    return React.createElement("span", null, message);
  },
};
