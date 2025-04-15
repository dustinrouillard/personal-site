import { Work as TWork } from "../types/core";

export function Work({ work }: { work: TWork }) {
  return (
    <a href={work.url} target="_blank">
      <div
        style={{ borderBottomColor: work.color }}
        className={`flex flex-row h-40 justify-between rounded-lg m-1 bg-neutral-200 dark:bg-black/60 p-4 md:p-6 min-w-80 border-b-8 space-x-6 cursor-pointer hover:brightness-75 transition-all`}
      >
        <div className="flex flex-col w-full justify-between">
          <div className="flex flex-col space-y-2 w-full">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold line-clamp-1">{work.name}</h3>
              <p className="opacity-70">{work.title}</p>
            </div>
            <p className="text-wrap line-clamp-2">{work.description}</p>
          </div>

          {work.startYear ? (
            <span className="flex items-center space-x-2 text-sm opacity-50">
              {work.startYear} - {work.endYear || "Present"}
            </span>
          ) : (
            <></>
          )}
        </div>

        {work.icon ? (
          <div className="flex justify-end">{work.icon}</div>
        ) : (
          <></>
        )}
      </div>
    </a>
  );
}
