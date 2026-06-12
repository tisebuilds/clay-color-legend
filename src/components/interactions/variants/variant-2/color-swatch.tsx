import { cn } from "@/lib/utils";
import { NONE_SWATCH_BORDER, type ColumnColor } from "@/lib/colors";

type ColorSwatchProps = {
  color: ColumnColor;
  className?: string;
};

export function ColorSwatch({ color, className }: ColorSwatchProps) {
  if (color.id === "default") {
    return (
      <span
        className={cn(
          "size-4 shrink-0 rounded-full border bg-white",
          className
        )}
        style={{ borderColor: NONE_SWATCH_BORDER }}
      />
    );
  }

  return (
    <span className={cn("size-4 shrink-0 rounded-full", color.swatch, className)} />
  );
}
