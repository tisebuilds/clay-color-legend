"use client";

import { Check, Columns3, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";
import { ColorSwatch } from "./color-swatch";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameClick: () => void;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
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
  className,
}: ColorPickerMenuProps) {
  return (
    <div
      className={cn(
        "w-44 rounded-xl border border-[#CCCCCC] bg-white py-1 shadow-sm",
        className
      )}
    >
      {showAllColumns && (
        <button
          type="button"
          className={cn(
            "flex w-full items-center gap-2 px-2 py-1.5 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
            allColumnsActive && "bg-gray-100"
          )}
          onClick={onSelectAllColumns}
        >
          <Columns3 className="size-4 text-gray-700" />
          All columns
        </button>
      )}
      {colors.map((color) => {
        const isSelected = color.id === selectedColorId;

        return (
          <button
            key={color.id}
            type="button"
            className="flex w-full items-center gap-2 px-2 py-1.5 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
            onClick={() => onSelectColor(color.id)}
          >
            <ColorSwatch color={color} />
            <span className="min-w-0 flex-1 truncate text-left">{color.label}</span>
            {isSelected && <Check className="size-4 shrink-0 text-gray-900" />}
          </button>
        );
      })}
      <Separator className="my-1 bg-gray-200" />
      <button
        type="button"
        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
        onClick={onRenameClick}
      >
        <Pencil className="size-4 text-gray-700" />
        Rename colors
      </button>
    </div>
  );
}
