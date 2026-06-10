"use client";

import { Bell, ChevronRight, HelpCircle } from "lucide-react";
import { ClayTable } from "@/components/clay-table";
import { InteractionProvider } from "@/components/interactions/interaction-context";
import { Variant3ThemeProvider } from "@/components/interactions/variants/variant-3/theme-context";
import { Variant4LabelProvider } from "@/components/interactions/variants/variant-4/label-context";
import { Variant5ThemeProvider } from "@/components/interactions/variants/variant-5/theme-context";
import { PrototypeSidebar } from "@/components/prototype-sidebar";

export function ClayShell() {
  return (
    <InteractionProvider>
      <Variant3ThemeProvider>
        <Variant4LabelProvider>
        <Variant5ThemeProvider>
        <div className="flex h-screen overflow-hidden bg-background">
          <PrototypeSidebar />

          {/* Main */}
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 text-sm leading-relaxed">
              <span className="text-gray-700">Clay 101 Cohort</span>
              <ChevronRight className="size-3.5 text-gray-700" />
              <span className="font-semibold text-gray-900">Clay Test #1</span>
              <ChevronRight className="size-3.5 text-gray-700" />
              <span className="text-gray-700">...</span>
              <div className="ml-auto flex items-center gap-2">
                <button className="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold leading-relaxed text-white hover:bg-blue-700">
                  Upgrade your plan
                </button>
                <button className="rounded-md p-2 text-gray-700 hover:bg-gray-50">
                  <Bell className="size-4" />
                </button>
                <button className="rounded-md p-2 text-gray-700 hover:bg-gray-50">
                  <HelpCircle className="size-4" />
                </button>
              </div>
            </header>
            <ClayTable />
          </div>
        </div>
        </Variant5ThemeProvider>
        </Variant4LabelProvider>
      </Variant3ThemeProvider>
    </InteractionProvider>
  );
}
