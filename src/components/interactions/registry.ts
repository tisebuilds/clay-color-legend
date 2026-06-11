import { Variant1ColumnHeaderColorPicker } from "./variants/variant-1/column-header-color-picker";
import { Variant1ColumnsPanelColorPicker } from "./variants/variant-1/columns-panel-color-picker";
import { Variant2ColumnHeaderColorPicker } from "./variants/variant-2/column-header-color-picker";
import { Variant2ColumnsPanelColorPicker } from "./variants/variant-2/columns-panel-color-picker";
import { Variant3ColumnHeaderColorPicker } from "./variants/variant-3/column-header-color-picker";
import { Variant3ColumnsPanelColorPicker } from "./variants/variant-3/columns-panel-color-picker";
import { Variant4ColumnHeaderColorPicker } from "./variants/variant-4/column-header-color-picker";
import { Variant4ColumnsPanelColorPicker } from "./variants/variant-4/columns-panel-color-picker";
import { Variant5ColumnHeaderColorPicker } from "./variants/variant-5/column-header-color-picker";
import { Variant5ColumnsPanelColorPicker } from "./variants/variant-5/columns-panel-color-picker";
import { Variant6ColumnHeaderColorPicker } from "./variants/variant-6/column-header-color-picker";
import { Variant6ColumnsPanelColorPicker } from "./variants/variant-6/columns-panel-color-picker";
import { Variant7ColumnHeaderColorPicker } from "./variants/variant-7/column-header-color-picker";
import { Variant7ColumnsPanelColorPicker } from "./variants/variant-7/columns-panel-color-picker";
import { Variant8ColumnHeaderColorPicker } from "./variants/variant-8/column-header-color-picker";
import { Variant8ColumnsPanelColorPicker } from "./variants/variant-8/columns-panel-color-picker";
import type { InteractionVariant, InteractionVariantId } from "./types";

export const INTERACTION_VARIANTS: InteractionVariant[] = [
  {
    id: "1",
    label: "Variant 1",
    name: "Hover pencil",
    description: "Column submenu + columns panel flyout",
    ColumnHeaderColorPicker: Variant1ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant1ColumnsPanelColorPicker,
  },
  {
    id: "2",
    label: "Variant 2",
    name: "Rename modal",
    favorite: true,
    description: "Color menu + rename colors dialog",
    ColumnHeaderColorPicker: Variant2ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant2ColumnsPanelColorPicker,
  },
  {
    id: "3",
    label: "Variant 3",
    name: "Create theme",
    description: "Swatch grid + new theme modal",
    ColumnHeaderColorPicker: Variant3ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant3ColumnsPanelColorPicker,
  },
  {
    id: "4",
    label: "Variant 4",
    name: "Add label",
    description: "Swatch grid + create label modal",
    ColumnHeaderColorPicker: Variant4ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant4ColumnsPanelColorPicker,
  },
  {
    id: "5",
    label: "Variant 5",
    name: "Edit theme",
    description: "Default theme grid + edit/new theme modals",
    ColumnHeaderColorPicker: Variant5ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant5ColumnsPanelColorPicker,
  },
  {
    id: "6",
    label: "Variant 6",
    name: "Inline rename",
    description: "Color menu with inline rename mode",
    ColumnHeaderColorPicker: Variant6ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant6ColumnsPanelColorPicker,
  },
  {
    id: "7",
    label: "Variant 7",
    name: "Per-color rename",
    description: "Color submenu with apply/rename actions",
    ColumnHeaderColorPicker: Variant7ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant7ColumnsPanelColorPicker,
  },
  {
    id: "8",
    label: "Variant 8",
    name: "Click-then-click",
    description: "Click to apply; click selected name again to rename",
    ColumnHeaderColorPicker: Variant8ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant8ColumnsPanelColorPicker,
  },
];

export const RECOMMENDED_VARIANT_IDS: InteractionVariantId[] = ["2", "1"];

export const DEFAULT_VARIANT_ID: InteractionVariantId = "2";

export function getInteractionVariant(id: InteractionVariantId): InteractionVariant {
  return INTERACTION_VARIANTS.find((v) => v.id === id) ?? INTERACTION_VARIANTS[0];
}
