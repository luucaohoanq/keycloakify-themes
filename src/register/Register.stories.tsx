import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "../login/KcPageStory";

const { KcPageStory } = createKcPageStory({ pageId: "register.ftl" });

const meta = {
  title: "register/register.ftl",
  component: KcPageStory,
} satisfies Meta<typeof KcPageStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <KcPageStory />,
};

export const WithValidationErrors: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        messagesPerField: {
          existsError: (fieldName: string, ...otherFieldNames: string[]) => {
            const fieldNames = [fieldName, ...otherFieldNames];
            return (
              fieldNames.includes("username") ||
              fieldNames.includes("password") ||
              fieldNames.includes("email")
            );
          },
          get: (fieldName: string) => {
            if (fieldName === "username") {
              return "Username already exists.";
            }
            if (fieldName === "email") {
              return "Invalid email format.";
            }
            if (fieldName === "password") {
              return "Password must be at least 8 characters.";
            }
            if (fieldName === "password-confirm") {
              return "Passwords don't match.";
            }
            return "";
          },
        },
      }}
    />
  ),
};

export const WithTermsRequired: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        termsAcceptanceRequired: true,
      }}
    />
  ),
};

export const WithPrefilledData: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        profile: {
          attributesByName: {
            email: {
              name: "email",
              value: "user@example.com",
              displayName: "Email",
              required: true,
            },
            firstName: {
              name: "firstName",
              value: "John",
              displayName: "First name",
              required: true,
            },
            lastName: {
              name: "lastName",
              value: "Doe",
              displayName: "Last name",
              required: true,
            },
          },
        },
      }}
    />
  ),
};

export const WithCustomAttribute: Story = {
  render: () => (
    <KcPageStory
      kcContext={{
        profile: {
          attributesByName: {
            country: {
              name: "country",
              displayName: "Country",
              required: true,
              validators: {
                options: {
                  options: ["USA", "Canada", "UK", "Australia", "Other"],
                },
              },
            },
          },
        },
      }}
    />
  ),
};
