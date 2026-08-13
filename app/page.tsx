import Script from "next/script";

import htmlSource from "../index.html?raw";
import cssSource from "../styles.css?raw";
import scriptSource from "../app.js?raw";

const bodyMatch = htmlSource.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
const bodyMarkup = (bodyMatch?.[1] ?? "")
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .trim();

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssSource }} />
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <Script id="neurohabitos-runtime" strategy="afterInteractive">
        {scriptSource}
      </Script>
    </>
  );
}
