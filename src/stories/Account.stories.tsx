import type { Meta, StoryObj } from "@storybook/react";
import AccountPage from "../keycloak-theme/account/AccountPage";
import { ThemeProvider } from "../theme/ThemeProvider";
import { mockI18n, mockKcContext } from "../core/stories/mocks";

// Create a wrapper component for the story
const AccountStory = () => {
  // Create account-specific mock data
  const accountMockContext = {
    ...mockKcContext,
    pageId: "account.ftl",
    account: {
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
    },
    stateChecker: "abc123",
    referrer: {
      url: "#",
      name: "Test Application",
    },
  };

  return (
    <ThemeProvider>
      <AccountPage kcContext={accountMockContext as any} i18n={mockI18n} />
    </ThemeProvider>
  );
};

// This is the default export that Storybook needs
const meta = {
  title: "Account/Profile",
  component: AccountStory,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AccountStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
