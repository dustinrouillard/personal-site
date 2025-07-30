import { twMerge } from "tailwind-merge";

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export function Button({ onClick, className, children }: Props) {
  return (
    <button
      className={twMerge(
        "border border-gray-300 rounded-md p-2 w-full bg-blue-400 text-white cursor-pointer hover:brightness-90",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
