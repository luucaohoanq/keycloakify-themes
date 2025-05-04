import type { Meta, StoryObj } from "@storybook/react";
import LoginOtpPage from "../keycloak-theme/login-otp/LoginOtpPage";
import { Template } from "../keycloak-theme/login-otp/Template";
import { mockI18n } from "../core/stories/mocks";
import { ThemeProvider } from "../theme/ThemeProvider";

// Create a simple wrapper component
const LoginOtpStory = (props: any) => {
  // Mock Keycloak context for OTP login
  const mockKcContext = {
    pageId: "login-otp.ftl",
    url: {
      loginAction: "#",
    },
    realm: {
      displayName: "Test Realm",
      internationalizationEnabled: true,
    },
    otpLogin: {
      userOtpCredentials: props.multipleCredentials
        ? [
            {
              id: "totp1",
              userLabel: "Google Authenticator",
              type: "totp",
            },
            {
              id: "totp2",
              userLabel: "Microsoft Authenticator",
              type: "totp",
            },
          ]
        : [
            {
              id: "totp1",
              userLabel: "Google Authenticator",
              type: "totp",
            },
          ],
      selectedCredentialId: props.multipleCredentials ? "totp1" : "totp1",
    },
    message: props.showError
      ? {
          type: "error",
          summary: "Invalid authentication code",
        }
      : null,
    messagesPerField: {
      existsError: (field: string) => field === "totp" && props.fieldError,
      get: (field: string) =>
        field === "totp" && props.fieldError
          ? "Please enter a valid authentication code"
          : "",
    },
  };

  return (
    <ThemeProvider>
      <LoginOtpPage
        Template={Template}
        i18n={mockI18n}
        kcContext={mockKcContext as any}
      />
    </ThemeProvider>
  );
};

const meta = {
  title: "Authentication/OTP Login",
  component: LoginOtpStory,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    multipleCredentials: { control: "boolean" },
    fieldError: { control: "boolean" },
    showError: { control: "boolean" },
  },
} satisfies Meta<typeof LoginOtpStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    multipleCredentials: false,
    fieldError: false,
    showError: false,
  },
};

export const WithMultipleCredentials: Story = {
  args: {
    multipleCredentials: true,
    fieldError: false,
    showError: false,
  },
};

export const WithFieldError: Story = {
  args: {
    multipleCredentials: false,
    fieldError: true,
    showError: false,
  },
};

export const WithGlobalError: Story = {
  args: {
    multipleCredentials: false,
    fieldError: false,
    showError: true,
  },
};
