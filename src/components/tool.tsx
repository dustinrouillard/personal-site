import { HighlightedTool } from "../types/core";
import { Tippy } from "./tippy";

export function Tool({ tool }: { tool: HighlightedTool }) {
  return (
    <Tippy disabled={!tool.soon} content="Coming Soon">
      <a href={!tool.soon ? tool.url : undefined} target="_blank">
        <div
          style={{ borderBottomColor: tool.color }}
          className={`flex flex-row h-40 justify-between rounded-lg m-1 bg-neutral-200 dark:bg-black/60 p-4 md:p-6 min-w-80 border-b-8 space-x-6 ${tool.soon ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:brightness-75"} transition-all`}
        >
          <div className="flex flex-col space-y-2 w-full">
            <h3 className="text-lg font-bold line-clamp-1">{tool.name}</h3>
            <p className="text-wrap line-clamp-2">{tool.description}</p>
          </div>

          {tool.icon ? (
            <div className="flex justify-end">{tool.icon}</div>
          ) : (
            <></>
          )}
        </div>
      </a>
    </Tippy>
  );
}
