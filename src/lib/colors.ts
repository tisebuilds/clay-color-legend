export type ColorId =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "violet"
  | "pink"
  | "default";

export type TableColorState = {
  /** Default — extremely light theme tint. */
  default: string;
  /** Hover — slightly stronger light tint. */
  hover: string;
  /** Active — solid theme color (menu open). */
  active: string;
  /** Text and icon color when active. */
  activeForeground: string;
  /** Cell active — light tint background. */
  cellActive: string;
  /** Cell active — thick bottom border in solid theme color. */
  cellActiveBorder: string;
};

export type ColumnColor = {
  id: ColorId;
  label: string;
  /** Solid swatch fill for the color picker menu. */
  swatch: string;
  table: TableColorState;
};

export const DEFAULT_COLORS: ColumnColor[] = [
  {
    id: "red",
    label: "Red",
    swatch: "bg-[#E55353]",
    table: {
      default: "bg-[#FFF1F1]",
      hover: "hover:bg-[#FFE3E4]",
      active: "bg-[#F24147]",
      activeForeground: "text-white",
      cellActive: "bg-[#FFE3E4]",
      cellActiveBorder: "border-b-[3px] border-b-[#F24147]",
    },
  },
  {
    id: "orange",
    label: "Orange",
    swatch: "bg-[#D9773B]",
    table: {
      default: "bg-[#FEF2EA]",
      hover: "hover:bg-[#FFE4D1]",
      active: "bg-[#E86C25]",
      activeForeground: "text-white",
      cellActive: "bg-[#FFE4D1]",
      cellActiveBorder: "border-b-[3px] border-b-[#E86C25]",
    },
  },
  {
    id: "yellow",
    label: "Yellow",
    swatch: "bg-[#D99A2E]",
    table: {
      default: "bg-[#FFFBEB]",
      hover: "hover:bg-[#FFF5CC]",
      active: "bg-[#EBB000]",
      activeForeground: "text-white",
      cellActive: "bg-[#FFF5CC]",
      cellActiveBorder: "border-b-[3px] border-b-[#EBB000]",
    },
  },
  {
    id: "green",
    label: "Green",
    swatch: "bg-[#4A9E60]",
    table: {
      default: "bg-[#E6F5ED]",
      hover: "hover:bg-[#CCEADB]",
      active: "bg-[#009A4E]",
      activeForeground: "text-white",
      cellActive: "bg-[#CCEADB]",
      cellActiveBorder: "border-b-[3px] border-b-[#009A4E]",
    },
  },
  {
    id: "teal",
    label: "Teal",
    swatch: "bg-[#3E8EBF]",
    table: {
      default: "bg-[#E6F5FA]",
      hover: "hover:bg-[#CCECF5]",
      active: "bg-[#0095CC]",
      activeForeground: "text-white",
      cellActive: "bg-[#CCECF5]",
      cellActiveBorder: "border-b-[3px] border-b-[#0095CC]",
    },
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "bg-[#8E6FF0]",
    table: {
      default: "bg-[#F4EEFD]",
      hover: "hover:bg-[#E9DDFB]",
      active: "bg-[#9D66F2]",
      activeForeground: "text-white",
      cellActive: "bg-[#E9DDFB]",
      cellActiveBorder: "border-b-[3px] border-b-[#9D66F2]",
    },
  },
  {
    id: "pink",
    label: "Pink",
    swatch: "bg-[#E056B4]",
    table: {
      default: "bg-[#FDEDF7]",
      hover: "hover:bg-[#FAD9EF]",
      active: "bg-[#F246B5]",
      activeForeground: "text-white",
      cellActive: "bg-[#FAD9EF]",
      cellActiveBorder: "border-b-[3px] border-b-[#F246B5]",
    },
  },
  {
    id: "default",
    label: "None",
    swatch: "",
    table: {
      default: "bg-white",
      hover: "hover:bg-[#F3F4F6]",
      active: "bg-[#2563EB]",
      activeForeground: "text-white",
      cellActive: "bg-[#DBEAFE]",
      cellActiveBorder: "border-b-[3px] border-b-[#F246B5]",
    },
  },
];

export const NONE_SWATCH_BORDER = "#E0E0E0";

export function getColorById(colors: ColumnColor[], id: ColorId) {
  return colors.find((c) => c.id === id) ?? colors[colors.length - 1];
}
