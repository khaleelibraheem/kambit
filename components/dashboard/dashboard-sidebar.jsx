"use client";

import { DesktopNavigationMenu } from "./desktop-navigation-menu";
import { cn } from "@/lib/utils";

export default function DashboardSidebar() {
  return (
    <>
      <aside className="hidden lg:block">
        <div
          className={cn(
            "fixed top-16 left-0 z-30",
            "h-[calc(100vh-4rem)] w-64",
            "bg-white dark:bg-slate-950",
            "border-r border-slate-100 dark:border-slate-800",
            "overflow-y-auto no-scrollbar"
          )}
        >
          <DesktopNavigationMenu />
        </div>
        {/* Spacer to push the main page content to the right */}
        <div className="w-64 flex-shrink-0" />
      </aside>
    </>
  );
}