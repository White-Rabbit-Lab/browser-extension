import { i18n } from "#i18n";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save settings to storage
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{i18n.t("options.title")}</h1>

        {/* Language Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {i18n.t("options.language.title")}
          </h2>
          <p className="text-muted-foreground">
            {i18n.t("options.language.description")}
          </p>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button onClick={handleSave}>{i18n.t("options.save")}</Button>
          <Button variant="outline">{i18n.t("options.cancel")}</Button>
        </div>

        {/* Saved Message */}
        {saved && (
          <p className="mt-4 text-green-600">{i18n.t("options.saved")}</p>
        )}
      </div>
    </div>
  );
}

export default App;
