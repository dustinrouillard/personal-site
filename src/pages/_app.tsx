import { Transition } from "@headlessui/react";
import PlausibleProvider from "next-plausible";
import { Toaster, ToastIcon, resolveValue } from "react-hot-toast";

import "../assets/app.css";

export default function App({ Component, pageProps }) {
  return (
    <PlausibleProvider
      domain="dstn.to"
      enabled={
        typeof window != "undefined" && window.location.hostname == "dstn.to"
      }
      selfHosted
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Noto+Color+Emoji&family=Coda&display=swap"
        rel="stylesheet"
      />

      <Toaster containerClassName="group">
        {(t) => (
          <div
            className={`transform flex justify-center items-center rounded-md p-2 bg-white text-black dark:bg-neutral-800 dark:text-white drop-shadow-xl max-w-96 ${t.className}`}
          >
            <Transition
              appear
              show={t.visible}
              enter="transition-all duration-50"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-75"
            >
              {t.position.includes("left") ? <ToastIcon toast={t} /> : <></>}
              <p className="px-2">{resolveValue(t.message, t)}</p>
              {t.position.includes("right") ? <ToastIcon toast={t} /> : <></>}
            </Transition>
          </div>
        )}
      </Toaster>

      <Component {...pageProps} />
    </PlausibleProvider>
  );
}
