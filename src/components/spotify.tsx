import { ReactElement, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "./icon";
import { Lanyard } from "../utils/lanyard";
import { LanyardSpotify } from "../types/lanyard";
import { faTag } from "@fortawesome/free-solid-svg-icons";

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
          <Text>{spotify.song}</Text>

          <Text
            size={10}>{spotify.artist}</Text>
        </SpotifyInfo>
        <PoweredBy>
          <Tooltip
            place="right"
            effect="solid"
            textColor="var(--text)"
            backgroundColor="var(--background)"
            arrowColor="var(--background)"
          />
          <Icon
            link="https://github.com/Phineas/lanyard"
            color="var(--text)"
            highlight="rgb(222 196 142)"
            icon={faTag}
            size={12}
            data-tip="Powered by Lanyard"
          />
        </PoweredBy>
      </Container>
    )
  );
}

const Container = styled.div`
  position: absolute;
  border-radius: 10px;
  width: 420px;
  height: 100px;
  background-color: var(--widget-background);
  box-shadow: 2px 2px 20px 0px #00000086;
  margin: 15px;
  padding: 20px;
  align-items: center;
  display: flex;
`;

const Tooltip = styled(ReactTooltip)`
  font-family: "FiraCode-Light";
  z-index: 1000;
`;

const PoweredBy = styled.div`
  position: absolute;
  right: 0;
  padding: 12px;
  bottom: 0;
`;

const Text = styled.p<{ size?: number }>`
  font-family: "FiraCode-Medium";
  color: var(--text);
  margin-left: 20px;
  margin-top: 3px;
  margin-bottom: 3px;
  width: auto;
  font-size: ${(props) => `${props.size || 15}px`};
`;

const SpotifyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
