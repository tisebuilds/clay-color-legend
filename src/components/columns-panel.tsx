"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Calendar,
  ChevronRight,
  EyeOff,
  Link2,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInteractionVariant } from "@/components/interactions/interaction-context";
import { cn } from "@/lib/utils";
import { getColorById, type ColorId, type ColumnColor } from "@/lib/colors";

export type ColumnType = "text" | "function" | "date";

export type TableColumn = {
  id: string;
  name: string;
  colorId: ColorId;
  visible: boolean;
  type: ColumnType;
};

type ColumnsPanelProps = {
  columns: TableColumn[];
  colors: ColumnColor[];
  onSelectColor: (columnId: string, colorId: ColorId) => void;
  onSelectAllColors: (colorId: ColorId) => void;
  onRenameColor: (id: ColorId, label: string) => void;
  children: React.ReactNode;
};

function ColumnTypeIcon({ type }: { type: ColumnType }) {
  if (type === "date") {
    return <Calendar className="size-3.5 text-gray-500" />;
  }
  if (type === "function") {
    return (
      <span className="flex size-4 items-center justify-center rounded bg-gray-100 text-[10px] font-semibold text-gray-600">
        f
      </span>
    );
  }
  return (
    <span className="flex size-4 items-center justify-center rounded bg-gray-100 text-[10px] font-semibold text-gray-600">
      T
    </span>
  );
}

export function ColumnsPanel({
  columns,
  colors,
  onSelectColor,
  onSelectAllColors,
  onRenameColor,
  children,
}: ColumnsPanelProps) {
  const { variant } = useInteractionVariant();
  const ColumnsPanelColorPicker = variant.ColumnsPanelColorPicker;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeColorColumnId, setActiveColorColumnId] = useState<string | null>(null);
  const [applyColorToAll, setApplyColorToAll] = useState(false);

  const visibleCount = columns.filter((c) => c.visible).length;

  const filteredColumns = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return columns;
    return columns.filter((c) => c.name.toLowerCase().includes(query));
  }, [columns, search]);

  const activeColumn = columns.find((c) => c.id === activeColorColumnId);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setActiveColorColumnId("job");
          setApplyColorToAll(false);
        }
      }}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-auto gap-0 rounded-lg border border-gray-200 bg-gray-50 p-0 shadow-lg ring-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex">
          {/* Column list */}
          <div className="w-64">
            <div className="border-b border-gray-200 p-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-gray-500" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="h-8 border-gray-200 bg-white pl-8 text-sm leading-relaxed"
                />
              </div>
            </div>

            <div className="p-1">
              {[
                { label: "Show columns", icon: EyeOff },
                { label: "Hide columns", icon: EyeOff },
                { label: "Sort columns", icon: ArrowUpDown },
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
                >
                  <Icon className="size-4 text-gray-700" />
                  <span className="flex-1 text-left">{label}</span>
                  <ChevronRight className="size-3.5 text-gray-500" />
                </button>
              ))}
            </div>

            <div className="border-t border-gray-200 p-1">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm leading-relaxed text-gray-900 hover:bg-gray-100"
              >
                <Link2 className="size-4 text-gray-700" />
                Design Media Writing, Company
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto border-t border-gray-200 p-1">
              {filteredColumns.map((column) => {
                const color = getColorById(colors, column.colorId);
                const isActive = activeColorColumnId === column.id;

                return (
                  <div
                    key={column.id}
                    className={cn(
                      "group flex items-center gap-2 rounded-md px-2 py-1 text-sm leading-relaxed",
                      column.visible ? "text-gray-900" : "text-gray-400",
                      isActive && column.visible && "bg-gray-100"
                    )}
                    onMouseEnter={() => {
                      if (column.visible) {
                        setActiveColorColumnId(column.id);
                        setApplyColorToAll(false);
                      }
                    }}
                  >
                    <ColumnTypeIcon type={column.type} />
                    <span className="flex-1 truncate">{column.name}</span>
                    {column.visible ? (
                      <button
                        type="button"
                        className="rounded p-0.5 hover:bg-gray-200"
                        onClick={() => setActiveColorColumnId(column.id)}
                        aria-label={`Change color for ${column.name}`}
                      >
                        <span
                          className={cn(
                            "block size-4 rounded-sm border border-black/5",
                            color.swatch,
                            color.id === "default" && "bg-white"
                          )}
                        />
                      </button>
                    ) : (
                      <EyeOff className="size-3.5 text-gray-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color flyout */}
          {activeColumn?.visible && (
            <ColumnsPanelColorPicker
              showAllColumns
              colors={colors}
              selectedColorId={applyColorToAll ? "default" : activeColumn.colorId}
              onSelectColor={(id) => {
                if (applyColorToAll) onSelectAllColors(id);
                else onSelectColor(activeColumn.id, id);
              }}
              onSelectAllColumns={() => setApplyColorToAll(true)}
              onRenameColor={onRenameColor}
              allColumnsActive={applyColorToAll}
            />
          )}
        </div>

        <div className="sr-only">
          {visibleCount}/{columns.length} columns visible
        </div>
      </PopoverContent>
    </Popover>
  );
}
