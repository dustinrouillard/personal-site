import { useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import FontStyle from "../components/fonts";
import { Footer } from "../components/footer";
import { SetTheme, ToggleTheme } from "../utils/theme";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    box-sizing: border-box;
    background-color: var(--background, #ffffff);    
    min-height: 100%;
    position: relative;
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
    --alt-text: #ffffff
    --text: #000000
    --highlight-color: #127796
    --widget-background: #c8c8c8
    --background: #ffffff
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
  useEffect(() => {
    if (localStorage.getItem("theme-name"))
      SetTheme(localStorage.getItem("theme-name") as "light" | "dark");

    function keydown(event: KeyboardEvent) {
      if (event.key == "t") ToggleTheme();
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
      <Page>
        <FontStyle />
        <GlobalStyle />
        <Component {...pageProps} />
      </Page>
      <Footer />
    </>
  );
}
