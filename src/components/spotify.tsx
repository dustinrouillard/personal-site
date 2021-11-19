import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

import { InternalPlayerResponse } from "../types/gateway";

import { millisToMinutesAndSeconds } from "../utils/time";
import { gateway } from "../utils/gateway";

export interface Playing {
  item_name: string;
  item_author: string;
  item_id: string;
}

export function Spotify(): ReactElement {
  const [spotify, setSpotify] = useState<InternalPlayerResponse>();
  const [listening, setListening] = useState<boolean>(false);

  useEffect(() => {
    const listener = (data: InternalPlayerResponse) => {
      if ("is_playing" in data) setListening(data.is_playing);
      setSpotify((state) => {
        return { ...state, ...data };
      });
    };

    gateway.on("spotify", listener);

    return () => {
      gateway.removeListener("spotify", listener);
    };
  }, []);

  return (
    !!spotify && (
      <Root visible={listening}>
        <Container>
          <Link
            target={"_blank"}
            href={`https://open.spotify.com/${spotify.item_type}/${spotify.item_id}`}
          >
            <Image src={spotify.item_image} width="75px" />
          </Link>
          <SpotifyInfo>
            <Text>{spotify.item_name}</Text>

            <Text size={10}>{spotify.item_author}</Text>
          </SpotifyInfo>
        </Container>
        <Progress>
          <ProgressBar
            progress={(spotify.item_progress / spotify.item_length_ms) * 100}
          >
            {(spotify.item_progress / spotify.item_length_ms) * 100 > 15 && (
              <ProgressText inverted>
                {millisToMinutesAndSeconds(spotify.item_progress)} :{" "}
                {millisToMinutesAndSeconds(spotify.item_length_ms)}
              </ProgressText>
            )}
          </ProgressBar>
          {(spotify.item_progress / spotify.item_length_ms) * 100 < 15 && (
            <ProgressText>
              {millisToMinutesAndSeconds(spotify.item_progress)} :{" "}
              {millisToMinutesAndSeconds(spotify.item_length_ms)}
            </ProgressText>
          )}
        </Progress>
      </Root>
    )
  );
}

const Link = styled.a`
  color: var(--text);
  text-decoration: none;
  display: inherit;
`;

const Root = styled.div<{ visible: boolean }>`
  border-radius: 10px;
  width: 100%;
  height: 85px;
  background-color: var(--widget-background);
  box-shadow: 2px 2px 20px 0px #00000086;
  align-items: center;
  visibility: ${({ visible }) => (visible ? "visible" : "hidden")};
  display: ${({ visible }) => (visible ? "flex" : "none")};
  margin-top: 25px;
  flex-direction: column;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
`;

const Text = styled.p<{ size?: number }>`
  font-family: "FiraCode-Medium";
  color: var(--text);
  margin-left: 10px;
  margin-top: 1px;
  margin-bottom: 3px;
  padding-right: 20px;
  font-size: ${(props) => `${props.size || 15}px`};
`;

const Image = styled.img`
  cursor: pointer;
  border-top-left-radius: 10px;
`;

const SpotifyInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80px;
  overflow: hidden;
`;

const Progress = styled.div`
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  width: 100%;
  height: 10px;
  background-color: var(--widget-background);
  filter: brightness(70%);

  overflow: hidden;
  flex-direction: row;
  display: flex;
`;

const ProgressBar = styled.div`
  height: 10px;
  border-bottom-left-radius: 30px;
  overflow: hidden;
  color: var(--alt-text);
  background-color: var(--text);
  width: ${(props: { progress: number }) =>
    props.progress ? `${props.progress}%` : "0%"};
  transition: all 1000ms linear;
  transition: color 100ms linear;
  transition: background-color 100ms linear;
`;

const ProgressText = styled.p<{ inverted?: boolean }>`
  float: right;
  padding-right: 5px;
  padding-left: 5px;
  color: var(--text);
  margin: 0px;
  font-size: 8px;
  filter: ${({ inverted }) => (inverted ? "invert()" : "none")};
  font-family: "FiraCode-Medium";
  transition: all 500ms linear;
`;
