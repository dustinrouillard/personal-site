import { ImStarFull } from "react-icons/im";
import { RiGitForkFill } from "react-icons/ri";

import { Repository } from "../types/core";

export function Repo({ repo }: { repo: Repository }) {
  return <a href={repo.url} target="_blank"><div style={{ borderBottomColor: repo.language?.color }} className={`flex flex-col justify-between rounded-lg m-1 bg-neutral-200 dark:bg-black/60 p-6 min-w-80 h-48 space-y-5 border-b-8 cursor-pointer hover:brightness-75 transition-all`}>
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-bold">{repo.name}</h3>
      <p className="text-wrap truncate line-clamp-2">{repo.description}</p>
    </div>
    <span className="flex justify-between">
      <span className="flex space-x-3 items-center"><span style={{ backgroundColor: repo.language?.color }} className={`w-5 h-5 rounded-full`} /><p className="text-wrap">{repo.language?.name}</p></span>
      <span className="flex flex-row space-x-4 items-center">
        {repo.forks > 0 ? <span className="flex items-center space-x-2 text-sm"><RiGitForkFill size={16} className="opacity-70" /> <p>{repo.forks.toLocaleString()}</p></span> : <></>}
        <span className="flex items-center space-x-2 text-sm"><ImStarFull size={16} className="opacity-70" /> <p>{repo.stars.toLocaleString()}</p></span>
      </span>
    </span>
  </div></a>
}