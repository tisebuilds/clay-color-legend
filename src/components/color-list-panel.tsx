"use client";

import { useRef, useState } from "react";
import { Check, Columns3, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";

type ColorListPanelProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameColor: (id: ColorId, label: string) => void;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  className?: string;
};

export function ColorListPanel({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
  showAllColumns = false,
  onSelectAllColumns,
  allColumnsActive = false,
  className,
}: ColorListPanelProps) {
  const [editingId, setEditingId] = useState<ColorId | null>(null);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function startEditing(color: ColumnColor) {
    setEditingId(color.id);
    setDraft(color.label);
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
            className={cn(
              "group flex items-center gap-2 rounded-md px-2 py-1 text-sm leading-relaxed",
              !isEditing && "cursor-pointer hover:bg-gray-100"
            )}
            onClick={() => {
              if (!isEditing) onSelectColor(color.id);
            }}
          >
            <span
              className={cn(
                "size-4 shrink-0 rounded-sm border border-black/5",
                color.swatch,
                color.id === "default" && "bg-white"
              )}
            />
            {isEditing ? (
              <Input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="h-6 flex-1 px-2 py-1 text-sm leading-relaxed"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  e.stopPropagation();
                  if (e.key === "Enter") commitRename(color.id);
                  if (e.key === "Escape") setEditingId(null);
                }}
                onBlur={() => commitRename(color.id)}
              />
            ) : (
              <>
                <span className="flex-1 truncate text-gray-900">{color.label}</span>
                <button
                  type="button"
                  className="rounded p-0.5 opacity-0 transition-opacity hover:bg-gray-200 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(color);
                  }}
                  aria-label={`Rename ${color.label}`}
                >
                  <Pencil className="size-3.5 text-gray-700" />
                </button>
                {isSelected && <Check className="size-4 shrink-0 text-gray-700" />}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
