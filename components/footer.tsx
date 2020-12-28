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
        <Text>Dustin Rouillard</Text>
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
        <Link
          target="_blank"
          href={"https://github.com/dustinrouillard/personal-site"}
        >
          View Source
        </Link>
      </div>
    </Container>
  );
}

const Text = styled.div`
  font-family: "FiraCode-Light";
  color: black;
  opacity: 50%;
`;

const Link = styled.a`
  font-family: "FiraCode-Light";
  color: black;
  text-decoration: none;
  opacity: 50%;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  margin: 50px;
  display: flex;
  flex-direction: row;
`;
