import ReactTooltip from "react-tooltip";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { useYearsAgo } from "../hooks/useTimeAgo";

const date = new Date("07/15/1999");

export function Age(): ReactElement {
  const age = useYearsAgo(date);

  return (
    <>
      <ReactTooltip id={"age"}>{age.toFixed(8)}</ReactTooltip>
      <Span underline data-tip="" data-for="age" alt={age.toString()}>
        {Math.floor(age)}
      </Span>
    </>
  );
}

const Span = styled.span<{ alt?: string; underline?: boolean }>`
  text-decoration: ${(props) => (props.underline ? "underline" : "none")};
`;
