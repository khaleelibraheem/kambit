"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Calculator,
  TrendingUp,
  Info,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import staticRates from "@/lib/mock-data/static-rates";
import {
  formatNumberWithCommas,
  parseFormattedNumber,
  formatNumber,
} from "@/lib/utils";

const ASSET_CONFIG = {
  NGN: { symbol: "₦", name: "Nigerian Naira", precision: 2 },
  USDT: { symbol: "₮", name: "Tether", precision: 2 },
  BTC: { symbol: "₿", name: "Bitcoin", precision: 8 },
  ETH: { symbol: "Ξ", name: "Ethereum", precision: 8 },
  SOL: { symbol: "◎", name: "Solana", precision: 4 },
};

export default function QuickConverterPage() {
  const [fromAsset, setFromAsset] = useState("BTC");
  const [toAsset, setToAsset] = useState("NGN");
  const [amount, setAmount] = useState("1");
  const [isFlipping, setIsFlipping] = useState(false);

  // --- Calculation Logic ---
  const exchangeRate = staticRates[fromAsset]?.[toAsset] || 0;
  const numAmount = parseFormattedNumber(amount || "0");
  const estimatedOutput = numAmount * exchangeRate;

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/,/g, "");
    if (val.includes(".")) {
      const [whole, decimal] = val.split(".");
      if (decimal && decimal.length > ASSET_CONFIG[fromAsset].precision) return;
    }
    setAmount(val.replace(/[^\d.]/g, ""));
  };

  const flipAssets = () => {
    setIsFlipping(true);
    const tempFrom = fromAsset;
    const tempTo = toAsset;
    setFromAsset(tempTo);
    setToAsset(tempFrom);
    setTimeout(() => setIsFlipping(false), 400);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 pb-20">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-2">
          <Calculator className="w-3.5 h-3.5 text-indigo-600" />
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">
            Quick Price Calculator
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Rate Converter
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm">
          See real-time conversion differences between assets.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
        {/* Adjusted padding: p-6 for mobile, p-10 for desktop */}
        <CardContent className="p-6 sm:p-10 space-y-2">
          
          {/* FROM SECTION */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest">
                Amount to Convert
              </label>
            </div>

            <div className="relative">
              {/* pr-24 ensures text doesn't go behind the w-20 Select on mobile */}
              <Input
                type="text"
                inputMode="decimal"
                value={formatNumberWithCommas(amount)}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="h-20 sm:h-24 text-2xl sm:text-4xl font-heading font-bold pl-4 sm:pl-6 pr-24 sm:pr-28 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl sm:rounded-3xl"
              />
              <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                <Select value={fromAsset} onValueChange={setFromAsset}>
                  <SelectTrigger className="w-20 sm:w-24 h-12 sm:h-14 border-none shadow-none font-black text-sm sm:text-lg bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(ASSET_CONFIG)
                      .filter((code) => code !== toAsset)
                      .map((code) => (
                        <SelectItem key={code} value={code} className="font-bold">
                          {code}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* SWAP ICON */}
          <div className="flex justify-center -my-5 sm:-my-6 relative z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={flipAssets}
              className="p-3 sm:p-4 bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl border-4 border-slate-50 dark:border-slate-950 shadow-xl flex text-indigo-600 transition-transform"
            >
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6" />
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.button>
          </div>

          {/* TO SECTION */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest">
                Estimated Value
              </label>
            </div>

            <div className="relative">
              <div className="h-20 sm:h-24 w-full rounded-2xl sm:rounded-3xl flex items-center px-4 sm:px-6 bg-slate-50 dark:bg-slate-900">
                {/* Added truncate and limited width to prevent layout break on small screens */}
                <span className="text-2xl sm:text-4xl font-heading font-bold text-slate-900 dark:text-white truncate pr-20 sm:pr-24">
                  {formatNumber(estimatedOutput, ASSET_CONFIG[toAsset].precision)}
                </span>
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2">
                  <Select value={toAsset} onValueChange={setToAsset}>
                    <SelectTrigger className="w-20 sm:w-24 h-12 sm:h-14 border-none shadow-none font-black text-sm sm:text-lg bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(ASSET_CONFIG)
                        .filter((code) => code !== fromAsset)
                        .map((code) => (
                          <SelectItem key={code} value={code} className="font-bold">
                            {code}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="pt-4 sm:pt-6 px-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-500" />
                  Live Rate
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  1 {fromAsset} ={" "}
                  {formatNumber(exchangeRate, ASSET_CONFIG[toAsset].precision)}{" "}
                  {toAsset}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30">
                <div className="flex gap-2 sm:gap-3">
                  <Info className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[10px] sm:text-[11px] text-indigo-700 dark:text-indigo-400 leading-relaxed font-medium">
                    Prices are based on Kambit market liquidity. These figures
                    are estimates for informational purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link href="/dashboard/trade" className="block">
              <Button className="w-full h-14 sm:h-16 bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-xl transition-all group">
                Execute Trade{" "}
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}