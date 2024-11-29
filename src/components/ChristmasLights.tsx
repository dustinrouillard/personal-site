import { ReactElement } from "react";

export function ChristmasLights(): ReactElement {
  return (
    <ul className="text-center whitespace-nowrap overflow-hidden absolute z-10 -ml-3 p-0 pointer-events-none w-full h-full">
      {new Array(100).fill(1).map((_, index) => (
        <li className="christmas-light" key={index} />
      ))}
    </ul>
  );
}
