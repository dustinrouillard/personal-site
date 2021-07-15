import { ReactElement } from "react";

import styled from "styled-components";

import {
  faSnapchatGhost,
  faTwitter,
  faGithubAlt,
  faSpotify,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "./icon";

export function SocialLinks(props: {
  size?: number;
  small?: boolean;
}): ReactElement {
  return (
    <Icons small={props.small}>
      <IconWrapped small={props.small} last>
        <Icon
          size={props.small ? 15 : 25}
          icon="polywork"
          highlight="#6661af"
          link="https://p.dstn.to"
        />
      </IconWrapped>
      <IconWrapped small={props.small}>
        <Icon
          size={props.small ? 15 : 25}
          icon={faSnapchatGhost}
          highlight="#FFFC00"
          link="https://dstn.to/snapchat"
        />
      </IconWrapped>
      <IconWrapped small={props.small}>
        <Icon
          size={props.small ? 15 : 25}
          icon={faTwitter}
          highlight="#1DA1F2"
          link="https://dstn.to/twitter"
        />
      </IconWrapped>
      <IconWrapped small={props.small}>
        <Icon
          size={props.small ? 15 : 25}
          icon={faGithubAlt}
          highlight="#333333"
          link="https://dstn.to/github"
        />
      </IconWrapped>
      <IconWrapped small={props.small}>
        <Icon
          size={props.small ? 15 : 25}
          icon={faSpotify}
          highlight="#1DB954"
          link="https://dstn.to/mixtape"
        />
      </IconWrapped>
      <IconWrapped small={props.small}>
        <Icon
          size={props.small ? 15 : 25}
          icon={faDiscord}
          highlight="#7289DA"
          link="https://dstn.to/discord"
        />
      </IconWrapped>
      <IconWrapped small={props.small} last>
        <Icon
          size={props.small ? 15 : 25}
          icon={faEnvelope}
          highlight="#6257fc"
          link="mailto:dustin@rouillard.dev"
        />
      </IconWrapped>
    </Icons>
  );
}

const Icons = styled.div<{ small: boolean }>`
  margin-top: ${(props) => (!props.small ? "50px" : "0px")};
  display: flex;
  flex-direction: row;
  float: right;
  align-self: flex-end;
`;

const IconWrapped = styled.div<{ small?: boolean; last?: boolean }>`
  padding-left: ${(props) => (!props.small ? "7px" : "4px")};
  padding-right: ${(props) =>
    !props.last ? (!props.small ? "7px" : "4px") : "0px"};
  opacity: ${(props) => (!props.small ? "100%" : "50%")};
`;
