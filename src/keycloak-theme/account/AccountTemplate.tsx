import {
  AppBar,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  // ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SecurityShieldIcon,
  KeyIcon,
  FingerPrintIcon,
} from "../../components/common/Icons";
import { ThemeToggle } from "../../components/common/ThemeToggle";
import { useThemeContext } from "../../theme/ThemeProvider";
import { CustomTemplateProps } from "../../types";

// Sidebar width
const drawerWidth = 250;

type AccountTemplateProps = CustomTemplateProps<"account.ftl"> & {
  active?: string;
};

const menuItems = [
  { id: "account", label: "Account", icon: <FingerPrintIcon /> },
  { id: "password", label: "Password", icon: <KeyIcon /> },
  { id: "totp", label: "Authenticator", icon: <SecurityShieldIcon /> },
];

export const AccountTemplate = (props: AccountTemplateProps) => {
  const { children, active = "account" } = props;
  // const { _realm } = kcContext;
  // const { msgStr } = i18n;
  const { mode } = useThemeContext();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: mode === "dark" ? "background.paper" : "#f5f5f5",
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Toolbar
          sx={{
            py: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="primary">
            {"Account Console"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {"Manage your account"}
          </Typography>
        </Toolbar>

        <List sx={{ pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton
                selected={item.id === active}
                sx={{
                  py: 1.5,
                  "&.Mui-selected": {
                    bgcolor:
                      mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.04)",
                    borderRight: `3px solid ${theme.palette.primary.main}`,
                  },
                  "&.Mui-selected:hover": {
                    bgcolor:
                      mode === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.08)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                {/* <ListItemText primary={msgStr(item.id, item.label)} /> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{
            bgcolor: mode === "dark" ? "background.default" : "#ffffff",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <ThemeToggle />
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
