import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { ContributionDate } from "../types/core";
import { Tippy } from "./tippy";

interface GitActivity {
  graph: ContributionDate[][];
}

export function GitActivity({ graph }: GitActivity) {
  const [weeklyData, setWeeklyData] = useState<ContributionDate[][]>([]);
  const [maxCommits, setMaxCommits] = useState(0);

  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (graph) {
      let max = 0;

      graph.forEach((items) => {
        items.forEach((date) => {
          if (date.count > max) {
            max = date.count;
          }
        });
      });

      setWeeklyData(graph);
      setMaxCommits(max);
    }
  }, [graph]);

  useEffect(() => {
    if (element.current)
      element.current.scrollLeft = element.current.scrollWidth;
  }, [weeklyData]);

  const getColorClass = (count: number) => {
    if (maxCommits === 0)
      return "bg-github-act-none dark:bg-github-act-none-dark";
    const ratio = count / maxCommits;
    if (ratio > 0.75) return "bg-github-act-most dark:bg-github-act-most-dark";
    else if (ratio > 0.5)
      return "bg-github-act-lot dark:bg-github-act-lot-dark";
    else if (ratio > 0.25)
      return "bg-github-act-medium dark:bg-github-act-medium-dark";
    else if (ratio > 0)
      return "bg-github-act-some dark:bg-github-act-some-dark";
    else return "bg-github-act-none dark:bg-github-act-none-dark";
  };

  return (
    <div className="px-4 py-2 flex flex-row overflow-x-scroll" ref={element}>
      {weeklyData.map((week, weekIndex) => (
        <div className="flex flex-col group" key={weekIndex}>
          {week.map((date: ContributionDate, dayIndex: number) => (
            <Tippy
              content={
                <span>
                  <p className="text-sm">{date.count} contributions</p>
                  <p className="text-sm opacity-50">
                    {date.date.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$2/$3/$1")}
                  </p>
                </span>
              }
            >
              <div
                key={dayIndex}
                className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all border-[0.5px] border-black/15 dark:border-white/10 ${getColorClass(date.count)}`}
              />
            </Tippy>
          ))}
        </div>
      ))}
    </div>
  );
}
