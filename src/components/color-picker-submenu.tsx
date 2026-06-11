"use client";

import { DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
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
      <ColorListPanel
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onRenameColor={onRenameColor}
      />
    </DropdownMenuSubContent>
  );
}
