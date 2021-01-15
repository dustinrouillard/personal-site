import { ReactElement } from "react";

import styled from "styled-components";

interface StatProps {
  type: string;
  stat: number;
}

export function StatCard(props: StatProps): ReactElement {
  let stat_name = "Commands";

  switch (props.type) {
    case "commands":
      stat_name = "Commands Ran";
      break;
    case "builds":
      stat_name = "Builds Run";
      break;
    case "dev_time":
      stat_name = "Dev Hours";
      break;

    default:
      break;
  }

  return (
    <Card>
      {props.type == "dev_time" && (
        <Stat>{(props.stat / 3600).toFixed(2)}</Stat>
      )}
      {props.type != "dev_time" && <Stat>{props.stat.toLocaleString()}</Stat>}
      <Name>{stat_name}</Name>
    </Card>
  );
}

const Name = styled.h3`
  display: block;
  font-family: "FiraCode-Bold";
  font-size: 1em;
  color: black;
  font-weight: normal;
  text-align: center;
`;

const Stat = styled.h2`
  display: block;
  font-family: "FiraCode-Medium";
  font-size: 1.6em;
  color: black;
  font-weight: normal;
  text-align: center;
`;

const Card = styled.div`
  border-radius: 10px;
  box-shadow: 2px 2px 20px 0px #00000036;
  padding: 10px;
  min-width: 200px;
  max-width: 200px;
  margin-left: 20px;
  margin-right: 20px;
`;
