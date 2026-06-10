"use client";

import { InteractionSwitcher } from "@/components/interactions/interaction-switcher";

export function PrototypeSidebar() {
  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-gray-200 bg-sidebar text-sm leading-relaxed">
      <div className="border-b border-gray-200 px-4 py-3">
        <p className="font-semibold text-gray-900">Color legend</p>
        <p className="mt-0.5 text-xs leading-relaxed text-gray-500">Interaction prototype</p>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <InteractionSwitcher />
      </div>
    </aside>
  );
}
