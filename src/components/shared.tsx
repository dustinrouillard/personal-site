import { SiKubernetes, SiSocialblade } from "react-icons/si";
import { TerminusSymbol } from "./icons/terminus";

import { HighlightedTool, Work } from "../types/core";
import { BoostedTrackingLogo } from "./icons/boosted";

export const HighlightedTools: HighlightedTool[] = [
  {
    name: "Riderr",
    description: "Tracking application for Boosted Boards with a social aspect",
    color: "#EE7643",
    url: "https://riderr.app",
    icon: (<BoostedTrackingLogo />) as JSX.Element,
  },
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
    icon: (<SiKubernetes size={"auto"} />) as JSX.Element,
  },
];

export const HighlightedWorks: Work[] = [
  {
    name: "Social Blade",
    title: "Part-Time Software Engineer",
    color: "rgb(179, 56, 44)",
    url: "https://socialblade.com",
    startYear: 2025,
    icon: (
      <SiSocialblade className="text-socialblade-brand" size={"auto"} />
    ) as JSX.Element,
  },
];
