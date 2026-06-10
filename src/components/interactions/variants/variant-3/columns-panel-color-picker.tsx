"use client";

import { useState } from "react";
import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { NewThemeDialog } from "./new-theme-dialog";
import { useVariant3Theme } from "./theme-context";

export function Variant3ColumnsPanelColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  showAllColumns,
  onSelectAllColumns,
  allColumnsActive,
}: ColumnsPanelColorPickerProps) {
  const { theme, setTheme } = useVariant3Theme();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="border-l border-gray-200">
      <ColorPickerMenu
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onSelectAllColumns={onSelectAllColumns}
        allColumnsActive={allColumnsActive}
        onCreateThemeClick={() => setDialogOpen(true)}
        theme={theme}
      />
      <NewThemeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        colors={colors}
        onCreateTheme={setTheme}
      />
    </div>
  );
}
