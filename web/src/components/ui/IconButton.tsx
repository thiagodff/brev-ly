import type { ComponentProps } from "react";

export function IconButton(props: ComponentProps<"button">) {
  return (
    <button
      className="p-2 bg-gray-200 text-gray-500 hover:enabled:border-blue-base hover:enabled:border rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed block"
      {...props}
    />
  );
}
