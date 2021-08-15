import { ReactElement, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { Icon } from "./icon";
import { InternalPlayerResponse } from "../types/gateway";
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
    const newListener = (data: InternalPlayerResponse) => {
      if ('is_playing' in data) setListening(data.is_playing);
      setSpotify(data);
    }
    gateway.on('spotify', newListener);

    const changeListener = (data: InternalPlayerResponse) => {
      if ('is_playing' in data) setListening(data.is_playing);
      setSpotify(state => { return { ...state, ...data }; });
    }
    gateway.on('spotify_changed', changeListener);

    return () => {
      gateway.removeListener('spotify', newListener);
      gateway.removeListener('spotify_changed', changeListener);
    }
  }, []);

  return (
    listening && !!spotify && (
      <Container>
        <Icon
          link={`https://open.spotify.com/track/${spotify.item_id}`}
          size={38}
          color="#1DB954"
          icon={faSpotify}
        />
        <SpotifyInfo>
          <Text>{spotify.item_name}</Text>

          <Text
            size={10}>{spotify.item_author}</Text>
        </SpotifyInfo>
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
