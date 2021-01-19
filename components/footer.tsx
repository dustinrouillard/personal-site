import NextLink from "next/link";
import { ReactElement } from "react";
import styled from "styled-components";

import { SocialLinks } from "./socials";

export function Footer(): ReactElement {
  return (
    <Container>
      <LeftContainer>
        <NextLink href="/" passHref>
          <Link>Dustin Rouillard</Link>
        </NextLink>
        <Text style={{ paddingLeft: "10px", paddingRight: "10px" }}>•</Text>
        <Text>1999 - {new Date().getFullYear()}</Text>
      </LeftContainer>
      <RightContainer>
        <SocialLinks small />
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
  color: black;
  opacity: 50%;
`;

const LeftContainer = styled.div`
  position: fixed;
  left: 0;
  margin-left: 40px;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
`;

const RightContainer = styled.div`
  position: fixed;
  right: 0;
  margin-left: 40px;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
`;

const ExtLink = styled.a`
  font-family: "FiraCode-Light";
  color: black;
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
  color: black;
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
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  min-width: fit-content;
  background-color: #ffffff;
  padding-top: 40px;
  height: 100px;
  width: 100%;
  max-height: max-content;
`;
