"use client";

import { Columns3, SquarePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";
import { ColorSwatchGrid } from "./color-swatch-grid";
import type { ColorTheme } from "./types";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onCreateThemeClick: () => void;
  theme: ColorTheme | null;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  className?: string;
};

export function ColorPickerMenu({
  colors,
  selectedColorId,
  onSelectColor,
  onCreateThemeClick,
  theme,
  showAllColumns = false,
  onSelectAllColumns,
  allColumnsActive = false,
  className,
}: ColorPickerMenuProps) {
  const defaultColor = colors.find((c) => c.id === "default");

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

      {theme ? (
        <>
          <p className="px-2 py-1 text-xs font-medium leading-relaxed text-gray-500">Default</p>
          <ColorSwatchGrid
            colors={colors}
            selectedColorId={selectedColorId}
            onSelectColor={onSelectColor}
          />
          <Separator className="my-1 bg-gray-200" />
          <p className="px-2 py-1 text-xs font-medium leading-relaxed text-gray-500">
            {theme.name}
          </p>
          {theme.entries.map((entry) => {
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
          {defaultColor && (
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
                selectedColorId === "default" && "bg-gray-100"
              )}
              onClick={() => onSelectColor("default")}
            >
              <span className="size-4 shrink-0 rounded-sm border border-black/5 bg-white" />
              <span className="truncate">None</span>
            </button>
          )}
        </>
      ) : (
        <>
          <ColorSwatchGrid
            colors={colors}
            selectedColorId={selectedColorId}
            onSelectColor={onSelectColor}
          />
          <Separator className="my-1 bg-gray-200" />
          <button
            type="button"
            className="flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
            onClick={onCreateThemeClick}
          >
            <SquarePlus className="size-4 text-gray-700" />
            Create new theme
          </button>
        </>
      )}
    </div>
  );
}
