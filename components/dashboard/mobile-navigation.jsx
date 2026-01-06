"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Zap,
  RefreshCcw,
  ArrowRightLeft,
  SendHorizontal,
  QrCode,
  PlusCircle,
  Banknote,
  History,
  Landmark,
  User,
  Settings,
  ShieldCheck,
  AlignRight,
  X,
  ChevronRight,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "../shared/logo";

const sidebarItems = [
  {
    group: "Trading",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Trade Crypto", href: "/dashboard/trade", icon: Zap },
      {
        title: "Exchange Rates",
        href: "/dashboard/exchange-rates",
        icon: RefreshCcw,
      },
      { title: "Convert", href: "/dashboard/convert", icon: ArrowRightLeft },
    ],
  },
  {
    group: "Wallet",
    items: [
      {
        title: "Send Money",
        href: "/dashboard/send",
        icon: SendHorizontal,
      },
      {
        title: "Receive Money",
        href: "/dashboard/receive",
        icon: QrCode,
      },
      { title: "Fund Wallet", href: "/dashboard/fund-account", icon: PlusCircle },
      { title: "Withdraw", href: "/dashboard/withdrawals", icon: Banknote },
      { title: "Transactions", href: "/dashboard/transactions", icon: History },
      { title: "Bank Accounts", href: "/dashboard/banks", icon: Landmark },
    ],
  },
  {
    group: "Account",
    items: [
      { title: "Profile", href: "/dashboard/profile", icon: User },
    ],
  },
];

export function MobileNavigation({ user }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- FIX: AUTO-CLOSE ON RESIZE ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // 1024 is the standard Tailwind 'lg' breakpoint
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close when clicking a link
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  const allItems = [...sidebarItems];
  if (user?.publicMetadata?.role === "admin") {
    allItems.push({
      group: "System",
      items: [
        {
          title: "Admin Terminal",
          href: "/admin",
          icon: ShieldCheck,
          isAdmin: true,
        },
      ],
    });
  }

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="text-slate-900 dark:text-white h-11 w-11 p-0 flex items-center justify-center"
          >
            <AlignRight className="!w-7 !h-7 stroke-[1.5]" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[300px] p-0 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col [&>button]:hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 sticky top-0 z-10">
            <Logo />
            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="h-11 w-11 p-0 text-slate-900 dark:text-white flex items-center justify-center"
                >
                  <X className="!w-7 !h-7 stroke-[1.5]" />
                </Button>
              </SheetClose>
            </div>
          </div>

          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          <div className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
            {allItems.map((section, idx) => (
              <div key={idx} className="mb-8 last:mb-0">
                <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                  {section.group}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 p-3.5 rounded-xl transition-all ${
                          isActive
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? "bg-indigo-100 dark:bg-indigo-900/40"
                              : "bg-slate-100 dark:bg-slate-800"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm flex-1">{item.title}</span>
                        {item.isAdmin ? (
                          <Badge className="bg-indigo-600 text-[10px] h-5">
                            Admin
                          </Badge>
                        ) : (
                          isActive && (
                            <ChevronRight className="w-4 h-4 opacity-40" />
                          )
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-tighter">
              © {new Date().getFullYear()} Kambit
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
