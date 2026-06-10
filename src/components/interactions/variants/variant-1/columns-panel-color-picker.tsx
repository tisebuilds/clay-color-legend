"use client";

import { ColorListPanel } from "@/components/color-list-panel";
import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";

export function Variant1ColumnsPanelColorPicker({
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
      <ColorListPanel
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onSelectAllColumns={onSelectAllColumns}
        onRenameColor={onRenameColor}
        allColumnsActive={allColumnsActive}
      />
    </div>
  );
}
