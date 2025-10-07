import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "px-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-1.5",

  variants: {
    variant: {
      primary:
        "bg-blue-base text-white hover:enabled:bg-blue-dark rounded-lg py-4 w-full text-md",
      secondary:
        "bg-gray-200 text-gray-500 hover:enabled:border-blue-base hover:enabled:border rounded-sm py-1.5 px-2 text-xs",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

export function Button({
  variant,
  className,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  );
}
