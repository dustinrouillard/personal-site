import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

import NoSSR from "./nossr";

interface IconProps {
  size: number;
  highlight?: string;
  icon: (props: any) => JSX.Element;
  link?: string;
  color?: string;
  hovered?: boolean;
  tooltip?: string;
  onClick?: () => void;
}

export function Icon(props: IconProps): JSX.Element {
  const [hovered, setHovered] = useState(false);

  function handleMouseEnter() {
    setHovered(true);
  }

  function handleMouseLeave() {
    setHovered(false);
  }

  const IconProp = props.icon;

  return (
    <>
      {!!props.tooltip && (
        <NoSSR>
          <ReactTooltip id={props.tooltip}>{props.tooltip}</ReactTooltip>
        </NoSSR>
      )}
      <IconBase
        onMouseEnter={handleMouseEnter}
        data-tip=""
        data-for={props.tooltip}
        onMouseLeave={handleMouseLeave}
      >
        {!!props.link && (
          <Link href={props.link} target="_blank">
            <IconProp
              size={props.size}
              hovered={hovered}
              highlight={props.highlight}
              link={!!props.link}
              onClick={props.onClick}
              {...props}
            />
          </Link>
        )}
        {!props.link && (
          <IconProp
            size={props.size}
            hovered={hovered}
            highlight={props.highlight}
            link={!!props.link}
            onClick={props.onClick}
            {...props}
          />
        )}
      </IconBase>
    </>
  );
}

const Link = styled.a`
  color: var(--text, #000000);
  text-decoration: none;
`;

const IconBase = styled.div``;
