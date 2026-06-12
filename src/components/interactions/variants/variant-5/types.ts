import type { ColorId } from "@/lib/colors";

export type ThemeEntry = {
  colorId: ColorId;
  label: string;
};

export type CustomTheme = {
  name: string;
  entries: ThemeEntry[];
};

export const THEME_COLOR_IDS: ColorId[] = [
  "red",
  "yellow",
  "teal",
  "green",
  "violet",
  "orange",
  "pink",
];

export const DEFAULT_THEME_COLOR_IDS: ColorId[] = [...THEME_COLOR_IDS, "default"];
