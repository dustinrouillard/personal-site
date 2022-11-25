import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SpotifyPlayingData } from '../types/gateway';
import { LanyardActivity, LanyardPresence } from '../types/lanyard';
import { gateway } from '../utils/gateway';
import { lanyard } from '../utils/lanyard';
import { Spotify } from './spotify';
import { VSCode } from './vscode';

export function Presence() {
  const [spotify, setSpotify] = useState<SpotifyPlayingData>();
  const [vsCode, setVsCode] = useState<LanyardActivity>();
  const [listening, setListening] = useState<boolean>(false);

  function presenceChange(data: LanyardPresence) {
    const vscode = data.activities.find((activity) => activity.application_id == '383226320970055681');
    if (vscode) setVsCode(vscode);
    else setVsCode(null);
  }

  useEffect(() => {
    const listener = (data: SpotifyPlayingData) => {
      if ('playing' in data) setListening(data.playing);
      setSpotify((state) => {
        return { ...state, ...data };
      });
    };

    gateway.on('spotify', listener);
    lanyard.on('presence', presenceChange);

    return () => {
      gateway.removeListener('spotify', listener);
      lanyard.removeListener('presence', presenceChange);
    };
  }, []);

  return (
    <WrappedPresence>
      {listening && <Spotify spotify={spotify} listening={listening} small={!!vsCode} />}
      {!!vsCode && listening && <Right />}
      {!!vsCode && <VSCode small={listening} vscode={vsCode} />}
    </WrappedPresence>
  );
}

const WrappedPresence = styled.div`
  display: flex;
  flex-direction: row;
`;

const Right = styled.div`
  margin-right: 10px;
`;
