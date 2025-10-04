import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  error?: string;
}

export function Input({ id, error, ...props }: InputProps) {
  return (
    <div className="group flex flex-col gap-2 text-gray-500 w-full">
      <label
        data-error={!!error}
        htmlFor={id}
        className="uppercase text-xs leading-3.5 font-medium data-[error=true]:not-group-focus-within:text-feedback-danger group-focus-within:text-blue-base"
      >
        título
      </label>
      <input
        id={id}
        name={id}
        data-error={!!error}
        className="border border-gray-300 rounded-lg px-4 py-3.5 text-md placeholder:text-gray-400 text-gray-600 data-[error=true]:not-group-focus-within:border-feedback-danger group-focus-within:border-blue-base outline-none"
        {...props}
      />
      {error && (
        <div className="flex items-center gap-1">
          <WarningIcon size={12} className="text-feedback-danger mr-1" />
          <span className="text-sm leading-4">{error}</span>
        </div>
      )}
    </div>
  );
}
