"use client";

import { useRef, useState } from "react";
import { Check, Columns3 } from "lucide-react";
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
  const [editingId, setEditingId] = useState<ColorId | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function startEditing(color: ColumnColor) {
    setEditingId(color.id);
    setDraft(getColorLabel(color));
    requestAnimationFrame(() => inputRef.current?.select());
  }

  function commitRename(id: ColorId) {
    const trimmed = draft.trim();
    if (trimmed) onRenameColor(id, trimmed);
    setEditingId(null);
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
      {colors.map((color) => {
        const isSelected = color.id === selectedColorId;
        const isEditing = editingId === color.id;

        return (
          <div
            key={color.id}
            role="button"
            tabIndex={0}
            className={cn(
              "flex w-full cursor-pointer items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
              isSelected && !isEditing && "bg-gray-50"
            )}
            onClick={() => {
              if (!isEditing) onSelectColor(color.id);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isEditing) onSelectColor(color.id);
            }}
          >
            <ColorSwatch color={color} />
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-w-0 flex-1 rounded border border-blue-400 bg-white px-1 py-0 text-sm leading-relaxed text-gray-900 outline-none focus:ring-1 focus:ring-blue-400"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") commitRename(color.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                onBlur={() => commitRename(color.id)}
                aria-label={`Rename ${getColorLabel(color)}`}
              />
            ) : (
              <span
                className={cn(
                  "min-w-0 flex-1 truncate",
                  isSelected &&
                    "cursor-text rounded border border-dashed border-blue-400/70 px-1"
                )}
                onClick={(e) => {
                  if (isSelected) {
                    e.stopPropagation();
                    startEditing(color);
                  }
                }}
              >
                {getColorLabel(color)}
              </span>
            )}
            {isSelected && !isEditing && (
              <Check className="size-4 shrink-0 text-blue-600" />
            )}
          </div>
        );
      })}
    </div>
  );
}
