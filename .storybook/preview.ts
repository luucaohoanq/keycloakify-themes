import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import { withThemeProvider } from "./withThemeProvider";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: {
      default: "light",
      list: [
        {
          name: "Light",
          class: "light-theme",
          color: "#ffffff",
          default: true,
        },
        {
          name: "Dark",
          class: "dark-theme",
          color: "#000000",
        },
      ],
    },
  },

  decorators: [
    // Our custom decorator that provides the ThemeProvider
    withThemeProvider,
    // Storybook's theme decorator (keep this)
    withThemeByDataAttribute({
      themes: {
        light: "light-theme",
        dark: "dark-theme",
      },
      defaultTheme: "light",
      attributeName: "class",
    }),
  ],

  // Make the theme available as a global variable
  globals: {
    theme: "light",
  },

  tags: ["autodocs"],
};

export default preview;
