"use client";

import { Columns3, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameClick: () => void;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  defaultColorLabel?: string;
  className?: string;
};

export function ColorPickerMenu({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameClick,
  showAllColumns = false,
  onSelectAllColumns,
  allColumnsActive = false,
  defaultColorLabel,
  className,
}: ColorPickerMenuProps) {
  return (
    <div className={cn("w-44 py-1", className)}>
      {showAllColumns && (
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
            allColumnsActive && "bg-gray-100"
          )}
          onClick={onSelectAllColumns}
        >
          <Columns3 className="size-4 text-gray-700" />
          All columns
        </button>
      )}
      {colors.map((color) => (
        <button
          key={color.id}
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
            color.id === selectedColorId && "bg-gray-100"
          )}
          onClick={() => onSelectColor(color.id)}
        >
          <span
            className={cn(
              "size-4 shrink-0 rounded-sm border border-black/5",
              color.swatch,
              color.id === "default" && "bg-white"
            )}
          />
          <span className="truncate">
            {color.id === "default" && defaultColorLabel ? defaultColorLabel : color.label}
          </span>
        </button>
      ))}
      <Separator className="my-1 bg-gray-200" />
      <button
        type="button"
        className="flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
        onClick={onRenameClick}
      >
        <Pencil className="size-4 text-gray-700" />
        Rename colors
      </button>
    </div>
  );
}
