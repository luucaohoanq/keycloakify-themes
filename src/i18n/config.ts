/* eslint-disable @typescript-eslint/no-unused-vars */
import { i18nBuilder } from "keycloakify/login";
import type { ThemeName } from "../kc.gen";
import en from "./en/strings";
import de from "./de/strings";
import jp from "./jp/strings";
/** @see: https://docs.keycloakify.dev/features/i18n */
const { useI18n, ofTypeI18n } = i18nBuilder
  .withThemeName<ThemeName>()
  .withCustomTranslations({
    en: en,
    de: de,
    ja: jp,
  })
  .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
