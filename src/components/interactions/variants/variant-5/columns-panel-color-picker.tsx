"use client";

import { useState } from "react";
import type { ColumnsPanelColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { ThemeEntryDialog } from "./theme-entry-dialog";
import { useVariant5Theme } from "./theme-context";
import { DEFAULT_THEME_COLOR_IDS, THEME_COLOR_IDS, type CustomTheme } from "./types";

export function Variant5ColumnsPanelColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  showAllColumns,
  onSelectAllColumns,
  allColumnsActive,
}: ColumnsPanelColorPickerProps) {
  const {
    defaultThemeEntries,
    setDefaultThemeEntries,
    customTheme,
    setCustomTheme,
  } = useVariant5Theme();

  const [newThemeOpen, setNewThemeOpen] = useState(false);
  const [editDefaultOpen, setEditDefaultOpen] = useState(false);
  const [editCustomOpen, setEditCustomOpen] = useState(false);

  const themeColors = colors.filter((c) => THEME_COLOR_IDS.includes(c.id));
  const defaultThemeColors = colors.filter((c) => DEFAULT_THEME_COLOR_IDS.includes(c.id));

  function handleCreateTheme(entries: CustomTheme["entries"]) {
    setCustomTheme({ name: "Theme name", entries });
  }

  function handleEditCustomTheme(entries: CustomTheme["entries"]) {
    if (!customTheme) return;
    setCustomTheme({ ...customTheme, entries });
  }

  return (
    <div className="border-l border-gray-200">
      <ColorPickerMenu
        showAllColumns={showAllColumns}
        colors={colors}
        selectedColorId={selectedColorId}
        onSelectColor={onSelectColor}
        onSelectAllColumns={onSelectAllColumns}
        allColumnsActive={allColumnsActive}
        onEditDefaultThemeClick={() => setEditDefaultOpen(true)}
        onEditCustomThemeClick={() => setEditCustomOpen(true)}
        onNewThemeClick={() => setNewThemeOpen(true)}
        customTheme={customTheme}
      />

      <ThemeEntryDialog
        open={newThemeOpen}
        onOpenChange={setNewThemeOpen}
        title="New theme"
        description="Only available to colors in this workbook"
        colors={themeColors}
        saveLabel="Create theme"
        onSave={handleCreateTheme}
        requireAtLeastOne
      />

      <ThemeEntryDialog
        open={editDefaultOpen}
        onOpenChange={setEditDefaultOpen}
        title="Default theme"
        description="Changes only applies to colors in this workbook"
        colors={defaultThemeColors}
        existingEntries={defaultThemeEntries}
        saveLabel="Save changes"
        onSave={setDefaultThemeEntries}
      />

      {customTheme && (
        <ThemeEntryDialog
          open={editCustomOpen}
          onOpenChange={setEditCustomOpen}
          title={customTheme.name}
          description="Only available to colors in this workbook"
          colors={themeColors}
          existingEntries={customTheme.entries}
          saveLabel="Save changes"
          onSave={handleEditCustomTheme}
        />
      )}
    </div>
  );
}
