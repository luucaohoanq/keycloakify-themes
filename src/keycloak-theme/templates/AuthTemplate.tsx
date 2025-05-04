import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { LanguageSelect } from "../../components/common/LanguageSelect";
import { ThemeToggle } from "../../components/common/ThemeToggle";
import { KcContext } from "../../core/keycloak/KcContext";
import { I18n } from "../../i18n/config";
// import { useThemeContext } from "../../theme/ThemeProvider";

type AuthTemplateProps = {
  kcContext: KcContext;
  i18n: I18n;
  children: ReactNode;
};

export const AuthTemplate = (props: AuthTemplateProps) => {
  const { children, kcContext, i18n } = props;
  const { realm } = kcContext;
  const { internationalizationEnabled } = realm;
  const { enabledLanguages } = i18n;
  //   const { mode } = useThemeContext();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundImage: "url(/assets/images/bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box maxWidth="450px" width="100%">
        {children}
        <Box display="flex" alignItems="center" mt="1%">
          <Typography variant="caption" color="white">
            {realm.displayName}
          </Typography>
          <Box ml="auto" display="flex" alignItems="center">
            {!!enabledLanguages?.length && internationalizationEnabled && (
              <LanguageSelect
                style={{ color: "white", marginRight: "8px" }}
                i18n={i18n}
              />
            )}
            <ThemeToggle color="white" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
