"use client";

import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";

export function Variant8ColumnsPanelColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
  showAllColumns,
  onSelectAllColumns,
  allColumnsActive,
}: ColumnsPanelColorPickerProps) {
  return (
    <div className="border-l border-gray-200">
      <ColorPickerMenu
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onRenameColor={onRenameColor}
        onSelectAllColumns={onSelectAllColumns}
        allColumnsActive={allColumnsActive}
      />
    </div>
  );
}
