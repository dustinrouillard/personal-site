import { createGlobalStyle } from "styled-components";

import FiraCodeBold from "./FiraCode-Bold.woff2";
import FiraCodeRegular from "./FiraCode-Regular.woff2";
import FiraCodeMedium from "./FiraCode-Medium.woff2";
import FiraCodeLight from "./FiraCode-Light.woff2";

export default createGlobalStyle`
    @font-face {
        font-family: 'FiraCode-Bold';
        src: local('FiraCode-Bold'),
        url(${FiraCodeBold}) format('woff2');
    }
    @font-face {
        font-family: 'FiraCode-Regular';
        src: local('FiraCode-Regular'),
        url(${FiraCodeRegular}) format('woff2');
    }
    @font-face {
        font-family: 'FiraCode-Medium';
        src: local('FiraCode-Medium'),
        url(${FiraCodeMedium}) format('woff2');
    }
    @font-face {
        font-family: 'FiraCode-Light';
        src: local('FiraCode-Light'),
        url(${FiraCodeLight}) format('woff2');
    }
`;
