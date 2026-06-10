"use client";

import { useState } from "react";
import { Paintbrush } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColorId, ColumnColor } from "@/lib/colors";
import type { ColumnHeaderColorPickerProps } from "@/components/interactions/types";
import { ColorPickerMenu } from "./color-picker-menu";
import { RenameColorDialog } from "./rename-color-dialog";

export function Variant7ColumnHeaderColorPicker({
  colors,
  selectedColorId,
  onSelectColor,
  onRenameColor,
}: ColumnHeaderColorPickerProps) {
  const [renamingColorId, setRenamingColorId] = useState<ColorId | null>(null);
  const renamingColor: ColumnColor | null =
    renamingColorId !== null
      ? (colors.find((c) => c.id === renamingColorId) ?? null)
      : null;

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
            onRenameClick={setRenamingColorId}
            embeddedInDropdown
          />
        </DropdownMenuSubContent>
      </DropdownMenuSub>
      <RenameColorDialog
        open={renamingColorId !== null}
        onOpenChange={(open) => {
          if (!open) setRenamingColorId(null);
        }}
        color={renamingColor}
        onRenameColor={onRenameColor}
      />
    </>
  );
}
