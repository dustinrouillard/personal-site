import React from 'react';
import styled from 'styled-components';

export function Github(props: { size?: number; highlight?: string; hovered?: boolean }) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height={props.size} viewBox="0 0 24 24" fill="none" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
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
