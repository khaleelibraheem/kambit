"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  TrendingUp,
  Info,
  ChevronRight,
  ArrowUpDown,
  Zap,
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
  NGN: { symbol: "₦", name: "Naira", precision: 2 },
  USDT: { symbol: "₮", name: "Tether", precision: 2 },
  BTC: { symbol: "₿", name: "Bitcoin", precision: 8 },
  ETH: { symbol: "Ξ", name: "Ethereum", precision: 8 },
  SOL: { symbol: "◎", name: "Solana", precision: 4 },
};

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function QuickConverterPage() {
  const [fromAsset, setFromAsset] = useState("BTC");
  const [toAsset, setToAsset] = useState("NGN");
  const [amount, setAmount] = useState("1");
  const [isFlipping, setIsFlipping] = useState(false);

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
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setTimeout(() => setIsFlipping(false), 400);
  };

  return (
    <motion.div
      variants={variants.container}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto space-y-6 md:space-y-8 pb-20 px-4"
    >
      {/* Header - Scaled for Mobile */}
      <motion.div
        variants={variants.item}
        className="text-center space-y-2 md:space-y-3"
      >
        <h1 className="font-heading text-2xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tighter">
          Instant Converter
        </h1>
        <p className="text-slate-500 text-xs md:text-sm font-medium">
          Get real-time market estimates instantly.
        </p>
      </motion.div>

      <motion.div variants={variants.item}>
        <Card className="border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-slate-950">
          <CardContent className="p-2 md:p-3 space-y-1.5">
            {/* FROM SECTION */}
            <div className="p-5 md:p-8 space-y-4 bg-slate-50 dark:bg-slate-900 rounded-[1.8rem] md:rounded-[2rem]">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  You Convert
                </label>
                <span className="text-[10px] font-bold text-indigo-600 uppercase">
                  Rate: Fixed
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 md:gap-4">
                <Input
                  type="text"
                  inputMode="decimal"
                  value={formatNumberWithCommas(amount)}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className="h-auto p-0 border-none shadow-none bg-transparent text-2xl md:text-5xl font-heading font-bold focus-visible:ring-0 placeholder:text-slate-200 w-full"
                />

                <Select value={fromAsset} onValueChange={setFromAsset}>
                  <SelectTrigger className="w-fit min-w-[90px] md:min-w-[110px] h-10 md:h-12 border-none shadow-lg bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl px-3 md:px-4 gap-2 hover:scale-105 transition-transform">
                    <span className="font-black text-sm md:text-lg">
                      {fromAsset}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200">
                    {Object.keys(ASSET_CONFIG).map((code) => (
                      <SelectItem key={code} value={code} className="font-bold">
                        {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* SWAP BUTTON - Responsive sizing */}
            <div className="flex justify-center -my-7 md:-my-9 relative z-10">
              <motion.button
                onClick={flipAssets}
                whileTap={{ scale: 0.9 }}
                animate={isFlipping ? { rotate: 180 } : { rotate: 0 }}
                className="p-3 md:p-4 bg-indigo-600 text-white rounded-xl md:rounded-2xl border-[6px] md:border-[8px] border-white dark:border-slate-950 shadow-xl hover:bg-indigo-700 transition-colors"
              >
                <ArrowUpDown className="w-5 h-5 md:w-6 h-6" />
              </motion.button>
            </div>

            {/* TO SECTION */}
            <div className="p-5 md:p-8 space-y-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[1.8rem] md:rounded-[2rem]">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Estimated Receive
                </label>
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                  <TrendingUp size={12} /> Market
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 md:gap-4">
                <div className="h-auto p-0 text-2xl md:text-5xl font-mono font-bold text-slate-900 dark:text-white truncate w-full">
                  {formatNumber(
                    estimatedOutput,
                    ASSET_CONFIG[toAsset].precision
                  )}
                </div>

                <Select value={toAsset} onValueChange={setToAsset}>
                  <SelectTrigger className="w-fit min-w-[90px] md:min-w-[110px] h-10 md:h-12 border border-slate-100 dark:border-slate-800 shadow-sm bg-slate-50 dark:bg-slate-900 rounded-xl md:rounded-2xl px-3 md:px-4 gap-2">
                    <span className="font-black text-sm md:text-lg">
                      {toAsset}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {Object.keys(ASSET_CONFIG).map((code) => (
                      <SelectItem key={code} value={code} className="font-bold">
                        {code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* FOOTER DETAILS */}
            <div className="p-5 md:p-8 space-y-6">
              <div className="flex items-center justify-between text-[10px] md:text-xs border-b border-slate-50 dark:border-slate-900 pb-4">
                <span className="text-slate-400 font-bold uppercase tracking-widest">
                  Current Rate
                </span>
                <span className="font-mono font-bold text-indigo-600">
                  1 {fromAsset} ={" "}
                  {formatNumber(exchangeRate, ASSET_CONFIG[toAsset].precision)}{" "}
                  {toAsset}
                </span>
              </div>

              <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] md:text-[11px] text-slate-500 leading-relaxed font-medium">
                  Estimated output includes{" "}
                  <span className="text-slate-900 dark:text-white font-bold">
                    0.0% fees
                  </span>
                  . Actual prices may vary by the time you execute.
                </p>
              </div>

              <Link href="/dashboard/trade" className="block pt-2">
                <Button className="w-full h-14 md:h-16 bg-slate-900 dark:bg-white dark:text-slate-900 active:scale-95 font-bold text-base md:text-lg rounded-2xl shadow-2xl transition-all group">
                  Continue to Trade
                  <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
