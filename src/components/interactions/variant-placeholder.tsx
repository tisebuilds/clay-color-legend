"use client";

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  ColumnHeaderColorPickerProps,
  ColumnsPanelColorPickerProps,
  InteractionVariantId,
} from "./types";

export function createPlaceholderVariant(
  id: InteractionVariantId,
  label: string
): {
  ColumnHeaderColorPicker: React.ComponentType<ColumnHeaderColorPickerProps>;
  ColumnsPanelColorPicker: React.ComponentType<ColumnsPanelColorPickerProps>;
} {
  function ColumnHeaderColorPicker(_props: ColumnHeaderColorPickerProps) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <span className="size-4 rounded-sm border border-black/5 bg-gradient-to-br from-red-200 via-yellow-200 to-blue-200" />
          Change color
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-52 p-3">
          <p className="text-sm leading-relaxed text-gray-500">
            {label} — interaction not defined yet
          </p>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  function ColumnsPanelColorPicker(_props: ColumnsPanelColorPickerProps) {
    return (
      <div className="flex w-44 items-center border-l border-gray-200 p-4">
        <p className="text-sm leading-relaxed text-gray-500">
          {label} — interaction not defined yet
        </p>
      </div>
    );
  }

  return { ColumnHeaderColorPicker, ColumnsPanelColorPicker };
}
