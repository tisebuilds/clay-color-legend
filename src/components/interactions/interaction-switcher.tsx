"use client";

import { cn } from "@/lib/utils";
import { useInteractionVariant } from "./interaction-context";
import type { InteractionVariantId } from "./types";

export function InteractionSwitcher() {
  const { variantId, setVariantId, variants } = useInteractionVariant();

  return (
    <div className="space-y-3">
      <p className="px-2 text-sm font-normal leading-relaxed text-gray-700">Variants</p>
      <ul className="space-y-0.5">
        {variants.map((v) => {
          const isSelected = variantId === v.id;

          return (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => setVariantId(v.id as InteractionVariantId)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm leading-relaxed transition-colors",
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-sidebar-accent"
                )}
                aria-pressed={isSelected}
                aria-label={`Switch to ${v.label}`}
              >
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded text-xs font-semibold",
                    isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
                  )}
                >
                  {v.id}
                </span>
                <span className="truncate font-normal">{v.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
