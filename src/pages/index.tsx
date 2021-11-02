import { default as NextLink } from "next/link";
import { useState, useEffect } from "react";

import styled from "styled-components";
import { PageHead } from "../components/head";
import { Icon } from "../components/icon";
import { SocialLinks } from "../components/socials";
import { Spotify } from "../components/spotify";
import { useYearsAgo } from "../hooks/useTimeAgo";
import { InternalPlayerResponse } from "../types/gateway";
import { LanyardPresence } from "../types/lanyard";
import { gateway } from "../utils/gateway";
import { lanyard } from "../utils/lanyard";

const date = new Date("07/15/1999");

export default function Home() {
  const age = useYearsAgo(date);

  const [status, setStatus] = useState<string>();

  function presenceChange(data: LanyardPresence) {
    setStatus(data.discord_status || "offline");
  }

  useEffect(() => {
    lanyard.on("presence", presenceChange);

    return () => {
      lanyard.removeListener("presence", presenceChange);
    };
  }, []);

  return (
    <>
      <Container>
        <PageHead name="Vibing" />

        <Sections>
          <ProfileInfo>
            <Links>
              <NextLink href="/stats" passHref>
                <PageLink>Stats</PageLink>
              </NextLink>
            </Links>
            <Name>Dustin Rouillard</Name>
            <Description>
              <Text>Hi there 👋🏼 I’m Dustin</Text>

              <Text>
                I’m a <Span alt={age.toString()}>{Math.floor(age)}</Span> year
                old software engineer and network/systems administrator
              </Text>

              <SocialLinks />
            </Description>
          </ProfileInfo>

          <Picture>
            {!!status && (
              <LanyardStatus>
                <StatusText>{status.toUpperCase()}</StatusText>
                <StatusIcon status={status} />
              </LanyardStatus>
            )}
            <StyledImage src="/avatar.png" />
            <Spotify />
          </Picture>
        </Sections>
      </Container>
    </>
  );
}

const ProfileInfo = styled.div`
  width: 50%;
  align-self: center;
`;

const Span = styled.span<{ alt?: string }>``;

const LanyardStatus = styled.div`
  display: flex;
  position: absolute;
  z-index: 10;

  background-color: var(--widget-background);
  border-radius: 10px;

  margin-bottom: -10px;
  margin-right: -10px;
  margin-left: 10px;
  margin-top: 10px;

  padding: 5px;
  bottom: 0;
  right: 0;

  align-items: center;
`;

const StatusIcon = styled.span<{ status: string }>`
  background-color: ${({ status }) =>
    status == "dnd"
      ? "red"
      : status == "idle"
      ? "yellow"
      : status == "online"
      ? "green"
      : "grey"};

  border-radius: 50%;
  border: 0.2px solid var(--text);
  width: 10px;
  height: 10px;

  margin: 0;
  margin-left: 3px;
  margin-right: 3px;
`;

const StatusText = styled.p`
  font-size: 1em;
  font-family: "FiraCode-Light";
  color: var(--text);
  margin: 0;
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledImage = styled.img`
  border-radius: 10px;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  float: right;
`;

const PageLink = styled.div`
  font-family: "FiraCode-Light";
  color: var(--text);
  text-decoration: none;
  opacity: 50%;
  padding-left: 20px;
  display: block;
  text-align: right;
  :hover {
    cursor: pointer;
    color: #127796;
    text-decoration: underline;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Name = styled.h1`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.9em;
  text-align: right;
  color: var(--text);
  margin-bottom: 30px;
  font-weight: normal;
  padding-top: 30px;
  margin-top: 10px;
`;

const Text = styled.div`
  display: block;
  text-align: right;
  padding-top: 30px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "FiraCode-Medium";
  font-size: 1.3em;
  color: var(--text);
  width: 65%;
  flex: 1;
  float: right;
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  padding: 50px;
  margin: 50px;
`;

const Picture = styled.div`
  position: relative;
  width: 350px;
  max-height: 470px;
  margin-left: 30px;
`;
