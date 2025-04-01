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
    // @ts-ignore
    element.current.scrollLeft = element.current.scrollLeftMax;
  }, [weeklyData]);

  const getColorClass = (count: number) => {
    if (maxCommits === 0) return "bg-gray-600/40 dark:bg-gray-600/40";
    const ratio = count / maxCommits;
    if (ratio > 0.75) return "bg-green-900 dark:bg-green-900";
    else if (ratio > 0.5) return "bg-green-800 dark:bg-green-800";
    else if (ratio > 0.25) return "bg-green-700 dark:bg-green-700";
    else if (ratio > 0) return "bg-green-600 dark:bg-green-600";
    else return "bg-gray-600/40 dark:bg-gray-600/40";
  };

  return (
    <div className="p-4 flex flex-row group overflow-x-scroll" ref={element}>
      {weeklyData.map((week, weekIndex) => (
        <div className="flex flex-col group" key={weekIndex}>
          {week.map((date: ContributionDate, dayIndex: number) => (
            <Tippy
              content={
                <span>
                  <p className="text-sm">{date.count} contributions</p>
                  <p className="text-sm opacity-50">
                    {new Date(date.date).toLocaleDateString()}
                  </p>
                </span>
              }
            >
              <div
                key={dayIndex}
                className={`w-2.5 h-2.5 m-0.5 p-3 rounded-md opacity-60 group-hover:opacity-100 transition-all ${getColorClass(date.count)}`}
              />
            </Tippy>
          ))}
        </div>
      ))}
    </div>
  );
}
