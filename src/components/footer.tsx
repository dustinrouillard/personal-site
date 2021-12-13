import React, { ReactElement } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";
import NextLink from "next/link";

import { ToggleTheme } from "../utils/theme";
import { Icon } from "./icon";
import { Moon } from "./icons/Moon";
import NoSSR from "./nossr";

export function Footer(): ReactElement {
  return (
    <Container>
      <LeftContainer>
        <NextLink href="/" passHref>
          <Link>dstn.to</Link>
        </NextLink>
        <Text style={{ paddingLeft: "10px", paddingRight: "10px" }}>•</Text>
        <Text>{new Date().getFullYear()}</Text>
      </LeftContainer>
      <RightContainer>
        <NoSSR>
          <ReactTooltip id={"theme-toggle"}>Toggle Theme (T)</ReactTooltip>
        </NoSSR>
        <MoonIcon
          data-tip=""
          data-for="theme-toggle"
          icon={Moon}
          size={15}
          onClick={ToggleTheme}
        />
        <Text style={{ paddingLeft: "10px", paddingRight: "10px" }}>•</Text>
        <NextLink
          href="https://github.com/dustinrouillard/personal-site"
          passHref
        >
          <ExtLink
            target="_blank"
            href={"https://github.com/dustinrouillard/personal-site"}
          >
            View Source
          </ExtLink>
        </NextLink>
      </RightContainer>
    </Container>
  );
}

const Text = styled.div`
  font-family: "FiraCode-Light";
  color: var(--text, #000000);
  opacity: 50%;
`;

const LeftContainer = styled.div`
  left: 0;
  margin-left: 40px;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
`;

const RightContainer = styled.div`
  right: 0;
  margin-left: 40px;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
`;

const ExtLink = styled.a`
  font-family: "FiraCode-Light";
  color: var(--text, #000000);
  text-decoration: none;
  opacity: 50%;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Link = styled.a`
  text-decoration: none;
  font-family: "FiraCode-Light";
  color: var(--text, #000000);
  opacity: 50%;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  min-width: fit-content;
  padding-top: 40px;
  width: 100%;
  z-index: 2;
  max-height: max-content;
  justify-content: space-between;
  padding-bottom: 40px;
  background-color: var(--background, #ffffff);

  @media only screen and (max-width: 1080px) {
    visibility: hidden;
  }
`;

const MoonIcon = styled(Icon)`
  text-decoration: none;
  font-family: "FiraCode-Light";
  color: var(--text, #000000);
  opacity: 50%;
  :hover {
    cursor: pointer;
    color: #127796;
  }
`;
