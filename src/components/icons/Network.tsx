import React from 'react';
import styled from 'styled-components';

export function Network(props: { size?: number; highlight?: string; hovered?: boolean }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 256"
      fill="none"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path
          fill="currentColor"
          d="M176 160a39.7 39.7 0 0 0-28.6 12.1l-46.1-29.6a40.3 40.3 0 0 0 0-29l46.1-29.6A40 40 0 1 0 136 56a41 41 0 0 0 2.7 14.5l-46.1 29.6a40 40 0 1 0 0 55.8l46.1 29.6A41 41 0 0 0 136 200a40 40 0 1 0 40-40Zm0-128a24 24 0 1 1-24 24a24.1 24.1 0 0 1 24-24ZM64 152a24 24 0 1 1 24-24a24.1 24.1 0 0 1-24 24Zm112 72a24 24 0 1 1 24-24a24.1 24.1 0 0 1-24 24Z"
        />
      </g>
    </Svg>
  );
}

const Svg = styled.svg<{
  size?: number;
  highlight?: string;
  hovered?: boolean;
}>`
  height: ${(props) => `${props.size}px`};
  transition: opacity 0.2s ease-out;
  transition: color 0.2s ease-out;

  :hover {
    color: ${(props) => (props.highlight ? props.highlight : '')};
    opacity: 100%;
  }
`;
