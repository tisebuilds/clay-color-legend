import { createPlaceholderVariant } from "./variant-placeholder";
import { Variant1ColumnHeaderColorPicker } from "./variants/variant-1/column-header-color-picker";
import { Variant1ColumnsPanelColorPicker } from "./variants/variant-1/columns-panel-color-picker";
import { Variant2ColumnHeaderColorPicker } from "./variants/variant-2/column-header-color-picker";
import { Variant2ColumnsPanelColorPicker } from "./variants/variant-2/columns-panel-color-picker";
import { Variant3ColumnHeaderColorPicker } from "./variants/variant-3/column-header-color-picker";
import { Variant3ColumnsPanelColorPicker } from "./variants/variant-3/columns-panel-color-picker";
import type { InteractionVariant, InteractionVariantId } from "./types";

const PLACEHOLDER_DESCRIPTION = "Interaction pattern TBD";

export const INTERACTION_VARIANTS: InteractionVariant[] = [
  {
    id: "1",
    label: "Variant 1",
    name: "AI's attempt",
    description: "Column submenu + columns panel flyout",
    ColumnHeaderColorPicker: Variant1ColumnHeaderColorPicker,
    ColumnsPanelColorPicker: Variant1ColumnsPanelColorPicker,
  },
  {
    id: "2",
    label: "Variant 2",
    name: "Rename modal",
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
    name: "TBD",
    description: PLACEHOLDER_DESCRIPTION,
    ...createPlaceholderVariant("4", "Variant 4"),
  },
  {
    id: "5",
    label: "Variant 5",
    name: "TBD",
    description: PLACEHOLDER_DESCRIPTION,
    ...createPlaceholderVariant("5", "Variant 5"),
  },
  {
    id: "6",
    label: "Variant 6",
    name: "TBD",
    description: PLACEHOLDER_DESCRIPTION,
    ...createPlaceholderVariant("6", "Variant 6"),
  },
  {
    id: "7",
    label: "Variant 7",
    name: "TBD",
    description: PLACEHOLDER_DESCRIPTION,
    ...createPlaceholderVariant("7", "Variant 7"),
  },
];

export const DEFAULT_VARIANT_ID: InteractionVariantId = "1";

export function getInteractionVariant(id: InteractionVariantId): InteractionVariant {
  return INTERACTION_VARIANTS.find((v) => v.id === id) ?? INTERACTION_VARIANTS[0];
}
