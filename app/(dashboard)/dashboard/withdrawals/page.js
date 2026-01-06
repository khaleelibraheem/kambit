"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Zap,
  Landmark,
  Info,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";
import staticRates from "@/lib/mock-data/static-rates";
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/utils";

const ASSET_CONFIG = {
  NGN: { symbol: "₦", name: "Nigerian Naira", precision: 2 },
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
  item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
};

export default function WithdrawalsPage() {
  const { balances, bankAccounts, handleWithdrawal, addBankAccount } = useBanking();
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  
  // New Bank State
  const [newBankData, setNewBankData] = useState({
    bankName: "",
    accountNumber: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const currentBalance = balances[selectedAsset] || 0;

  // Formatting helpers
  const formatNaira = (val) =>
    `₦${Number(val).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  const formatCrypto = (val, code) =>
    `${Number(val).toLocaleString("en-US", {
      maximumFractionDigits: ASSET_CONFIG[code].precision,
    })} ${code}`;

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/,/g, "");
    if (val.includes(".")) {
      const [whole, decimal] = val.split(".");
      if (decimal && decimal.length > ASSET_CONFIG[selectedAsset].precision)
        return;
      if (val.split(".").length > 2) return;
    }
    const cleanRaw = val.replace(/[^\d.]/g, "");
    setAmount(cleanRaw);
  };

  const nairaEquivalent =
    selectedAsset === "NGN"
      ? parseFloat(amount || 0)
      : parseFloat(amount || 0) * (staticRates[selectedAsset]?.NGN || 0);

  const handleWithdrawalSubmit = async () => {
    const numAmount = parseFormattedNumber(formatNumberWithCommas(amount));
    
    // Validation
    if (!numAmount || numAmount <= 0) return toast.error("Enter a valid amount");
    if (numAmount > currentBalance) return toast.error("Insufficient balance");
    if (!selectedBank) return toast.error("Please select a bank account");

    // Handle New Bank logic
    if (selectedBank === "new") {
      if (!newBankData.bankName || newBankData.accountNumber.length < 10) {
        return toast.error("Please provide valid new bank details");
      }
      addBankAccount({ ...newBankData, accountType: "Savings" });
    }

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = handleWithdrawal(numAmount, selectedAsset);

      if (success) {
        toast.success(
          `Withdrawal of ${formatNaira(nairaEquivalent)} initiated successfully`
        );
        setAmount("");
        setSelectedBank("");
        setNewBankData({ bankName: "", accountNumber: "" });
      } else {
        throw new Error("Withdrawal failed");
      }
    } catch (error) {
      toast.error("Process failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.container}
      className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* Header */}
      <motion.div variants={variants.item} className="space-y-1">
        <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Withdraw to Bank
        </h1>
        <p className="text-slate-500 text-lg">
          Convert your assets and settle directly to your Naira account.
        </p>
      </motion.div>

      {/* Asset Selection Grid */}
      <motion.div
        variants={variants.item}
        className="grid grid-cols-2 md:grid-cols-5 gap-3"
      >
        {Object.entries(ASSET_CONFIG).map(([code]) => (
          <Card
            key={code}
            className={`cursor-pointer transition-all border-slate-200 dark:border-slate-800 ${
              selectedAsset === code
                ? "ring-2 ring-indigo-500 bg-indigo-50/30 dark:bg-indigo-900/20"
                : "hover:bg-slate-50 dark:hover:bg-slate-900/50"
            }`}
            onClick={() => {
              setSelectedAsset(code);
              setAmount("");
            }}
          >
            <CardContent className="p-4 space-y-1 text-center sm:text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {code}
              </p>
              <p className="text-sm font-bold truncate">
                {code === "NGN"
                  ? formatNaira(balances[code] || 0)
                  : (balances[code] || 0).toFixed(
                      selectedAsset === code ? 4 : 2
                    )}
              </p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={variants.item}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50">
                <CardTitle className="text-lg font-bold">
                  1. Amount to Liquidate
                </CardTitle>
                <CardDescription>
                  Available:{" "}
                  {selectedAsset === "NGN"
                    ? formatNaira(currentBalance)
                    : formatCrypto(currentBalance, selectedAsset)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    inputMode="decimal"
                    value={formatNumberWithCommas(amount)}
                    onChange={handleAmountChange}
                    className="h-16 text-2xl font-mono font-bold pl-12"
                    placeholder="0.00"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xl">
                    {ASSET_CONFIG[selectedAsset].symbol}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute right-3 top-1/2 -translate-y-1/2 font-bold h-10 px-4"
                    onClick={() => setAmount(currentBalance.toString())}
                  >
                    MAX
                  </Button>
                </div>

                {amount > 0 && selectedAsset !== "NGN" && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex justify-between items-center text-emerald-700 dark:text-emerald-400">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-emerald-600" />
                      <span className="text-sm font-medium uppercase font-bold tracking-tighter">
                        Instant Cash Out Value
                      </span>
                    </div>
                    <span className="text-xl font-bold font-heading">
                      {formatNaira(nairaEquivalent)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Bank Destination Section */}
          <motion.div variants={variants.item}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50">
                <CardTitle className="text-lg font-bold">
                  2. Destination Bank Account
                </CardTitle>
                <CardDescription>
                  Choose where to receive your Naira settlement.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-14 font-medium">
                      <SelectValue placeholder="Select Destination Account" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map((acc) => (
                        <SelectItem key={acc.id} value={acc.id.toString()}>
                          <div className="flex items-center gap-2 text-left">
                            <Landmark className="h-4 w-4 text-slate-400" />
                            <div>
                              <p className="font-bold text-sm">{acc.bankName}</p>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                {acc.accountNumber}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                      <SelectItem
                        value="new"
                        className="text-indigo-600 font-bold border-t mt-2"
                      >
                        <Plus className="w-4 h-4 mr-2 inline" />
                        Link New Bank Account
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  {/* FORM FOR NEW BANK */}
                  <AnimatePresence>
                    {selectedBank === "new" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 pt-2 overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-400">Bank Name</label>
                            <Input 
                              placeholder="e.g. GTBank, Zenith" 
                              value={newBankData.bankName}
                              onChange={(e) => setNewBankData({ ...newBankData, bankName: e.target.value })}
                              className="h-12"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-slate-400">Account Number</label>
                            <Input 
                              placeholder="10-digit number" 
                              maxLength={10}
                              value={newBankData.accountNumber}
                              onChange={(e) => setNewBankData({ ...newBankData, accountNumber: e.target.value.replace(/\D/g,'') })}
                              className="h-12 font-mono"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed">
                  <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    Settlements to GTBank, Kuda, and Zenith are typically
                    confirmed in 5-15 minutes. Ensure account names match your profile.
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5 space-y-6">
          <motion.div variants={variants.item}>
            <Card className="bg-slate-900 text-white border-none shadow-2xl overflow-hidden relative">
              <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Transaction Summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 relative z-10">
                <div className="space-y-1 pt-4">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">
                    Total Liquidation
                  </p>
                  <p className="text-3xl font-heading font-bold">
                    {selectedAsset === "NGN"
                      ? formatNaira(amount || 0)
                      : formatCrypto(amount || 0, selectedAsset)}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 font-medium">
                      Service Fee
                    </span>
                    <span className="font-bold text-emerald-500">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-tight">
                      Net Payout Value
                    </span>
                    <span className="text-2xl font-bold text-indigo-400 font-heading">
                      {formatNaira(nairaEquivalent)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 font-bold text-lg shadow-lg shadow-indigo-500/20 rounded-xl transition-all"
                  onClick={handleWithdrawalSubmit}
                  disabled={isProcessing || !amount || !selectedBank}
                >
                  {isProcessing
                    ? "Processing Settlement..."
                    : "Confirm & Withdraw"}
                </Button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                  <BadgeCheck className="w-3 h-3 text-emerald-500" /> Secure
                  Kambit Settlement
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}