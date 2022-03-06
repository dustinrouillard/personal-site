import React from "react";
import styled from "styled-components";

export function Fork(props: any) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 7.83V12h3a3 3 0 0 0 3-3V7.83a3.001 3.001 0 1 1 2 0V9a5 5 0 0 1-5 5H9v2.17a3.001 3.001 0 1 1-2 0V7.83a3.001 3.001 0 1 1 2 0zM8 20a1 1 0 1 0 0-2a1 1 0 0 0 0 2zm8-14a1 1 0 1 0 0-2a1 1 0 0 0 0 2zM8 6a1 1 0 1 0 0-2a1 1 0 0 0 0 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </Svg>
  );
}

const Svg = styled.svg``;
