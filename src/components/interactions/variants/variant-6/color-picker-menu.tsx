"use client";

import { useState } from "react";
import { Columns3, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameColor: (id: ColorId, label: string) => void;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  className?: string;
};

function getColorLabel(color: ColumnColor) {
  return color.id === "default" ? "None" : color.label;
}

function ColorSwatch({ color }: { color: ColumnColor }) {
  return (
    <span
      className={cn(
        "size-4 shrink-0 rounded-sm border border-black/5",
        color.swatch,
        color.id === "default" && "bg-white"
      )}
    />
  );
}

export function ColorPickerMenu({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
  showAllColumns = false,
  onSelectAllColumns,
  allColumnsActive = false,
  className,
}: ColorPickerMenuProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [drafts, setDrafts] = useState<Record<ColorId, string>>({} as Record<ColorId, string>);

  function startEditing() {
    setDrafts(
      Object.fromEntries(colors.map((c) => [c.id, getColorLabel(c)])) as Record<ColorId, string>
    );
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  function handleSave() {
    for (const color of colors) {
      const trimmed = drafts[color.id]?.trim();
      if (trimmed && trimmed !== getColorLabel(color)) {
        onRenameColor(color.id, trimmed);
      }
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className={cn("w-52 px-2 py-2", className)}>
        <div className="flex flex-col gap-2">
          {colors.map((color) => (
            <div key={color.id} className="flex items-center gap-2">
              <ColorSwatch color={color} />
              <input
                type="text"
                value={drafts[color.id] ?? getColorLabel(color)}
                onChange={(e) =>
                  setDrafts((prev) => ({ ...prev, [color.id]: e.target.value }))
                }
                className="min-w-0 flex-1 border-0 border-b border-gray-900 bg-transparent py-0.5 text-sm leading-relaxed text-gray-900 outline-none focus:ring-0"
                aria-label={`Rename ${getColorLabel(color)}`}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Save changes
          </Button>
        </div>
      </div>
    );
  }

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
          <ColorSwatch color={color} />
          <span className="truncate">{getColorLabel(color)}</span>
        </button>
      ))}
      <Separator className="my-1 bg-gray-200" />
      <button
        type="button"
        className="flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
        onClick={startEditing}
      >
        <Pencil className="size-4 text-gray-700" />
        Rename colors
      </button>
    </div>
  );
}
