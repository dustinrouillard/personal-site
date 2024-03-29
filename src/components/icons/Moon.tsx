import React from 'react';
import styled from 'styled-components';

export function Moon(props: { size?: number; highlight?: string; hovered?: boolean }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" fill="none" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
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
