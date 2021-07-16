import { ReactElement } from "react";
import styled from "styled-components";

import { default as NextLink } from "next/link";

export function LinkHead(): ReactElement {
  return (
    <Links>
      <NextLink href="/" passHref>
        <PageLink>Home</PageLink>
      </NextLink>
      {/* <NextLink href="/blog" passHref>
        <PageLink>Blog</PageLink>
      </NextLink> */}
      <NextLink href="/stats" passHref>
        <PageLink>Stats</PageLink>
      </NextLink>
    </Links>
  );
}

const Links = styled.div`
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: row;
  float: right;
`;

const PageLink = styled.div`
  font-family: "FiraCode-Light";
  color: var(--text);
  text-decoration: none;
  opacity: 50%;
  padding-right: 10px;
  padding-left: 10px;
  display: block;
  text-align: center;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;
