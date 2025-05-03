import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import { Template } from "./Template";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/theme.scss";
const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);
import "./main.css";
const Login = lazy(() => import("./pages/login/Index"));
const Register = lazy(() => import("../register/Index"));

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;

  const { i18n } = useI18n({ kcContext });
  const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
      light: {
        palette: {
          background: {
            default: "transparent",
          },
          primary: {
            main: kcContext.properties.FDN_THEME_PRIMARY_COLOR,
          },
          secondary: {
            main: kcContext.properties.FDN_THEME_SECONDARY_COLOR,
          },
        },
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.95)", // Actually make it semi-transparent
            backdropFilter: "blur(5px)", // Reduced blur for better appearance
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Suspense>
        {(() => {
          switch (kcContext.pageId) {
            case "login.ftl":
              return (
                <Login Template={Template} i18n={i18n} kcContext={kcContext} />
              );
            case "register.ftl":
              return (
                <Register
                  Template={Template}
                  i18n={i18n}
                  kcContext={kcContext}
                />
              );
            default:
              return (
                <DefaultPage
                  kcContext={kcContext}
                  i18n={i18n}
                  classes={classes}
                  Template={Template}
                  doUseDefaultCss={true}
                  UserProfileFormFields={UserProfileFormFields}
                  doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                />
              );
          }
        })()}
      </Suspense>
    </ThemeProvider>
  );
}

const classes = {} satisfies { [key in ClassKey]?: string };
