import { createGlobalStyle, ThemeProvider } from "styled-components";
import FontStyle from "../components/fonts";
import { Footer } from "../components/footer";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <FontStyle />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
