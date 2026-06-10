"use client";

import { Columns3, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";
import { ColorSwatchGrid } from "../variant-3/color-swatch-grid";
import type { ColorLabelEntry } from "./types";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onAddLabelClick: () => void;
  labelEntries: ColorLabelEntry[];
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  className?: string;
};

export function ColorPickerMenu({
  colors,
  selectedColorId,
  onSelectColor,
  onAddLabelClick,
  labelEntries,
  showAllColumns = false,
  onSelectAllColumns,
  allColumnsActive = false,
  className,
}: ColorPickerMenuProps) {
  const labeledColorIds = new Set(labelEntries.map((e) => e.colorId));
  const gridColors = colors.filter((c) => !labeledColorIds.has(c.id));
  const hasLabels = labelEntries.length > 0;

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

      <ColorSwatchGrid
        colors={gridColors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
      />

      {hasLabels ? (
        <>
          <Separator className="my-1 bg-gray-200" />
          {labelEntries.map((entry) => {
            const color = colors.find((c) => c.id === entry.colorId);
            if (!color) return null;

            return (
              <button
                key={entry.colorId}
                type="button"
                className={cn(
                  "flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
                  entry.colorId === selectedColorId && "bg-gray-100"
                )}
                onClick={() => onSelectColor(entry.colorId)}
              >
                <span
                  className={cn(
                    "size-4 shrink-0 rounded-sm border border-black/5",
                    color.swatch
                  )}
                />
                <span className="truncate">{entry.label}</span>
              </button>
            );
          })}
        </>
      ) : (
        <button
          type="button"
          className="flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
          onClick={onAddLabelClick}
        >
          <Plus className="size-4 text-gray-700" />
          Add label
        </button>
      )}
    </div>
  );
}
