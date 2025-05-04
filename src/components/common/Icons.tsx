import VpnKeyIcon from "@mui/icons-material/VpnKey";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SecurityIcon from "@mui/icons-material/Security";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import TwitterIcon from "@mui/icons-material/Twitter";
import WindowIcon from "@mui/icons-material/Window";
import { SvgIconProps } from "@mui/material";
import {
  FaBitbucket,
  FaGitlab,
  FaKey,
  FaPaypal,
  FaStackOverflow,
} from "react-icons/fa";
import { SiRedhatopenshift } from "react-icons/si";

// Authentication related icons
export const KeyIcon = (props: SvgIconProps) => <VpnKeyIcon {...props} />;
export const FingerPrintIcon = (props: SvgIconProps) => (
  <FingerprintIcon {...props} />
);
export const PhoneIcon = (props: SvgIconProps) => (
  <PhoneAndroidIcon {...props} />
);
export const SecurityShieldIcon = (props: SvgIconProps) => (
  <SecurityIcon {...props} />
);

// Form/UI related icons
export const VisibilityIcon = (props: SvgIconProps) => (
  <Visibility {...props} />
);
export const VisibilityOffIcon = (props: SvgIconProps) => (
  <VisibilityOff {...props} />
);
export const CloseButtonIcon = (props: SvgIconProps) => (
  <CloseIcon {...props} />
);
export const QrCodeIcon = (props: SvgIconProps) => <QrCode2Icon {...props} />;

// Social media icons
export const FacebookSocialIcon = (props: SvgIconProps) => (
  <FacebookIcon {...props} />
);
export const GithubSocialIcon = (props: SvgIconProps) => (
  <GitHubIcon {...props} />
);
export const GoogleSocialIcon = (props: SvgIconProps) => (
  <GoogleIcon {...props} />
);
export const InstagramSocialIcon = (props: SvgIconProps) => (
  <InstagramIcon {...props} />
);
export const LinkedInSocialIcon = (props: SvgIconProps) => (
  <LinkedInIcon {...props} />
);
export const TwitterSocialIcon = (props: SvgIconProps) => (
  <TwitterIcon {...props} />
);
export const MicrosoftSocialIcon = (props: SvgIconProps) => (
  <WindowIcon {...props} />
);
export const StackOverflowSocialIcon = (props: any) => (
  <FaStackOverflow {...props} />
);
export const PaypalSocialIcon = (props: any) => <FaPaypal {...props} />;
export const GitlabSocialIcon = (props: any) => <FaGitlab {...props} />;
export const BitbucketSocialIcon = (props: any) => <FaBitbucket {...props} />;
export const OpenshiftSocialIcon = (props: any) => (
  <SiRedhatopenshift {...props} />
);
export const GenericKeyIcon = (props: any) => <FaKey {...props} />;

// A helper function to get provider icon by alias
export const getProviderIcon = (alias: string) => {
  switch (alias.toLowerCase()) {
    case "google":
      return <GoogleSocialIcon fontSize="small" />;
    case "facebook":
      return <FacebookSocialIcon fontSize="small" />;
    case "microsoft":
      return <MicrosoftSocialIcon fontSize="small" />;
    case "github":
      return <GithubSocialIcon fontSize="small" />;
    case "instagram":
      return <InstagramSocialIcon fontSize="small" />;
    case "linkedin":
      return <LinkedInSocialIcon fontSize="small" />;
    case "twitter":
      return <TwitterSocialIcon fontSize="small" />;
    case "stackoverflow":
      return <StackOverflowSocialIcon fontSize="small" />;
    case "paypal":
      return <PaypalSocialIcon fontSize="small" />;
    case "gitlab":
      return <GitlabSocialIcon fontSize="small" />;
    case "bitbucket":
      return <BitbucketSocialIcon fontSize="small" />;
    case "openshift":
      return <OpenshiftSocialIcon fontSize="small" />;
    default:
      return <GenericKeyIcon fontSize="small" />;
  }
};
