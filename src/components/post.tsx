import NextLink from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';

import { useTimeSince } from '../utils/time';
import { BlogPost } from '../utils/posts';

export function Post(props: BlogPost): ReactElement {
  const time = useTimeSince(new Date(props.date));

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
        {/* <Tooltip
          place="top"
          effect="solid"
          textColor="var(--text, #000000)"
          backgroundColor="var(--background, #ffffff)"
          arrowColor="var(--background, #ffffff)"
        /> */}
        <Created data-tip={new Date(props.date).toLocaleString()}>{time}</Created>
      </Footer>
    </Card>
  );
}

const SeperatorDot = styled.span`
  color: var(--text, #000000);
  padding-left: 8px;
  padding-right: 8px;
  font-size: 0.8em;
  opacity: 50%;
`;

const Read = styled.div`
  color: var(--text, #000000);
  font-family: 'FiraCode-Medium';
  font-size: 0.8em;
  font-weight: normal;
  text-decoration: none;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  display: block;
  font-family: 'FiraCode-Bold';
  font-size: 1.4em;
  color: var(--text, #000000);
  margin-bottom: 15px;
  font-weight: normal;
  margin-top: 0px;
  max-width: fit-content;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Summary = styled.h4`
  display: block;
  font-family: 'FiraCode-Bold';
  font-size: 0.8em;
  color: var(--text, #000000);
  margin-bottom: 15px;
  font-weight: normal;
  margin-top: 0px;
`;

const Created = styled.text`
  color: var(--text, #000000);
  font-family: 'FiraCode-Medium';
  font-size: 0.8em;
  padding-bottom: 9px;
  opacity: 40%;
`;

const Footer = styled.div`
  display: flex;
`;

const Card = styled.div``;
