import React from "react";
import styled from "styled-components";

export function Twitter(props: {
  size?: number;
  highlight?: string;
  hovered?: boolean;
  link?: boolean;
}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53a4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </g>
    </Svg>
  );
}

const Svg = styled.svg<{
  size?: number;
  highlight?: string;
  hovered?: boolean;
  link?: boolean;
}>`
  height: ${(props) => `${props.size}px`};
  cursor: ${(props) => (props.link ? "default" : "pointer")};
  transition: opacity 0.2s ease-out;
  transition: color 0.2s ease-out;

  :hover {
    color: ${(props) => (props.highlight ? props.highlight : "")};
    opacity: 100%;
  }
`;
