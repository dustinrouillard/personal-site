import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import NoSSR from "../components/nossr";

import { PageHead } from "../components/head";
import { Spotify } from "../components/spotify";
import { SocialLinks } from "../components/socials";

import { LanyardPresence } from "../types/lanyard";
import { lanyard } from "../utils/lanyard";
import { Repository } from "../components/Repository";
import { PinnedRepository } from "../types/github";
import { getPinnedRepositories } from "../utils/github";
import { ChristmasLights } from "../components/ChristmasLights";
import { Age } from "../components/age";

export default function Home(props: {
  stats: any;
  pinnedRepos: PinnedRepository[];
}) {
  const [status, setStatus] = useState<string>("offline");
  const [headSpin, setHeadSpin] = useState("0deg");
  const [headTimeout, setHeadTimeout] = useState<NodeJS.Timeout>();

  function presenceChange(data: LanyardPresence) {
    setStatus(data.discord_status || "offline");
  }

  function spinHead() {
    const deg = `${Math.floor(Math.random() * 300) + 60}deg`;
    setHeadSpin(deg);
    clearTimeout(headTimeout);
    setHeadTimeout(setTimeout(setHeadSpin, 1000, "0deg"));
  }

  useEffect(() => {
    lanyard.on("presence", presenceChange);

    return () => {
      lanyard.removeListener("presence", presenceChange);
    };
  }, []);

  return (
    <>
      <Outter>
        <PageHead name="Vibing" />
        <Container>
          <Sections>
            <TopSide>
              <Picture>
                <StyledImage rotate={headSpin} src="/christmas-avatar.png" />
              </Picture>
            </TopSide>

            <ProfileInfo>
              <NameAndStatus>
                <Name>Dustin Rouillard</Name>
                <NoSSR>
                  <ReactTooltip id={"presence"}>
                    {status == "dnd"
                      ? "Do not disturb"
                      : status.replace(
                          /\w\S*/g,
                          (txt) =>
                            txt.charAt(0).toUpperCase() +
                            txt.substr(1).toLowerCase()
                        )}
                  </ReactTooltip>
                </NoSSR>
                <StatusIcon data-tip="" data-for="presence" status={status} />
              </NameAndStatus>
              <Description>
                <Text>
                  Hi there <Span onClick={() => spinHead()}>👋🏼</Span> I’m
                  Dustin, I’m <Age /> years old.
                </Text>
                <Text>Backend developer and network/systems administrator</Text>
                <SocialWrapped />
                <Spotify />
              </Description>
            </ProfileInfo>

            <RightSide>
              <Picture>
                <StyledImage rotate={headSpin} src="/christmas-avatar.png" />
              </Picture>
            </RightSide>
          </Sections>
        </Container>

        <SeperatorLine />
        <ChristmasLights />

        <BottomSections>
          {!!props.pinnedRepos && (
            <>
              <SectionTitle>Pinned Repositories</SectionTitle>
              <Repositories>
                <RepositoriesRow>
                  {props.pinnedRepos.slice(0, 3).map((repo) => (
                    <Repository repo={repo} />
                  ))}
                </RepositoriesRow>
                <RepositoriesRow>
                  {props.pinnedRepos.slice(3, 6).map((repo) => (
                    <Repository repo={repo} />
                  ))}
                </RepositoriesRow>
              </Repositories>
            </>
          )}

          <SectionTitle>Weekly Activity Statistics</SectionTitle>
          <Activity>
            <>
              <NoSSR>
                <ReactTooltip id={"weekly-commands"}>
                  <ActivityContainer>
                    <ActivityStatBold>{0}</ActivityStatBold>
                    <ActivityStat right>Linux</ActivityStat>
                    <ActivityStatBold>{0}</ActivityStatBold>
                    <ActivityStat>Mac</ActivityStat>
                  </ActivityContainer>
                </ReactTooltip>
              </NoSSR>
              <ActivityContainer data-tip="" data-for={"weekly-commands"}>
                <ActivityStatBold>
                  {props.stats.weekly?.commands_ran.toLocaleString()}
                </ActivityStatBold>
                <ActivityStat>commands executed</ActivityStat>
              </ActivityContainer>
              <NoSSR>
                <ReactTooltip id={"weekly-builds"}>
                  <ActivityContainer>
                    <ActivityStatBold>{0}</ActivityStatBold>
                    <ActivityStat right>Linux</ActivityStat>
                    <ActivityStatBold>{0}</ActivityStatBold>
                    <ActivityStat>Mac</ActivityStat>
                  </ActivityContainer>
                </ReactTooltip>
              </NoSSR>
              <ActivityContainer data-tip="" data-for={"weekly-builds"}>
                <ActivityStatBold>
                  {props.stats.weekly?.builds_ran.toLocaleString()}
                </ActivityStatBold>
                <ActivityStat>docker builds assembled</ActivityStat>
              </ActivityContainer>
              <NoSSR>
                <ReactTooltip id={"weekly-kubectl"}>
                  <ActivityContainer>
                    <ActivityStatBold>{0}</ActivityStatBold>
                    <ActivityStat right>Linux</ActivityStat>
                    <ActivityStatBold>{0}</ActivityStatBold>
                    <ActivityStat>Mac</ActivityStat>
                  </ActivityContainer>
                </ReactTooltip>
              </NoSSR>
              <ActivityContainer data-tip="" data-for={"weekly-kubectl"}>
                <ActivityStatBold>
                  {props.stats.weekly?.kubectl_commands?.toLocaleString() || 0}
                </ActivityStatBold>
                <ActivityStat>kubectl commands executed</ActivityStat>
              </ActivityContainer>
              <ActivityContainer>
                <ActivityStatBold>
                  {(props.stats.weekly?.development_seconds / 3600).toFixed(2)}
                </ActivityStatBold>
                <ActivityStat>hours behind an editor</ActivityStat>
              </ActivityContainer>
            </>
          </Activity>
        </BottomSections>
      </Outter>
    </>
  );
}

const ProfileInfo = styled.div`
  align-self: center;

  @media only screen and (max-width: 1080px) {
    display: flex;
    flex-direction: column;
  }
`;

const Span = styled.span<{ alt?: string; underline?: boolean }>`
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
`;

const ActivityContainer = styled.div`
  font-family: "FiraCode-Light";
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin: 5px;
`;

const ActivityStat = styled.p<{ right?: boolean }>`
  margin: 0;
  color: var(--text, #000000);
  margin-right: ${(props) => (props.right ? "10px" : "0px")};
`;

const ActivityStatBold = styled.p`
  font-family: "FiraCode-Bold";
  margin: 0;
  margin-right: 10px;
  color: var(--text, #000000);
`;

const SocialWrapped = styled(SocialLinks)`
  margin-top: 20px;
`;

const Repositories = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 1080px) {
    flex-direction: column;
  }
`;

const RepositoriesRow = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1080px) {
    flex-direction: column;
  }
`;

const Activity = styled.div`
  font-family: "FiraCode-Light";
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 100px;
`;

const SectionTitle = styled.h3`
  font-family: "FiraCode-Bold";
  font-size: 1.2em;
  color: var(--text, #000000);
  font-weight: normal;
  margin-top: 50px;
`;

const BottomSections = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

const SeperatorLine = styled.div`
  display: flex;
  background-color: var(--background, #ffffff);
  filter: brightness(70%);
  height: 20px;
  width: 100%;
  margin-bottom: 10px;
  z-index: 1;
`;

const Outter = styled.div`
  min-height: 75vh;
`;

const NameAndStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media only screen and (max-width: 1080px) {
    justify-content: center;
  }
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

  display: flex;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin: 0;
  margin-left: 20px;
`;

const StyledImage = styled.img<{ rotate?: string }>`
  border-radius: 10px;
  min-width: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transform: ${(props) => (props.rotate ? `rotate(${props.rotate})` : "none")};
`;

const Container = styled.div`
  padding: 0 0.5rem;
  display: flex;
  margin-top: 75px;
  margin-bottom: 75px;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.h1`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1.9em;
  color: var(--text, #000000);
  font-weight: normal;

  @media only screen and (max-width: 1080px) {
    justify-content: center;
  }
`;

const Text = styled.div`
  display: block;
  padding-top: 30px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "FiraCode-Medium";
  font-size: 1.3em;
  color: var(--text, #000000);
  width: 80%;
  flex: 1;

  @media only screen and (max-width: 1080px) {
    align-items: center;
    justify-content: center;
    align-self: center;
    text-align: center;
  }
`;

const Sections = styled.div`
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 1080px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Picture = styled.div`
  position: relative;
  width: 350px;
  max-height: 470px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 30px;
  width: 350px;

  @media only screen and (max-width: 1080px) {
    visibility: hidden;
    display: none;
  }
`;

const TopSide = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: 30px;
  width: 350px;
  visibility: hidden;
  display: none;

  @media only screen and (max-width: 1080px) {
    visibility: visible;
    display: flex;
  }
`;

export async function getServerSideProps() {
  const res = await fetch(`https://rest.dstn.to/stats`).then((r) => r.json());
  const pinned = await getPinnedRepositories();

  return {
    props: {
      pinnedRepos: pinned,
      stats: res.data,
    },
  };
}
