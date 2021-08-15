import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

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
    const listener = (data: InternalPlayerResponse) => {
      if ('is_playing' in data) setListening(data.is_playing);
      setSpotify(state => { return { ...state, ...data }; });
    }

    gateway.on('spotify', listener);
    gateway.on('spotify_changed', listener);

    return () => {
      gateway.removeListener('spotify', listener);
      gateway.removeListener('spotify_changed', listener);
    }
  }, []);

  return (
    listening && !!spotify && (
      <Container>
        <Link target={'_blank'} href={`https://open.spotify.com/track/${spotify.item_id}`}>
          <Image
            src={spotify.item_image}
            width="50px"
          />
        </Link>
        <SpotifyInfo>
          <Text>{spotify.item_name}</Text>

          <Text
            size={10}>{spotify.item_author}</Text>
        </SpotifyInfo>
      </Container>
    )
  );
}

const Link = styled.a`
  color: var(--text);
  text-decoration: none;
  display: inherit;
`;

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

const Text = styled.p<{ size?: number }>`
  font-family: "FiraCode-Medium";
  color: var(--text);
  margin-left: 20px;
  margin-top: 3px;
  margin-bottom: 3px;
  width: auto;
  font-size: ${(props) => `${props.size || 15}px`};
`;

const Image = styled.img`
  cursor: pointer;
`;

const SpotifyInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
