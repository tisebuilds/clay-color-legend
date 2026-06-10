"use client";

import { Columns3, Pencil, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";
import { ColorSwatchGrid } from "../variant-3/color-swatch-grid";
import type { CustomTheme } from "./types";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onEditDefaultThemeClick: () => void;
  onEditCustomThemeClick: () => void;
  onNewThemeClick: () => void;
  customTheme: CustomTheme | null;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  className?: string;
};

function SectionHeader({
  title,
  onEditClick,
}: {
  title: string;
  onEditClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-2 py-1">
      <span className="text-xs font-semibold leading-relaxed text-gray-900">{title}</span>
      <button
        type="button"
        className="rounded p-0.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        onClick={onEditClick}
        aria-label={`Edit ${title}`}
      >
        <Pencil className="size-3.5" />
      </button>
    </div>
  );
}

export function ColorPickerMenu({
  colors,
  selectedColorId,
  onSelectColor,
  onEditDefaultThemeClick,
  onEditCustomThemeClick,
  onNewThemeClick,
  customTheme,
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

      <SectionHeader title="Default theme" onEditClick={onEditDefaultThemeClick} />
      <ColorSwatchGrid
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
      />

      {customTheme && (
        <>
          <Separator className="my-1 bg-gray-200" />
          <SectionHeader title={customTheme.name} onEditClick={onEditCustomThemeClick} />
          {customTheme.entries.map((entry) => {
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
      )}

      <Separator className="my-1 bg-gray-200" />
      <button
        type="button"
        className="flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
        onClick={onNewThemeClick}
      >
        <Plus className="size-4 text-gray-700" />
        New theme
      </button>
    </div>
  );
}
