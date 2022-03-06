import React, { useState } from 'react';
import { Tippy } from '../components/Tippy';
import styled from 'styled-components';
import { Placement } from 'tippy.js';

interface IconProps {
  size: number;
  highlight?: string;
  icon: (props: any) => JSX.Element;
  link?: string;
  color?: string;
  hovered?: boolean;
  tooltip?: string;
  tooltipPosition?: Placement;
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
      <Tippy content={props.tooltip} placement={props.tooltipPosition || 'bottom'} disabled={!props.tooltip}>
        <IconBase onMouseEnter={handleMouseEnter} data-tip="" data-for={props.tooltip} onMouseLeave={handleMouseLeave}>
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
      </Tippy>
    </>
  );
}

const Link = styled.a`
  color: var(--text, #000000);
  text-decoration: none;
`;

const IconBase = styled.div`
  color: var(--text, #000000);
`;
