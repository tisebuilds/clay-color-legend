"use client";

import {
  Bell,
  BookOpen,
  ChevronRight,
  HelpCircle,
  Home,
  Megaphone,
  Radio,
  Search,
  Settings,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { ClayTable } from "@/components/clay-table";

const NAV = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Find leads" },
  { icon: Users, label: "Find companies" },
  { icon: Users, label: "Find jobs" },
];

const ORCHESTRATION = [
  { icon: Radio, label: "Signals" },
  { icon: Megaphone, label: "Ads" },
  { icon: Zap, label: "Campaigns" },
  { icon: Sparkles, label: "Workbooks" },
];

export function ClayShell() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="flex w-52 shrink-0 flex-col border-r border-gray-200 bg-sidebar text-sm leading-relaxed">
        <div className="flex items-center gap-2 px-4 py-3 font-semibold">
          <span className="flex size-6 items-center justify-center rounded bg-foreground text-xs text-background">
            C
          </span>
          Clay
        </div>
        <nav className="flex-1 space-y-3 overflow-y-auto px-2 py-2">
          <div className="space-y-0.5">
            {NAV.map(({ icon: Icon, label }) => (
              <button
                key={label}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-gray-700 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
          <div>
            <p className="px-2 py-1 text-sm font-normal leading-relaxed text-gray-700">
              Orchestration
            </p>
            <div className="space-y-0.5">
              {ORCHESTRATION.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-gray-700 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <div className="space-y-0.5 border-t border-gray-200 px-2 py-2">
          {[
            { icon: Settings, label: "Settings" },
            { icon: Sparkles, label: "AI context" },
            { icon: BookOpen, label: "Resources" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1 text-gray-700 hover:bg-sidebar-accent"
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>
      </aside>

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
  );
}
