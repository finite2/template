import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import "./i18n.d.ts";
import en from "./translations/EN_US.json";

export { Trans, useTranslation } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // avoiding I18nextProvider
  .init({
    fallbackLng: "en",
    debug: true,

    returnNull: false,

    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    resources: {
      en: {
        translation: en,
      },
    },
  });

export { i18n };
