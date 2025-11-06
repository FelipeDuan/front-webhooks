import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const skeleton = tv({
  base: "bg-zinc-300/70 dark:bg-zinc-700/60",
  variants: {
    animate: {
      true: "animate-pulse",
      false: "",
    },
    rounded: {
      none: "rounded-none",
      sm: "rounded",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
    size: {
      xs: "h-3 w-16",
      sm: "h-4 w-24",
      md: "h-5 w-32",
      lg: "h-6 w-40",
      xl: "h-8 w-56",
    },
    tone: {
      muted: "bg-zinc-200/70 dark:bg-zinc-800/60",
      default: "",
      solid: "bg-zinc-300 dark:bg-zinc-600",
    },
  },
  defaultVariants: {
    animate: true,
    rounded: "md",
    tone: "default",
  },
  compoundVariants: [
    {
      animate: true,
      class: "",
    },
  ],
});

export interface SkeletonProps
  extends Omit<ComponentProps<"div">, "children">,
    VariantProps<typeof skeleton> {}

export function Skeleton({
  animate,
  rounded,
  size,
  tone,
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={skeleton({ animate, rounded, size, tone, className })}
    />
  );
}

export interface TextSkeletonProps
  extends Omit<ComponentProps<"div">, "children"> {
  lines?: number;
  lineClassName?: string;
  animate?: boolean;
  gap?: string;
}

export function TextSkeleton({
  lines = 3,
  animate = true,
  gap = "gap-2",
  lineClassName,
  className,
  ...props
}: TextSkeletonProps) {
  return (
    <div
      className={["flex flex-col", gap, className].filter(Boolean).join(" ")}
      {...props}
    >
      {Array.from({ length: lines }).map((item, idx) => (
        <Skeleton
          key={`${item}`}
          animate={animate}
          rounded="md"
          className={[
            "h-4",
            idx === lines - 1 ? "w-2/3" : "w-full",
            lineClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </div>
  );
}
