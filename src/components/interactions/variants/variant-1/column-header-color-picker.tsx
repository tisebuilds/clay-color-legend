"use client";

import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { ColorPickerSubmenu } from "@/components/color-picker-submenu";
import type { ColumnHeaderColorPickerProps } from "@/components/interactions/types";

export function Variant1ColumnHeaderColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
}: ColumnHeaderColorPickerProps) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span className="size-4 rounded-sm border border-black/5 bg-gradient-to-br from-red-200 via-yellow-200 to-blue-200" />
        Change color
      </DropdownMenuSubTrigger>
      <ColorPickerSubmenu
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onRenameColor={onRenameColor}
      />
    </DropdownMenuSub>
  );
}
