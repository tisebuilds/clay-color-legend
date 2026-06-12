import { cn } from "@/lib/utils";
import { NONE_SWATCH_BORDER, type ColumnColor } from "@/lib/colors";

export function ColorSwatch({ color }: { color: ColumnColor }) {
  if (color.id === "default") {
    return (
      <span
        className="size-4 shrink-0 rounded-full border bg-white"
        style={{ borderColor: NONE_SWATCH_BORDER }}
      />
    );
  }

  return (
    <span className={cn("size-4 shrink-0 rounded-full", color.swatch)} />
  );
}
