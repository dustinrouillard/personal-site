import { useState, useCallback, useEffect } from "react";

import { LanyardActivity, LanyardPresence } from "../../types/lanyard";
import {
  NEOVIM_APPLICATION_ID,
  VSCODE_APPLICATION_ID,
  ZED_APPLICATION_ID,
} from "../../consts";
import { lanyard } from "../../utils/lanyard";
import { msToTime } from "../../utils/time";

interface Props {
  className: string;
}

export function DiscordActivity({ className }: Props) {
  const [editorState, setEditorState] = useState<LanyardActivity>();
  const [timestamp, setTimestamp] = useState<number>(
    new Date().getTime() - editorState?.timestamps.start,
  );

  useEffect(() => {
    if (!editorState) return () => {};

    const int = setInterval(() => {
      setTimestamp(new Date().getTime() - editorState.timestamps.start);
    }, 1000);

    return () => {
      clearInterval(int);
    };
  }, [editorState]);

  const presenceChange = useCallback((data: LanyardPresence) => {
    const zed = data.activities
      .sort((a, b) => a?.timestamps?.start - b?.timestamps?.start)
      .find((activity) => activity.application_id == ZED_APPLICATION_ID);
    const neovim = data.activities
      .sort((a, b) => a?.timestamps?.start - b?.timestamps?.start)
      .find((activity) => activity.application_id == NEOVIM_APPLICATION_ID);
    const vscode = data.activities
      .sort((a, b) => a?.timestamps?.start - b?.timestamps?.start)
      .find((activity) => activity.application_id == VSCODE_APPLICATION_ID);

    if (neovim) setEditorState(neovim);
    else if (zed) setEditorState(zed);
    else if (vscode) setEditorState(vscode);
    else setEditorState(null);
  }, []);

  useEffect(() => {
    lanyard.on("presence", presenceChange);

    // We don't have an event listener when we first get the presence data so request it again from local cache
    lanyard.requestPresenceUpdate();

    return () => {
      lanyard.removeListener("presence", presenceChange);
    };
  }, [presenceChange]);

  return editorState ? (
    <div className={className}>
      <div className="flex flex-row items-center h-40 text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md py-6 px-4 min-w-[24rem] cursor-pointer transition-all relative">
        <div className="flex flex-row items-center w-full justify-between relative">
          <div className="flex flex-row items-center space-x-3">
            <img
              className="rounded-lg w-20 h-20"
              src={
                editorState.assets.large_image.startsWith("mp:external")
                  ? editorState.assets.large_image.replace(
                      /mp:external\/([^\/]*)\/(http[s])/g,
                      "$2:/",
                    )
                  : `https://cdn.discordapp.com/app-assets/${editorState.application_id}/${editorState.assets.large_image}.webp`
              }
            />
            <div className="flex flex-col overflow-hidden pr-2">
              <h3 className="text-lg font-bold truncate">{editorState.name}</h3>
              <h3 className="text-sm truncate">{editorState.details}</h3>
              <h3 className="text-sm truncate">{editorState.state}</h3>
              {timestamp ? (
                <h3 className="text-sm truncate">{msToTime(timestamp)}</h3>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
