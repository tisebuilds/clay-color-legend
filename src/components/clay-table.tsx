"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowUpDown,
  ChevronDown,
  Columns3,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInteractionVariant } from "@/components/interactions/interaction-context";
import { ColumnsPanel, type TableColumn } from "@/components/columns-panel";
import { cn } from "@/lib/utils";
import {
  DEFAULT_COLORS,
  getColorById,
  type ColorId,
  type ColumnColor,
} from "@/lib/colors";

const SAMPLE_ROWS = [
  {
    company: "Acme Corp",
    first: "Jane",
    last: "Smith",
    full: "Jane Smith",
    job: "VP Marketing",
  },
  {
    company: "Globex",
    first: "John",
    last: "Doe",
    full: "John Doe",
    job: "Engineer",
  },
  {
    company: "Initech",
    first: "Sam",
    last: "Nguyen",
    full: "Sam Nguyen",
    job: "Designer",
  },
  {
    company: "Umbrella Co",
    first: "Alex",
    last: "Rivera",
    full: "Alex Rivera",
    job: "Analyst",
  },
  {
    company: "Stark Industries",
    first: "Morgan",
    last: "Lee",
    full: "Morgan Lee",
    job: "Director",
  },
];

const INITIAL_COLUMNS: TableColumn[] = [
  { id: "createdAt", name: "Created At", colorId: "default", visible: false, type: "date" },
  { id: "updatedAt", name: "Updated At", colorId: "default", visible: false, type: "date" },
  { id: "company", name: "Company Name", colorId: "teal", visible: true, type: "function" },
  { id: "first", name: "First Name", colorId: "default", visible: true, type: "text" },
  { id: "last", name: "Last Name", colorId: "default", visible: true, type: "text" },
  { id: "full", name: "Full Name", colorId: "default", visible: true, type: "text" },
  { id: "job", name: "Job Title", colorId: "pink", visible: true, type: "function" },
];

export function ClayTable() {
  const { variant } = useInteractionVariant();
  const ColumnHeaderColorPicker = variant.ColumnHeaderColorPicker;
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [colors, setColors] = useState<ColumnColor[]>(DEFAULT_COLORS);
  const [openMenuColumnId, setOpenMenuColumnId] = useState<string | null>("company");
  const [cellActiveColumnId, setCellActiveColumnId] = useState<string | null>(null);

  const visibleColumns = useMemo(
    () => columns.filter((col) => col.visible),
    [columns]
  );

  function setColumnColor(columnId: string, colorId: ColorId) {
    setColumns((prev) =>
      prev.map((col) => (col.id === columnId ? { ...col, colorId } : col))
    );
  }

  function setAllColumnsColor(colorId: ColorId) {
    setColumns((prev) =>
      prev.map((col) => (col.visible ? { ...col, colorId } : col))
    );
  }

  function renameColor(id: ColorId, label: string) {
    setColors((prev) => prev.map((c) => (c.id === id ? { ...c, label } : c)));
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 text-sm leading-relaxed">
        <button className="flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50">
          Auto-run
          <ChevronDown className="size-3.5" />
        </button>

        <ColumnsPanel
          columns={columns}
          colors={colors}
          onSelectColor={setColumnColor}
          onSelectAllColors={setAllColumnsColor}
          onRenameColor={renameColor}
        >
          <button className="rounded-md px-2 py-1 text-gray-700 hover:bg-gray-50">
            {visibleColumns.length}/{visibleColumns.length} columns
          </button>
        </ColumnsPanel>

        <span className="text-gray-700">5/5 rows</span>
        <div className="ml-auto flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md px-2 py-1 text-gray-700 hover:bg-gray-50">
            <Filter className="size-3.5" />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-md px-2 py-1 text-gray-700 hover:bg-gray-50">
            <Search className="size-3.5" />
            Search
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm leading-relaxed">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-10 border-b border-r border-gray-200 bg-gray-50 px-2 py-1 text-left font-normal text-gray-700">
                #
              </th>
              {visibleColumns.map((column) => {
                const color = getColorById(colors, column.colorId);
                const isMenuOpen = openMenuColumnId === column.id;
                const isCellActive =
                  !isMenuOpen && cellActiveColumnId === column.id;
                const isActive = isMenuOpen;
                const iconClass = isActive
                  ? "text-white"
                  : "text-gray-700";

                return (
                  <th
                    key={column.id}
                    className={cn(
                      "min-w-[160px] border-r border-gray-200 px-0 py-0 text-left font-semibold",
                      isActive && color.table.active,
                      isCellActive && [
                        color.table.cellActive,
                        color.table.cellActiveBorder,
                      ],
                      !isActive &&
                        !isCellActive && [
                          color.table.default,
                          "border-b border-gray-200",
                        ],
                      isActive && "border-b border-gray-200"
                    )}
                  >
                    <DropdownMenu
                      open={isMenuOpen}
                      onOpenChange={(open) => {
                        if (open) {
                          setOpenMenuColumnId(column.id);
                          setCellActiveColumnId(null);
                        } else {
                          setOpenMenuColumnId(null);
                          setCellActiveColumnId(column.id);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "flex w-full items-center gap-2 px-4 py-3 text-left text-sm leading-relaxed",
                            !isActive && color.table.hover,
                            isActive && color.table.activeForeground
                          )}
                        >
                          <Columns3 className={cn("size-3.5 shrink-0", iconClass)} />
                          <span className="truncate">{column.name}</span>
                          <ChevronDown className={cn("ml-auto size-3.5 shrink-0", iconClass)} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          Rename column
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          Edit column
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Plus className="size-4" />
                          Insert 1 column left
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Plus className="size-4" />
                          Insert 1 column right
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <ColumnHeaderColorPicker
                          colors={colors}
                          selectedColorId={column.colorId}
                          onSelectColor={(id) => {
                            setColumnColor(column.id, id);
                            setOpenMenuColumnId(null);
                            setCellActiveColumnId(column.id);
                          }}
                          onRenameColor={renameColor}
                        />
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <ArrowDownAZ className="size-4" />
                          Sort A → Z
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ArrowUpDown className="size-4" />
                          Sort Z → A
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Filter className="size-4" />
                          Filter on this column
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </th>
                );
              })}
              <th className="border-b border-gray-200 bg-gray-50/50 px-4 py-3">
                <button className="flex items-center gap-2 text-sm leading-relaxed text-gray-700 hover:text-gray-900">
                  <Plus className="size-3.5" />
                  Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ROWS.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/80">
                <td className="sticky left-0 z-10 border-b border-r border-gray-200 bg-background px-2 py-1 text-gray-700">
                  {i + 1}
                </td>
                {visibleColumns.map((column) => (
                  <td key={column.id} className="border-b border-r border-gray-200 px-4 py-3">
                    {row[column.id as keyof typeof row]}
                  </td>
                ))}
                <td className="border-b border-gray-200" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-700">
        <div className="flex items-center gap-2">
          <span className="rounded bg-gray-100 px-2 py-1">Table 1</span>
          <span>+ New view</span>
        </div>
        <span>40% of table completed</span>
      </div>
    </div>
  );
}
