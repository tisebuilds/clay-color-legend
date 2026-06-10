"use client";

import { useState } from "react";
import { Paintbrush } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnHeaderColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { NewThemeDialog } from "./new-theme-dialog";
import { useVariant3Theme } from "./theme-context";

export function Variant3ColumnHeaderColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
}: ColumnHeaderColorPickerProps) {
  const { theme, setTheme } = useVariant3Theme();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Paintbrush className="size-4 text-gray-700" />
          Change color
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-44 p-0" sideOffset={4}>
          <ColorPickerMenu
            colors={colors}
            selectedColorId={selectedColorId}
            onSelectColor={onSelectColor}
            onCreateThemeClick={() => setDialogOpen(true)}
            theme={theme}
          />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <NewThemeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        colors={colors}
        onCreateTheme={setTheme}
      />
    </>
  );
}
