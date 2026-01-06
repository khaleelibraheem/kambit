"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  CheckCircle2,
  Wallet,
  ShoppingBag,
  Hash,
  Info,
  AlertTriangle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatNumberWithCommas } from "@/lib/utils";
import { useBanking } from "@/contexts/BankingContext";
import Link from "next/link";

const GIFTCARD_BRANDS = [
  {
    id: "apple",
    name: "Apple / iTunes",
    sellRate: 820,
    buyRate: 950,
    color: "bg-slate-900",
  },
  {
    id: "amazon",
    name: "Amazon",
    sellRate: 750,
    buyRate: 880,
    color: "bg-orange-500",
  },
  {
    id: "steam",
    name: "Steam",
    sellRate: 850,
    buyRate: 980,
    color: "bg-blue-600",
  },
  {
    id: "google",
    name: "Google Play",
    sellRate: 780,
    buyRate: 910,
    color: "bg-emerald-500",
  },
  {
    id: "sephora",
    name: "Sephora",
    sellRate: 810,
    buyRate: 940,
    color: "bg-pink-600",
  },
];

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
};

export default function GiftcardPage() {
  const { balances, handleWithdrawal, handleFunding } = useBanking();
  const [tradeType, setTradeType] = useState("sell");
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(GIFTCARD_BRANDS[0]);
  const [amount, setAmount] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Balance Check Logic
  const nairaBalance = balances.NGN || 0;
  const currentRate =
    tradeType === "sell" ? selectedBrand.sellRate : selectedBrand.buyRate;
  const numAmount = parseFloat(amount || "0");
  const totalNairaValue = numAmount * currentRate;
  const hasSufficientBalance = nairaBalance >= totalNairaValue;

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/,/g, "");
    if (val.includes(".")) {
      const [whole, decimal] = val.split(".");
      if (decimal && decimal.length > 2) return;
    }
    const cleanRaw = val.replace(/[^\d.]/g, "");
    setAmount(cleanRaw);
  };

  const handleProcessTrade = async () => {
    if (!amount || numAmount <= 0) return toast.error("Enter a valid amount");

    if (tradeType === "buy" && !hasSufficientBalance) {
      return toast.error("Insufficient Naira Balance");
    }

    if (tradeType === "sell" && !cardCode) {
      return toast.error("Please provide the card codes");
    }

    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));

      if (tradeType === "buy") {
        // Deduct NGN if buying
        handleWithdrawal(totalNairaValue, "NGN");
      } else {
        // Credit NGN if selling (Simulated immediate credit for demo)
        handleFunding(totalNairaValue, "NGN");
      }

      setStep(2);
      toast.success(
        tradeType === "sell"
          ? "Codes submitted for review"
          : "Purchase successful"
      );
    } catch (e) {
      toast.error("Process failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 2) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-3xl font-bold">
              Request Received
            </h2>
            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
              {tradeType === "sell"
                ? "Our system is verifying your codes. Payout will reflect in your NGN wallet within 5-15 minutes."
                : "Your digital giftcard has been issued! Check your registered email for the code."}
            </p>
          </div>
          <Button
            onClick={() => {
              setStep(1);
              setAmount("");
              setCardCode("");
            }}
            className="h-14 w-full max-w-xs font-bold bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/20"
          >
            New Exchange
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.container}
      className="max-w-5xl mx-auto space-y-8 pb-20"
    >
      <motion.div variants={variants.item} className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Giftcard Exchange
        </h1>
        <p className="text-slate-500">Fast liquidty for your digital assets.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* TAB TOGGLE */}
          <motion.div variants={variants.item}>
            <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full flex">
              <button
                onClick={() => {
                  setTradeType("sell");
                  setAmount("");
                }}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold uppercase transition-all",
                  tradeType === "sell"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600"
                    : "text-slate-500"
                )}
              >
                Sell Giftcard
              </button>
              <button
                onClick={() => {
                  setTradeType("buy");
                  setAmount("");
                }}
                className={cn(
                  "flex-1 py-3 rounded-xl text-xs font-bold uppercase transition-all",
                  tradeType === "buy"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600"
                    : "text-slate-500"
                )}
              >
                Buy Digital
              </button>
            </div>
          </motion.div>

          {/* BRAND SELECTION */}
          <motion.div variants={variants.item}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-[1.5rem]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  1. Select Brand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {GIFTCARD_BRANDS.map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(brand)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all",
                        selectedBrand.id === brand.id
                          ? "border-indigo-600 bg-indigo-50/30 dark:bg-indigo-900/20 ring-1 ring-indigo-600"
                          : "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg mb-3 shadow-inner",
                          brand.color
                        )}
                      />
                      <p className="font-bold text-sm truncate">{brand.name}</p>
                      <p className="text-[10px] font-black text-indigo-600 mt-1">
                        ₦{tradeType === "sell" ? brand.sellRate : brand.buyRate}
                        /$
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* INPUT FORM */}
          <motion.div variants={variants.item}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-[1.5rem]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  2. Card Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Card Value ($)
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        inputMode="decimal"
                        value={formatNumberWithCommas(amount)}
                        onChange={handleAmountChange}
                        className="h-12 font-mono font-bold text-lg pl-10"
                        placeholder="0.00"
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        $
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Card Format
                    </label>
                    <div className="h-12 px-4 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-2 opacity-70">
                      <Hash size={16} className="text-slate-400" />
                      <span className="text-sm font-bold text-slate-600">
                        Digital E-Code Only
                      </span>
                    </div>
                  </div>
                </div>

                {tradeType === "sell" ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Enter Card Codes / PINs
                    </label>
                    <textarea
                      rows={3}
                      value={cardCode}
                      onChange={(e) => setCardCode(e.target.value)}
                      placeholder="Type card numbers and PINs here..."
                      className="w-full p-4 font-mono text-sm border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 focus:ring-2 focus:ring-indigo-600 outline-none transition-all"
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="text-xs font-black uppercase text-indigo-400 leading-none mb-1">
                          Payment Method
                        </p>
                        <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200">
                          Kambit Naira Wallet
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase text-indigo-400">
                        Available
                      </p>
                      <p className="text-sm font-mono font-bold text-indigo-600">
                        ₦{nairaBalance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* SIDEBAR SUMMARY */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div variants={variants.item}>
            <Card className="bg-indigo-600 text-white border-none shadow-2xl overflow-hidden relative rounded-[2rem]">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <ShieldCheck size={120} />
              </div>
              <CardHeader>
                <CardTitle className="text-indigo-100 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 relative z-10">
                  <Zap className="h-4 w-4 fill-indigo-100" /> Settlement Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="space-y-1">
                  <p className="text-xs text-indigo-200 font-medium">
                    {tradeType === "sell"
                      ? "You Receive (NGN)"
                      : "Total Cost (NGN)"}
                  </p>
                  <p className="text-4xl font-heading font-bold tracking-tighter">
                    ₦
                    {totalNairaValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>

                <div className="pt-4 border-t border-indigo-500/50 space-y-3 text-sm font-medium">
                  <div className="flex justify-between text-indigo-100">
                    <span className="opacity-70 uppercase text-[10px] font-black tracking-widest">
                      Applied Rate
                    </span>
                    <span className="font-mono">₦{currentRate}/$</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-indigo-100 font-bold uppercase text-[10px] tracking-widest">
                      Fees
                    </span>
                    <span className="text-emerald-300 font-black uppercase text-[10px]">
                      Zero Fees
                    </span>
                  </div>
                </div>

                {/* Conditional Logic for Button/Warning */}
                {tradeType === "buy" && !hasSufficientBalance ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-rose-500/20 border border-rose-500/30 rounded-2xl flex gap-3 items-center">
                      <AlertTriangle
                        className="text-rose-200 shrink-0"
                        size={20}
                      />
                      <div className="space-y-0.5">
                        <p className="text-[11px] font-black uppercase tracking-widest text-rose-100">
                          Insufficient Funds
                        </p>
                        <p className="text-[10px] text-rose-200 leading-tight">
                          You need ₦
                          {(totalNairaValue - nairaBalance).toLocaleString()}{" "}
                          more.
                        </p>
                      </div>
                    </div>
                    <Link href="/dashboard/fund-account" className="block">
                      <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 font-bold text-lg rounded-xl flex gap-2 items-center justify-center">
                        <Plus size={18} /> Fund Wallet
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    onClick={handleProcessTrade}
                    disabled={isProcessing || !amount || numAmount <= 0}
                    className="w-full h-14 bg-white text-indigo-600 hover:bg-slate-50 font-bold text-lg rounded-xl shadow-lg flex gap-2 items-center justify-center"
                  >
                    {isProcessing
                      ? "Processing..."
                      : tradeType === "sell"
                      ? "Redeem Asset"
                      : "Pay & Buy"}
                    {!isProcessing && <ArrowRight size={18} />}
                  </Button>
                )}

                <p className="text-[10px] text-center text-indigo-200 uppercase font-black tracking-[0.2em] opacity-60">
                  <Lock className="inline w-3 h-3 mb-0.5 mr-1" /> Secure
                  Settlement
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={variants.item}
            className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.8rem] flex items-start gap-4"
          >
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-xl text-indigo-600">
              <Info size={20} />
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              {tradeType === "sell"
                ? "Standard verification takes 5-15 minutes. NGN payouts are instant once the card code is cleared."
                : "Digital codes are issued automatically. Please check your spam folder if the email is not in your inbox."}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
