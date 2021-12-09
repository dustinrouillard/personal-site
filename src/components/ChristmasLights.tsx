import { ReactElement } from "react";
import styled from "styled-components";

export function ChristmasLights(): ReactElement {
  return (
    <Lights>
      {new Array(100).fill(1).map((_, index) => (
        <Light key={index} />
      ))}
    </Lights>
  );
}

const Lights = styled.ul`
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
  z-index: 1;
  margin: -10px 0 0 0;
  padding: 0;
  pointer-events: none;
  width: 100%;

  @keyframes flash-1 {
    0%,
    100% {
      background: rgba(0, 247, 165, 1);
      box-shadow: 0px 4.666 24px 3px rgba(0, 247, 165, 1);
    }
    50% {
      background: rgba(0, 247, 165, 0.4);
      box-shadow: 0px 4.666 24px 3px rgba(0, 247, 165, 0.2);
    }
  }
  @keyframes flash-2 {
    0%,
    100% {
      background: rgba(0, 255, 255, 1);
      box-shadow: 0px 4.666 24px 3px rgba(0, 255, 255, 1);
    }
    50% {
      background: rgba(0, 255, 255, 0.4);
      box-shadow: 0px 4.666 24px 3px rgba(0, 255, 255, 0.2);
    }
  }
  @keyframes flash-3 {
    0%,
    100% {
      background: rgba(247, 0, 148, 1);
      box-shadow: 0px 4.666 24px 3px rgba(247, 0, 148, 1);
    }
    50% {
      background: rgba(247, 0, 148, 0.4);
      box-shadow: 0px 4.666 24px 3px rgba(247, 0, 148, 0.2);
    }
  }
`;

const Light = styled.li`
  z-index: 1;
  position: relative;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  width: 12px;
  height: 28px;
  border-radius: 50%;
  margin-left: 22px;
  margin-right: 22px;
  display: inline-block;
  background: rgba(0, 247, 165, 1);
  box-shadow: 0px 4.666 24px 3px rgba(0, 247, 165, 1);
  animation-name: flash-1;
  animation-duration: 2s;
  :nth-child(2n + 1) {
    background: rgba(0, 255, 255, 1);
    box-shadow: 0px 4.666 24px 3px rgba(0, 255, 255, 0.5);
    animation-name: flash-2;
    animation-duration: 0.4s;
  }
  :nth-child(4n + 2) {
    background: rgba(247, 0, 148, 1);
    box-shadow: 0px 4.666 24px 3px rgba(247, 0, 148, 1);
    animation-name: flash-3;
    animation-duration: 1.1s;
  }
  :nth-child(odd) {
    animation-duration: 1.8s;
  }
  :nth-child(3n + 1) {
    animation-duration: 1.4s;
  }
  :before {
    content: "";
    position: absolute;
    background: var(--text);
    width: 10px;
    height: 9.333px;
    border-radius: 3px;
    top: -4.666px;
    left: 1px;
  }
  :after {
    content: "";
    top: -14px;
    left: 9px;
    position: absolute;
    width: 52px;
    height: 18.666px;
    border-bottom: solid var(--text) 2px;
    border-radius: 50%;
  }
  :last-child:after {
    content: none;
  }
  :first-child {
    margin-left: -40px;
  }
`;
