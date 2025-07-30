import { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  required?: boolean;
  full?: boolean;
}

export function Input({
  name,
  value,
  placeholder,
  type,
  onChange,
  onKeyDown,
  className,
  required,
  full,
}: Props) {
  return (
    <div className={name ? twMerge("flex flex-col", className) : ""}>
      {name && (
        <div className="flex flex-row justify-between">
          <p className="font-bold text-lg">{name}</p>{" "}
          {required && <p className="text-sm">*</p>}
        </div>
      )}
      {full ? (
        <textarea
          className={twMerge(
            "border dark:border-gray-500 border-gray-300 dark:bg-neutral-600 bg-neutral-100 rounded-md p-2 w-full",
            className,
          )}
          placeholder={
            placeholder ? `${placeholder} ${required ? "*" : ""}` : ""
          }
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      ) : (
        <input
          className={twMerge(
            "border dark:border-gray-500 border-gray-300 dark:bg-neutral-600 bg-neutral-100 rounded-md p-2 w-full",
            className,
          )}
          type={type}
          placeholder={
            placeholder ? `${placeholder} ${required ? "*" : ""}` : ""
          }
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}
    </div>
  );
}
