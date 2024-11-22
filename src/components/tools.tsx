import { SiKubernetes } from "react-icons/si";
import { TerminusSymbol } from "./icons/terminus";

import { HighlightedTool } from "../types/core";

export const HightlightedTools: HighlightedTool[] = [
  {
    name: "Terminus Solver",
    description: "Calculator for Beamsmasher Easter Egg on Black Ops 6",
    color: "#EF5002",
    url: "https://terminus.dstn.to",
    icon: (<TerminusSymbol />) as JSX.Element,
  },
  {
    name: "Kubernetes Out-of-service Controller",
    description:
      'Applies the out-of-service node taint whenever the node is "unreachable"',
    color: "#326CE5",
    url: "https://github.com/dustinrouillard/kube-node-oos-controller",
    icon: (<SiKubernetes size={"100%"} />) as JSX.Element,
  },
];
