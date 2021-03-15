import { ReactElement, useEffect, useState } from "react";
import TextTicker from "react-text-marquee";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import { Icon } from "./icon";
import { Lanyard } from "../utils/lanyard";
import { LanyardPresence, LanyardSpotify } from "../types/lanyard";

export interface Playing {
  item_name: string;
  item_author: string;
  item_id: string;
}

export function Spotify(): ReactElement {
  const [spotify, setSpotify] = useState<LanyardSpotify>();
  const [listening, setListening] = useState<boolean>(false);

  useEffect(() => {
    const lanyard = new Lanyard("156114103033790464");
    lanyard.on("presence", (data) => {
      if (data.listening_to_spotify) {
        setSpotify(data.spotify);
        setListening(data.listening_to_spotify);
      } else {
        setListening(data.listening_to_spotify);
        setSpotify(null);
      }
    });
  }, []);

  return (
    listening && (
      <Container>
        <Icon
          link={`https://open.spotify.com/track/${spotify.track_id}`}
          size={38}
          color="#1DB954"
          icon={faSpotify}
        />
        <SpotifyInfo>
          <Text
            text={spotify.song}
            leading={2 * 1e3}
            trailing={3 * 1e3}
            hoverToStop
            loop
          />

          <Text
            size={10}
            text={spotify.artist}
            leading={2 * 1e3}
            trailing={3 * 1e3}
            hoverToStop
            loop
          />
        </SpotifyInfo>
      </Container>
    )
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
