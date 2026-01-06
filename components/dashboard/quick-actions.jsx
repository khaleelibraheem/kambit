"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Plus,
  Banknote,
  ArrowRightLeft,
  ChevronRight,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

const actions = [
  {
    title: "Buy / Sell",
    description: "Trade BTC, USDT, ETH & SOL",
    icon: Zap,
    href: "/dashboard/trade",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-500/10",
    borderColor: "group-hover:border-indigo-500",
    gradient: "from-indigo-500/10 via-indigo-400/5 to-transparent",
    accent: "shadow-indigo-500/5",
    isFeatured: true,
  },
  {
    title: "Fund Wallet",
    description: "Deposit Naira or Crypto",
    icon: Plus,
    href: "/dashboard/fund-account",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
    borderColor: "group-hover:border-emerald-500",
    gradient: "from-emerald-500/10 via-emerald-400/5 to-transparent",
    accent: "shadow-emerald-500/5",
    isNew: true,
  },
  {
    title: "Withdraw",
    description: "Cash out to your bank",
    icon: Banknote,
    href: "/dashboard/withdrawals",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-500/10",
    borderColor: "group-hover:border-amber-500",
    gradient: "from-amber-500/10 via-amber-400/5 to-transparent",
    accent: "shadow-amber-500/5",
  },
  {
    title: "Quick Convert",
    description: "Instant crypto conversion",
    icon: ArrowRightLeft,
    href: "/dashboard/convert",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-500/10",
    borderColor: "group-hover:border-blue-500",
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    accent: "shadow-blue-500/5",
  },
];

export function QuickActions() {
  const [activeAction, setActiveAction] = useState(null);

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Quick Actions
          </h2>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest hidden sm:block">
            Instant Trading
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-bold border-slate-200 dark:border-slate-800 text-slate-500"
          >
            <ShieldCheck className="h-3 w-3 mr-1 text-emerald-500" />
            Secure
          </Badge>
          <Badge
            variant="outline"
            className="text-[10px] uppercase font-bold border-slate-200 dark:border-slate-800 text-slate-500"
          >
            <Activity className="h-3 w-3 mr-1 text-indigo-500" />
            High Liquidity
          </Badge>
        </div>
      </div>

      {/* Actions Grid - CHANGED TO grid-cols-2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={action.href} className="block h-full group">
                <Card
                  className={cn(
                    "relative h-full overflow-hidden transition-all duration-300 border-slate-200 dark:border-slate-800",
                    "hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1",
                    activeAction === action.title && "scale-95",
                    action.accent
                  )}
                  onMouseDown={() => setActiveAction(action.title)}
                  onMouseUp={() => setActiveAction(null)}
                  onMouseLeave={() => setActiveAction(null)}
                >
                  {/* Hover Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(145deg, ${action.gradient})`,
                    }}
                  />

                  {/* Reduced padding on mobile (p-4) to fit 2-column layout better */}
                  <div className="relative z-10 p-4 sm:p-5 space-y-4">
                    {/* Top Row: Icon & Status */}
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "p-2.5 sm:p-3 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                          action.bgColor
                        )}
                      >
                        <action.icon className={cn("w-5 h-5 sm:w-6 sm:h-6", action.color)} />
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        {action.isFeatured && (
                          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter bg-indigo-600 text-white px-2 py-0.5 rounded-full shadow-lg shadow-indigo-500/20">
                            Featured
                          </span>
                        )}
                        {action.isNew && (
                          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tighter bg-emerald-500 text-white px-2 py-0.5 rounded-full shadow-lg shadow-emerald-500/20">
                            New
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Text & Arrow */}
                    <div className="flex items-end justify-between gap-1">
                      <div className="space-y-1">
                        <h3 className="font-heading text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
                          {action.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-2">
                          {action.description}
                        </p>
                      </div>
                      <div className="mb-1 flex-shrink-0">
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors translate-x-0 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}