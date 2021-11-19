import { ReactElement } from "react";
import styled from "styled-components";

import { Icon } from "./icon";

import { Github } from "./icons/Github";
import { LinkedIn } from "./icons/LinkedIn";
import { Mail } from "./icons/Mail";
import { Twitter } from "./icons/Twitter";

export function SocialLinks(props: any): ReactElement {
  return (
    <Icons {...props}>
      <IconWrapped first>
        <Icon
          size={25}
          icon={Twitter}
          highlight="#1DA1F2"
          link="https://dstn.to/twitter"
        />
      </IconWrapped>
      <IconWrapped>
        <Icon
          size={25}
          icon={Github}
          highlight="#9CDAF1"
          link="https://dstn.to/github"
        />
      </IconWrapped>
      <IconWrapped>
        <Icon
          size={25}
          icon={LinkedIn}
          highlight="#2867b2"
          link="https://dstn.to/linkedin"
        />
      </IconWrapped>
      <IconWrapped last>
        <Icon
          size={25}
          icon={Mail}
          highlight="#6257fc"
          link="mailto:comms@dstn.to"
        />
      </IconWrapped>
    </Icons>
  );
}

const Icons = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconWrapped = styled.div<{
  small?: boolean;
  first?: boolean;
  last?: boolean;
}>`
  padding-left: ${(props) =>
    !props.first ? (!props.small ? "7px" : "4px") : "0px"};
  padding-right: ${(props) =>
    !props.last ? (!props.small ? "7px" : "4px") : "0px"};
  opacity: ${(props) => (!props.small ? "100%" : "50%")};
`;
