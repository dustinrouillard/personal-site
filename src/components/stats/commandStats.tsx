import { useAnalytics } from "../../hooks/useAnalytics";
import { Tippy } from "../tippy";

interface Props {
  className: string;
}

export function CommandStats({ className }: Props) {
  const analytics = useAnalytics();

  return analytics &&
    (analytics.commands.day > 0 || analytics.commands.week > 0) ? (
    <div className={className}>
      <div className="relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 flex flex-col space-y-6 justify-center items-center">
        <span />
        <div className="flex flex-col mb-8 items-center justify-center mx-20">
          <Tippy
            placement="auto"
            content="# of shell commands ran in the last 24h"
          >
            <p className="text-2xl font-bold">
              {analytics.commands.day.toLocaleString() ?? "--"}
              <span className="opacity-40">/24h</span>
            </p>
          </Tippy>
          <Tippy
            placement="auto"
            content="# of shell commands ran in the last 7 days"
          >
            <p className="text-2xl font-bold">
              {analytics.commands.week.toLocaleString() ?? "--"}
              <span className="opacity-40">/7d</span>
            </p>
          </Tippy>
        </div>
        <p className="text-nowrap text-center">CLI Commands</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
