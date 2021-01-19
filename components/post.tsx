import { ReactElement } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import NextLink from "next/link";

import { FormatTimeSince } from "../utils/time";
import { BlogPost } from "../utils/posts";

export function Post(props: BlogPost): ReactElement {
  return (
    <Card>
      <NextLink href={`/blog/post/${props.id}`} passHref>
        <Title>{props.title}</Title>
      </NextLink>
      <Summary>{props.summary}</Summary>
      <Footer>
        <NextLink href={`/blog/post/${props.id}`} passHref>
          <Read>Read Post</Read>
        </NextLink>
        <SeperatorDot>•</SeperatorDot>
        <Tooltip
          place="top"
          effect="solid"
          textColor="#ffffff"
          backgroundColor="#000000"
          arrowColor="#000000"
        />
        <Created data-tip={new Date(props.date).toLocaleString()}>
          {FormatTimeSince(new Date(props.date))}
        </Created>
      </Footer>
    </Card>
  );
}

const SeperatorDot = styled.span`
  padding-left: 8px;
  padding-right: 8px;
  font-size: 0.8em;
  opacity: 50%;
`;

const Read = styled.div`
  color: black;
  font-family: "FiraCode-Medium";
  font-size: 0.8em;
  font-weight: normal;
  text-decoration: none;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Tooltip = styled(ReactTooltip)`
  font-family: "FiraCode-Light";
`;

const Title = styled.h1`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.4em;
  color: black;
  margin-bottom: 15px;
  font-weight: normal;
  margin-top: 0px;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Summary = styled.h4`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 0.8em;
  color: black;
  margin-bottom: 15px;
  font-weight: normal;
  margin-top: 0px;
`;

const Created = styled.text`
  font-family: "FiraCode-Medium";
  font-size: 0.8em;
  padding-bottom: 9px;
  opacity: 40%;
`;

const Footer = styled.div`
  display: flex;
`;

const Card = styled.div``;
