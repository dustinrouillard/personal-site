import { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

import { msToTime } from "../utils/time";
import { LanyardActivity } from "../types/lanyard";

export interface Playing {
  item_name: string;
  item_author: string;
  item_id: string;
}

interface VSCodeProps {
  small?: boolean;
  vscode?: LanyardActivity;
}

export function VSCode(props: VSCodeProps): ReactElement {
  const [timestamp, setTimestamp] = useState<number>(
    new Date().getTime() - props.vscode.timestamps.start
  );

  useEffect(() => {
    const int = setInterval(() => {
      setTimestamp(new Date().getTime() - props.vscode.timestamps.start);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [props.vscode]);

  return (
    !!props.vscode && (
      <Root visible={!!props.vscode} small={props.small}>
        <Container>
          <Image
            src={
              props.vscode.assets.large_image.startsWith("mp:external")
                ? props.vscode.assets.large_image.replace(
                    /mp:external\/([^\/]*)\/(http[s])/g,
                    "$2:/"
                  )
                : `https://cdn.discordapp.com/app-assets/${props.vscode.application_id}/${props.vscode.assets.large_image}.webp`
            }
            width="auto"
            height="auto"
          />
          <PresenceInfo>
            <Text size={12}>{props.vscode.name}</Text>

            <Text size={9}>{props.vscode.details}</Text>
            <Text size={9}>{props.vscode.state}</Text>
            <Text size={9}>Time: {msToTime(timestamp)}</Text>
          </PresenceInfo>
        </Container>
      </Root>
    )
  );
}

const Root = styled.div<{ visible: boolean; small: boolean }>`
  border-radius: 10px;
  width: ${(props) => (props.small ? "50%" : "100%")};
  height: 85px;
  background-color: var(--widget-background, #c8c8c8);
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
`;

const Text = styled.p<{ size?: number }>`
  font-family: "FiraCode-Medium";
  color: var(--text, #000000);
  margin-left: 10px;
  margin-top: 1px;
  margin-bottom: 3px;
  padding-right: 20px;
  font-size: ${(props) => `${props.size || 15}px`};
`;

const Image = styled.img`
  width: auto;
  height: 85px;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const PresenceInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80px;
`;
