"use client";

import { useState } from "react";
import { ChevronRight, Columns3, Highlighter, Pencil } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { ColorId, ColumnColor } from "@/lib/colors";

const submenuActionClassName =
  "flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1 text-sm leading-relaxed outline-hidden select-none hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900";

type ColorPickerMenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameClick: (id: ColorId) => void;
  showAllColumns?: boolean;
  onSelectAllColumns?: () => void;
  allColumnsActive?: boolean;
  /** When true, nested submenus use DropdownMenu primitives (column header). */
  embeddedInDropdown?: boolean;
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

function ColorActionItems({
  colorId,
  onSelectColor,
  onRenameClick,
}: {
  colorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameClick: (id: ColorId) => void;
}) {
  return (
    <>
      <DropdownMenuItem onClick={() => onSelectColor(colorId)}>
        <Highlighter className="size-4 text-gray-700" />
        Apply
      </DropdownMenuItem>
      <button
        type="button"
        className={submenuActionClassName}
        onClick={() => onRenameClick(colorId)}
      >
        <Pencil className="size-4 text-gray-700" />
        Rename
      </button>
    </>
  );
}

function PanelColorActionItems({
  colorId,
  onSelectColor,
  onRenameClick,
}: {
  colorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameClick: (id: ColorId) => void;
}) {
  return (
    <div className="w-32 rounded-lg bg-gray-50 p-1 text-sm leading-relaxed text-gray-900 shadow-lg ring-1 ring-gray-200/80">
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
        onClick={() => onSelectColor(colorId)}
      >
        <Highlighter className="size-4 text-gray-700" />
        Apply
      </button>
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
        onClick={() => onRenameClick(colorId)}
      >
        <Pencil className="size-4 text-gray-700" />
        Rename
      </button>
    </div>
  );
}

export function ColorPickerMenu({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameClick,
  showAllColumns = false,
  onSelectAllColumns,
  allColumnsActive = false,
  embeddedInDropdown = false,
  className,
}: ColorPickerMenuProps) {
  const [activeColorId, setActiveColorId] = useState<ColorId | null>(null);
  const activeColor =
    colors.find((c) => c.id === (activeColorId ?? selectedColorId)) ?? colors[0];

  const colorList = (
    <>
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
      {colors.map((color) =>
        embeddedInDropdown ? (
          <DropdownMenuSub key={color.id}>
            <DropdownMenuSubTrigger
              className={cn(color.id === selectedColorId && "bg-gray-100")}
            >
              <ColorSwatch color={color} />
              <span className="truncate">{getColorLabel(color)}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={4}>
              <ColorActionItems
                colorId={color.id}
                onSelectColor={onSelectColor}
                onRenameClick={onRenameClick}
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ) : (
          <button
            key={color.id}
            type="button"
            className={cn(
              "flex w-full items-center gap-2 px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100",
              color.id === selectedColorId && "bg-gray-100",
              color.id === activeColorId && "bg-gray-100"
            )}
            onMouseEnter={() => setActiveColorId(color.id)}
          >
            <ColorSwatch color={color} />
            <span className="flex-1 truncate text-left">{getColorLabel(color)}</span>
            <ChevronRight className="size-4 shrink-0 text-gray-500" />
          </button>
        )
      )}
    </>
  );

  if (embeddedInDropdown) {
    return <div className={cn("w-44 py-1", className)}>{colorList}</div>;
  }

  return (
    <div className={cn("flex", className)}>
      <div className="w-44 py-1">{colorList}</div>
      <div className="border-l border-gray-200 py-1 pl-1">
        <PanelColorActionItems
          colorId={activeColor.id}
          onSelectColor={onSelectColor}
          onRenameClick={onRenameClick}
        />
      </div>
    </div>
  );
}
