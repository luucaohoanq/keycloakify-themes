import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KcPage } from "./kc.gen";
import { ThemeProvider } from "./theme/ThemeProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {!window.kcContext ? (
        <h1>No Keycloak Context</h1>
      ) : (
        <KcPage kcContext={window.kcContext} />
      )}
    </ThemeProvider>
  </StrictMode>
);
