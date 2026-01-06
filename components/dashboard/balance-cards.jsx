"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Send,
  Download,
  RefreshCw,
  Wallet,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { useBanking } from "@/contexts/BankingContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

const formatAsset = (amount, code) => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  let formatted;

  if (code === "NGN") {
    formatted = `₦${absAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else if (code === "USDT") {
    formatted = `${absAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USDT`;
  } else {
    formatted = `${absAmount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })} ${code}`;
  }

  const value = isNegative ? `-${formatted}` : formatted;
  const sizeClass = value.length > 15 ? "text-lg" : "text-xl";

  return { value, sizeClass };
};

export function BalanceCards() {
  const [mounted, setMounted] = useState(false); // FIX: Hydration state
  const [showBalances, setShowBalances] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { balances } = useBanking();

  useEffect(() => {
    setMounted(true); // FIX: Trigger client-side render
    const stored = localStorage.getItem("showBalances");
    if (stored !== null) setShowBalances(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("showBalances", JSON.stringify(showBalances));
    }
  }, [showBalances, mounted]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsRefreshing(false);
  };

  const assets = Object.entries(balances).map(([code, balance]) => {
    const mockChange = (Math.random() * 5 - 2).toFixed(1);
    return {
      code,
      balance,
      change: Math.abs(mockChange),
      trend: mockChange >= 0 ? "up" : "down",
    };
  });

  // FIX: Prevent rendering until client-side state is ready
  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
            <Wallet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
              Portfolio Balances
            </h2>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {assets.length} Assets Tracked
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex-1 sm:flex-none h-9 bg-white dark:bg-slate-900"
          >
            <RefreshCw className={cn("h-3.5 w-3.5 mr-2", isRefreshing && "animate-spin")} />
            Sync
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            className="flex-1 sm:flex-none h-9 bg-white dark:bg-slate-900"
          >
            {showBalances ? (
              <EyeOff className="h-3.5 w-3.5 mr-2" />
            ) : (
              <Eye className="h-3.5 w-3.5 mr-2" />
            )}
            {showBalances ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <AnimatePresence mode="popLayout">
          {assets.map((asset, index) => {
            const { value, sizeClass } = formatAsset(asset.balance, asset.code);
            return (
              <motion.div
                key={asset.code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card className="relative overflow-hidden group border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-md transition-all duration-300">
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-5">
                      <div className="bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="font-bold text-[11px] tracking-tighter text-slate-600 dark:text-slate-300">
                          {asset.code}
                        </span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <Link href="/dashboard/transfer">
                            <DropdownMenuItem className="cursor-pointer">
                              <Send className="h-3.5 w-3.5 mr-2" /> Send
                            </DropdownMenuItem>
                          </Link>
                          <Link href="/dashboard/receive">
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="h-3.5 w-3.5 mr-2" /> Receive
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <Link href="/dashboard/trade">
                            <DropdownMenuItem className="cursor-pointer font-semibold text-indigo-600">
                              <ArrowRightLeft className="h-3.5 w-3.5 mr-2" /> Trade
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-1">
                      <motion.h3
                        className={cn(
                          "font-heading font-bold tracking-tight text-slate-900 dark:text-white",
                          sizeClass
                        )}
                      >
                        {showBalances ? value : "••••••••"}
                      </motion.h3>

                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded",
                            asset.trend === "up"
                              ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                              : "text-rose-600 bg-rose-50 dark:bg-rose-900/20"
                          )}
                        >
                          {asset.trend === "up" ? (
                            <ArrowUp className="h-2.5 w-2.5 mr-0.5" />
                          ) : (
                            <ArrowDown className="h-2.5 w-2.5 mr-0.5" />
                          )}
                          {asset.change}%
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                          24h Change
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}