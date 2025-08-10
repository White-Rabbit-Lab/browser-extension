import { i18n, initI18n, listenForLanguageChanges } from "@/lib/i18n";
import React from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import "../global.css";
import App from "./App.tsx";

// Initialize i18n before rendering
initI18n().then(() => {
  // Listen for language changes from storage
  listenForLanguageChanges();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </React.StrictMode>,
  );
});
