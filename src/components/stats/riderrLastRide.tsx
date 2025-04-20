import { useRiderrStats } from "../../hooks/useRiderrStats";
import { shortMsFormat } from "../../utils/time";

interface Props {
  className: string;
}

export function RiderrLastRide({ className }: Props) {
  const riderr = useRiderrStats();

  return riderr ? (
    <div className={className}>
      <div className="relative text-black bg-neutral-200/50 dark:text-white dark:bg-neutral-800 rounded-md w-auto h-40 p-4 px-6 flex flex-col justify-center text-center">
        <div className="flex flex-col text-center mb-8">
          <p className="text-lg font-bold text-nowrap">
            {shortMsFormat(riderr.latest_ride.duration * 1000)} -{" "}
            {riderr.latest_ride.distance} mi
          </p>
          <p className="text-sm font-bold text-nowrap opacity-65">
            {new Date(riderr.latest_ride.started_at).toLocaleTimeString(
              undefined,
              { hour: "numeric", minute: "numeric" },
            )}{" "}
            -{" "}
            {new Date(riderr.latest_ride.ended_at).toLocaleTimeString(
              undefined,
              { hour: "numeric", minute: "numeric" },
            )}
          </p>
        </div>
        <p className="text-nowrap text-center text-sm">Last Board Ride</p>
      </div>
    </div>
  ) : (
    <></>
  );
}
