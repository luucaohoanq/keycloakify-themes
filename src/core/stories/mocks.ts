export const mockKcContext = {
  pageId: "login.ftl",
  url: {
    loginAction: "#",
    registrationUrl: "#",
    loginResetCredentialsUrl: "#",
  },
  realm: {
    loginWithEmailAllowed: true,
    resetPasswordAllowed: true,
    registrationAllowed: true,
    displayName: "Test Realm",
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
    existsError: () => false,
    get: () => "",
    getFirstError: () => "",
  },
  properties: {
    FDN_THEME_PRIMARY_COLOR: "#1976d2",
    FDN_THEME_SECONDARY_COLOR: "#9c27b0",
  },
};

// Mock i18n
export const mockI18n = {
  currentLanguage: { label: "English", languageTag: "en" },
  enabledLanguages: [
    { label: "English", languageTag: "en", href: "#" },
    { label: "Deutsch", languageTag: "de", href: "#" },
  ],
  msgStr: (key: string, defaultValue?: string) => defaultValue || key,
};
