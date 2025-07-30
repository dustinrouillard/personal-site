import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
}

export function Input({
  value,
  placeholder,
  type,
  onChange,
  onKeyDown,
  className,
}: Props) {
  return (
    <input
      className={twMerge(
        "border border-gray-300 rounded-md p-2 w-full",
        className,
      )}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}
