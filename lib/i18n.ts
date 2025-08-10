import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { browser } from "wxt/browser";
import enTranslations from "./locales/en.json";
import jaTranslations from "./locales/ja.json";

// Get browser's default language
export function getBrowserLanguage(): string {
  const uiLanguage = browser.i18n.getUILanguage();
  // Extract language code (e.g., "en-US" -> "en", "ja" -> "ja")
  const languageCode = uiLanguage ? uiLanguage.substring(0, 2) : "en";
  // Ensure we only return supported languages
  return ["en", "ja"].includes(languageCode) ? languageCode : "en";
}

// Initialize i18next
async function initI18n() {
  // Get saved language preference from storage
  const stored = await browser.storage.sync.get("language");
  const savedLanguage = stored.language as string | undefined;

  // Use saved language or fall back to browser language
  const defaultLanguage = savedLanguage || getBrowserLanguage();

  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: enTranslations,
      },
      ja: {
        translation: jaTranslations,
      },
    },
    lng: defaultLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense for extension context
    },
  });

  return defaultLanguage;
}

// Save language preference to storage
export async function saveLanguagePreference(language: string) {
  await browser.storage.sync.set({ language });
}

// Listen for storage changes to sync language across extension pages
export function listenForLanguageChanges() {
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "sync" && changes.language) {
      const newLanguage = changes.language.newValue as string;
      i18n.changeLanguage(newLanguage);
    }
  });
}

export { i18n, initI18n };
