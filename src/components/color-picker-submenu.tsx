"use client";

import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { ColorListPanel } from "@/components/color-list-panel";
import type { ColorId, ColumnColor } from "@/lib/colors";

type ColorPickerSubmenuProps = {
  colors: ColumnColor[];
  selectedColorId: ColorId;
  onSelectColor: (id: ColorId) => void;
  onRenameColor: (id: ColorId, label: string) => void;
};

export function ColorPickerSubmenu({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
}: ColorPickerSubmenuProps) {
  return (
    <DropdownMenuSubContent className="w-52 p-0" sideOffset={4}>
      <DropdownMenuLabel className="px-2 py-1 text-sm font-normal leading-relaxed text-gray-700">
        Select column color
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="mx-0 bg-gray-200" />
      <ColorListPanel
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onRenameColor={onRenameColor}
      />
      <DropdownMenuSeparator className="mx-0 bg-gray-200" />
      <p className="px-2 py-1 text-sm leading-relaxed text-gray-700">
        Hover a color and click the pencil to rename labels for your whole table.
      </p>
    </DropdownMenuSubContent>
  );
}
