import { KcContext } from "keycloakify/login/KcContext";
import { I18n } from "../../i18n/config";

type Props = {
  kcContext: Extract<KcContext, { pageId: "terms.ftl" }>;
  i18n: I18n;
};

const Terms = (props: Props) => {};
