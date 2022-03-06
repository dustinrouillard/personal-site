import React from "react";
import styled from "styled-components";

export function Dollar(props: {
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
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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
