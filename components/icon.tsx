import { ReactElement } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconProps {
  size: number;
  highlight?: string;
  icon: IconDefinition;
  link?: string;
  color?: string;
}

export function Icon(props: IconProps): ReactElement {
  return (
    <>
      {!!props.link && (
        <Link href={props.link} target="_blank">
          <FaIcon
            width={props.size}
            height={props.size}
            icon={props.icon}
            highlight={props.highlight}
            color={props.color}
            link={!!props.link}
          />
        </Link>
      )}
      {!props.link && (
        <FaIcon
          width={props.size}
          height={props.size}
          icon={props.icon}
          highlight={props.highlight}
          color={props.color}
          link={!!props.link}
        />
      )}
    </>
  );
}

const Link = styled.a`
  color: black;
  text-decoration: none;
`;

const FaIcon = styled(FontAwesomeIcon)<{
  highlight: string;
  color?: string;
  link?: boolean;
}>`
  cursor: ${(props) => (props.link ? "pointer" : "default")};
  color: ${(props) => (props.color ? props.color : "#000000")};
  transition: opacity 0.2s ease-out;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${(props) => (props.highlight ? props.highlight : "")};
    opacity: 100%;
  }
`;
