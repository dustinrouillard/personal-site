import { useAnalytics } from "../../hooks/useAnalytics";

interface Props {
  className: string;
}

export function CommandsToday({ className }: Props) {
  const analytics = useAnalytics();

  return analytics ? (
    <div className={className}>
      <div className="relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 flex flex-col space-y-6 justify-center items-center">
        <span />
        <p className="text-3xl font-bold mb-8 mx-20">
          {analytics.commands.day.toLocaleString() ?? "--"}
        </p>
        <p className="text-nowrap text-center">Commands last 24h</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
