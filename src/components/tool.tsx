import { HighlightedTool } from "../types/core";

export function Tool({ tool }: { tool: HighlightedTool }) {
  return (
    <a href={tool.url} target="_blank">
      <div
        style={{ borderBottomColor: tool.color }}
        className={`flex flex-row h-40 justify-between rounded-lg m-1 bg-neutral-200 dark:bg-black/60 p-6 min-w-80 border-b-8 space-x-6 cursor-pointer hover:brightness-75 transition-all`}
      >
        <div className="flex flex-col space-y-2 w-full">
          <h3 className="text-lg font-bold line-clamp-1">{tool.name}</h3>
          <p className="text-wrap line-clamp-2">{tool.description}</p>
        </div>

        {tool.icon ? (
          <div className="flex justify-center">{tool.icon}</div>
        ) : (
          <></>
        )}
      </div>
    </a>
  );
}
