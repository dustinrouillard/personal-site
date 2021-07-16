import { ReactElement } from "react";

import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Polywork as PolyworkIcon } from "./icons/Polywork";
import { useState } from "react";

interface IconProps {
  size: number;
  highlight?: string;
  icon: IconDefinition | string;
  link?: string;
  color?: string;
  hovered?: boolean;
  onClick?: () => void;
}

export function Icon(props: IconProps): ReactElement {
  const [hovered, setHovered] = useState(false);

  function getSvg(icon: string, props: any) {
    switch (icon) {
      case 'polywork':
        return (<Polywork {...props} />)
    }
  }

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  return (
    <IconBase onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!!props.link && typeof props.icon != 'string' && (
        <Link href={props.link} target="_blank">
          <FaIcon
            width={props.size}
            height={props.size}
            icon={props.icon}
            highlight={props.highlight}
            color={props.color}
          />
        </Link>
      )}
      {!props.link && typeof props.icon != 'string' && (
        <FaIcon
          onClick={props.onClick}
          width={props.size}
          height={props.size}
          icon={props.icon}
          highlight={props.highlight}
          color={props.color}
        />
      )}
      {!!props.link && typeof props.icon == 'string' && <Link href={props.link} target="_blank"><Polywork size={props.size} hovered={hovered} highlight={props.highlight} link={!!props.link} /></Link>}
      {!props.link && typeof props.icon == 'string' && <Polywork size={props.size} hovered={hovered} highlight={props.highlight} link={!!props.link} />}
    </IconBase>
  );
}

const Link = styled.a`
  color: var(--text);
  text-decoration: none;
`;

const IconBase = styled.div``;

const FaIcon = styled(FontAwesomeIcon) <{
  highlight: string;
  color?: string;
  link?: boolean;
}>`
  cursor: ${(props) => (props.link ? "default" : "pointer")};
  color: ${(props) => (props.color ? props.color : "var(--text)")};
  transition: opacity 0.2s ease-out;
  transition: color 0.2s ease-out;

  &:hover {
    color: ${(props) => (props.highlight ? props.highlight : "")};
    opacity: 100%;
  }
`;

const Polywork = styled(PolyworkIcon) <{
  size?: number;
  highlight: string;
  hovered?: boolean;
  link?: boolean;
}>`
  height: ${(props) => `${props.size}px`};
  cursor: ${(props) => (props.link ? "default" : "pointer")};
  transition: opacity 0.2s ease-out;
  transition: color 0.2s ease-out;
`;
