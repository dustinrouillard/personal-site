import React from "react";
import styled from "styled-components";

export function Star(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14L2 9.27l6.91-1.01L12 2z" />
      </g>
    </Svg>
  );
}

const Svg = styled.svg``;
