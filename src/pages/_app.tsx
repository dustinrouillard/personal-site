import React, { useEffect, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import FontStyle from "../components/fonts";
import { Footer } from "../components/footer";
import { SetTheme, ToggleTheme } from "../utils/theme";
import styled from "styled-components";
import Snowfall from "react-snowfall";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    background-color: var(--background, #ffffff);    
    min-height: 100%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
    transition: all 150ms linear;
  }

  :root {
    --alt-text: #000000;
    --text: #ffffff;
    --highlight-color: #127796;
    --widget-background: #393939;
    --background: #181a1b;
    --lightstrand: #a5a5a5;
  }

  .__react_component_tooltip {
    font-family: "FiraCode-Light";
    color: var(--text, #000000);
    background-color: var(--widget-background, #c8c8c8);
    box-shadow: 2px 2px 10px 0px #00000026;
  }
`;

const Page = styled.div`
  margin-bottom: 100px;
`;

export default function App({ Component, pageProps }) {
  const [snowflakes, setSnowflakes] = useState<boolean>(() => {
    if (typeof window == "undefined") return false;
    if (
      !localStorage.getItem("theme-name") ||
      localStorage.getItem("theme-name") == "dark"
    )
      return true;
    return true;
  });
  const [themeName, setThemeName] = useState<string>(() => {
    if (typeof window == "undefined") return "dark";
    if (!localStorage.getItem("theme-name")) return "dark";
    return localStorage.getItem("theme-name");
  });

  useEffect(() => {
    if (themeName == "light") setSnowflakes(false);
    else setSnowflakes(true);
  }, [themeName]);

  useEffect(() => {
    if (localStorage.getItem("theme-name"))
      SetTheme(localStorage.getItem("theme-name") as "light" | "dark");

    function keydown(event: KeyboardEvent) {
      if (event.key == "t") setThemeName(ToggleTheme());
    }

    if (typeof document != "undefined")
      document.addEventListener("keypress", keydown);

    return () => {
      if (typeof document != "undefined")
        document.removeEventListener("keypress", keydown);
    };
  }, []);

  return (
    <>
      {snowflakes && (
        <Snowfall
          speed={[0.5, 3.5]}
          snowflakeCount={60}
          wind={[-0.5, 2]}
          radius={[1, 2]}
          style={{
            zIndex: -1,
          }}
        />
      )}
      <Page>
        <FontStyle />
        <GlobalStyle />
        <Component {...pageProps} />
      </Page>
      <Footer />
    </>
  );
}
