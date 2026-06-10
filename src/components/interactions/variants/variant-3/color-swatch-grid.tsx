"use client";

import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";

type ColorSwatchGridProps = {
  colors: ColumnColor[];
  selectedColorId?: ColorId;
  onSelectColor: (id: ColorId) => void;
  className?: string;
};

export function ColorSwatchGrid({
  colors,
  selectedColorId,
  onSelectColor,
  className,
}: ColorSwatchGridProps) {
  return (
    <div className={cn("grid grid-cols-6 gap-1 px-2 py-1.5", className)}>
      {colors.map((color) => (
        <button
          key={color.id}
          type="button"
          className={cn(
            "size-6 rounded-md border border-black/5 transition-shadow",
            color.swatch,
            color.id === "default" && "bg-white",
            color.id === selectedColorId && "ring-2 ring-blue-500 ring-offset-1"
          )}
          onClick={() => onSelectColor(color.id)}
          aria-label={color.label}
        />
      ))}
    </div>
  );
}
