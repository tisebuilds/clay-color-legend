"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useInteractionVariant } from "./interaction-context";
import { RECOMMENDED_VARIANT_IDS } from "./registry";
import type { InteractionVariant, InteractionVariantId } from "./types";

function VariantItem({
  variant,
  isSelected,
  onSelect,
}: {
  variant: InteractionVariant;
  isSelected: boolean;
  onSelect: (id: InteractionVariantId) => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(variant.id)}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm leading-relaxed transition-colors",
          isSelected ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-sidebar-accent"
        )}
        aria-pressed={isSelected}
        aria-label={`Switch to ${variant.label}`}
      >
        <span
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded text-xs font-semibold",
            isSelected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
          )}
        >
          {variant.id}
        </span>
        <span className="flex min-w-0 items-center gap-1 truncate font-normal">
          {variant.name}
          {variant.favorite ? (
            <Star
              className={cn(
                "size-3 shrink-0 fill-current",
                isSelected ? "text-amber-200" : "text-amber-500"
              )}
              aria-label="Favorite direction"
            />
          ) : null}
        </span>
      </button>
    </li>
  );
}

export function InteractionSwitcher() {
  const { variantId, setVariantId, variants } = useInteractionVariant();

  const recommendedVariants = RECOMMENDED_VARIANT_IDS.map((id) =>
    variants.find((v) => v.id === id)
  ).filter((v): v is InteractionVariant => v !== undefined);

  const recommendedIds = new Set<InteractionVariantId>(RECOMMENDED_VARIANT_IDS);
  const otherVariants = variants.filter((v) => !recommendedIds.has(v.id));

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <p className="px-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          Recommended
        </p>
        <ul className="space-y-0.5">
          {recommendedVariants.map((v) => (
            <VariantItem
              key={v.id}
              variant={v}
              isSelected={variantId === v.id}
              onSelect={setVariantId}
            />
          ))}
        </ul>
      </div>

      <Separator className="bg-gray-200" />

      <ul className="space-y-0.5">
        {otherVariants.map((v) => (
          <VariantItem
            key={v.id}
            variant={v}
            isSelected={variantId === v.id}
            onSelect={setVariantId}
          />
        ))}
      </ul>
    </div>
  );
}
