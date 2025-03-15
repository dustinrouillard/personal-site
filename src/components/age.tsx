import { Tippy } from "./tippy";
import React, { ReactElement } from "react";

import { useYearsAgo } from "../hooks/useYearsAgo";

const date = new Date("07/15/1999");

export function Age(): ReactElement {
  const age = useYearsAgo(date);

  return (
    <>
      <Tippy content={age.toFixed(8)}>
        <span>{Math.floor(age)} years</span>
      </Tippy>
    </>
  );
}
