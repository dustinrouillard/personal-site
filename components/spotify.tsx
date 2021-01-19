import { ReactElement } from "react";
import TextTicker from "react-text-marquee";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { Icon } from "./icon";

export interface Playing {
  item_name: string;
  item_author: string;
  item_id: string;
}

export function Spotify(props: { playing: Playing }): ReactElement {
  return (
    <Container>
      <Icon
        link={`https://open.spotify.com/track/${props.playing.item_id}`}
        size={38}
        color="#1DB954"
        icon={faSpotify}
      />
      <SpotifyInfo>
        <Text
          text={props.playing.item_name}
          leading={2 * 1e3}
          trailing={3 * 1e3}
          hoverToStop
          loop
        />

        <Text
          size={10}
          text={props.playing.item_author}
          leading={2 * 1e3}
          trailing={3 * 1e3}
          hoverToStop
          loop
        />
      </SpotifyInfo>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  border-radius: 10px;
  width: 400px;
  height: 75px;
  background-color: var(--widget-background);
  box-shadow: 2px 2px 20px 0px #00000086;
  margin: 15px;
  padding: 20px;
  align-items: center;
  display: flex;
`;

const Text = styled(TextTicker)<{ size?: number }>`
  font-family: "FiraCode-Medium";
  color: var(--text);
  margin-left: 20px;
  margin-top: 3px;
  margin-bottom: 3px;
  width: 280px;
  font-size: ${(props) => `${props.size || 15}px`};
`;

const SpotifyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
