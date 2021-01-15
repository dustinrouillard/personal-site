import { default as NextLink } from "next/link";
import { ReactElement } from "react";

import styled from "styled-components";
import { SocialLinks } from "./socials";

export function Footer(): ReactElement {
  return (
    <Container>
      <div
        style={{
          position: "fixed",
          left: 0,
          marginLeft: "40px",
          marginRight: "40px",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <NextLink href="/" passHref>
          <Link>Dustin Rouillard</Link>
        </NextLink>
        <Text style={{ paddingLeft: "10px", paddingRight: "10px" }}>•</Text>
        <Text>1999 - {new Date().getFullYear()}</Text>
      </div>
      <div
        style={{
          position: "fixed",
          right: 0,
          marginRight: "40px",
          flexDirection: "row",
          display: "flex",
        }}
      >
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
      </div>
    </Container>
  );
}

const Text = styled.div`
  font-family: "FiraCode-Light";
  color: black;
  opacity: 50%;
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
  margin: 50px;
  display: flex;
  flex-direction: row;
`;
