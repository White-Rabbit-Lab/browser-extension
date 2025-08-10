import "@/entrypoints/global.css";
import { i18n, initI18n, listenForLanguageChanges } from "@/lib/i18n";
import React from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App.tsx";

// Initialize i18n before rendering
initI18n().then(() => {
  // Listen for language changes from storage
  listenForLanguageChanges();

  const container = document.getElementById("root");
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </React.StrictMode>,
    );
  }
});
