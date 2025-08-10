import { i18n } from "#i18n";
import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import wxtLogo from "/wxt.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-[350px] min-h-screen p-8 text-center bg-background dark:bg-[#242424] text-foreground dark:text-white/90 font-['Inter',_system-ui,_Avenir,_Helvetica,_Arial,_sans-serif]">
      <div className="flex items-center justify-center mb-8">
        <a href="https://wxt.dev" target="_blank" rel="noreferrer">
          <img
            src={wxtLogo}
            className="h-24 p-6 will-change-[filter] transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#54bc4ae0]"
            alt={i18n.t("logoAlt.wxt")}
          />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="h-24 p-6 will-change-[filter] transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
            alt={i18n.t("logoAlt.react")}
          />
        </a>
      </div>
      <h1 className="text-[3.2em] leading-[1.1] font-normal mb-8">
        {i18n.t("title")}
      </h1>
      <div className="flex flex-col gap-4">
        <Button
          onClick={() => setCount((count) => count + 1)}
          size="lg"
          id="counter"
          className="w-full"
        >
          {i18n.t("button.count", [count])}
        </Button>
        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: i18n
              .t("instructions.editCode")
              .replace("<code>", '<code class="text-primary">'),
          }}
        />
        <p className="text-muted-foreground">
          {i18n.t("instructions.learnMore")}
        </p>
      </div>
    </div>
  );
}

export default App;
