"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  ArrowRightLeft,
  PlusCircle,
  Banknote,
  History,
  Landmark,
  User,
  Settings,
  ShieldCheck,
  ChevronRight,
  SendHorizontal,
  QrCode,
  RefreshCcw,
  Ticket,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const sidebarSections = [
  {
    group: "Trading",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Trade Crypto", href: "/dashboard/trade", icon: Zap },
      { title: "Giftcards", href: "/dashboard/giftcards", icon: Ticket },
      { title: "Exchange Rates", href: "/dashboard/exchange-rates", icon: RefreshCcw },
      { title: "Convert", href: "/dashboard/convert", icon: ArrowRightLeft },
    ],
  },
  {
    group: "Wallet",
    items: [
      { title: "Send", href: "/dashboard/send", icon: SendHorizontal },
      { title: "Receive", href: "/dashboard/receive", icon: QrCode },
      { title: "Fund Wallet", href: "/dashboard/fund-account", icon: PlusCircle },
      { title: "Withdraw", href: "/dashboard/withdrawals", icon: Banknote },
      { title: "Transactions", href: "/dashboard/transactions", icon: History },
    ],
  },
  {
    group: "Account",
    items: [
      { title: "Bank Accounts", href: "/dashboard/banks", icon: Landmark },
      { title: "Profile", href: "/dashboard/profile", icon: User },
    ],
  },
];

const NavItem = ({ item }) => {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/dashboard" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 mx-2 mb-1",
        isActive
          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
          : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200"
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "p-2 rounded-lg transition-colors flex items-center justify-center",
          isActive
            ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
            : "bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700"
        )}
      >
        <item.icon className="w-4 h-4" />
      </div>

      {/* Label */}
      <span
        className={cn("text-sm flex-1", isActive ? "font-medium" : "")}
      >
        {item.title}
      </span>

      {/* Indicator */}
      <ChevronRight
        className={cn(
          "w-3.5 h-3.5 transition-all duration-300",
          isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        )}
      />
    </Link>
  );
};

export function DesktopNavigationMenu() {
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full py-6">
      <div className="flex-1 space-y-8">
        {sidebarSections.map((section) => (
          <div key={section.group}>
            <h3 className="font-heading px-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80 mb-3">
              {section.group}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.href} item={item} />
              ))}
            </div>
          </div>
        ))}

        {/* Admin Section */}
        {user?.publicMetadata?.role === "admin" && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mx-4">
            <h3 className="font-heading px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80 mb-3">
              System
            </h3>
            <NavItem
              item={{
                title: "Admin Terminal",
                href: "/admin",
                icon: ShieldCheck,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}