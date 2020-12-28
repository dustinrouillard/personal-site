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
        size={48}
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
  background-color: #000000;
  margin: 15px;
  padding: 20px;
  align-items: center;
  display: flex;
`;

const Text = styled(TextTicker)`
  font-family: "FiraCode-Medium";
  color: #000000;
  margin-left: 20px;
  margin-top: 3px;
  margin-bottom: 3px;
  width: 280px;
`;

const SpotifyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
