"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Building2,
  Wallet,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Copy,
  Check,
  Info,
  AlertCircle,
  Download,
  Zap,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import staticRates from "@/lib/mock-data/static-rates";
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/utils";

const ASSET_CONFIG = {
  NGN: { symbol: "₦", name: "Nigerian Naira", precision: 2 },
};

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } },
};

export default function FundAccountPage() {
  const { handleFunding } = useBanking();
  const [selectedAsset] = useState("NGN"); // Restricted to NGN
  const [amount, setAmount] = useState(""); // Raw numeric string
  const [selectedMethod, setSelectedMethod] = useState("bank-transfer");
  const [isProcessing, setIsProcessing] = useState(false);

  // Formatting helper for local UI display
  const formatNaira = (val) =>
    `₦${Number(val).toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/,/g, ""); // Remove commas for logic
    if (val.includes(".")) {
      const [whole, decimal] = val.split(".");
      if (decimal && decimal.length > ASSET_CONFIG[selectedAsset].precision)
        return;
      if (val.split(".").length > 2) return;
    }
    const cleanRaw = val.replace(/[^\d.]/g, "");
    setAmount(cleanRaw);
  };

  const nairaToPay = parseFloat(amount || 0);

  const handleFundingSubmit = async () => {
    const numAmount = parseFormattedNumber(formatNumberWithCommas(amount));
    if (!numAmount || numAmount <= 0)
      return toast.error("Enter a valid amount");

    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      handleFunding(numAmount, selectedAsset);
      toast.success(`Deposit of ${formatNaira(numAmount)} successful`);
      setAmount("");
    } catch (e) {
      toast.error("Transaction failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.container}
      className="max-w-5xl mx-auto space-y-8 pb-20 px-4"
    >
      <motion.div variants={variants.item} className="space-y-2">
        <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Fund Your Wallet
        </h1>
        <p className="text-slate-500">
          Add Naira to your Kambit account instantly.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <motion.div variants={variants.item}>
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                   Funding Amount
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400">
                      Amount to Receive (NGN)
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
                        ₦
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={variants.item}>
            <Tabs
              value={selectedMethod}
              onValueChange={setSelectedMethod}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 h-14 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
                <TabsTrigger
                  value="bank-transfer"
                  className="rounded-xl font-bold text-xs uppercase"
                >
                  Bank
                </TabsTrigger>
                <TabsTrigger
                  value="card"
                  className="rounded-xl font-bold text-xs uppercase"
                >
                  Card
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bank-transfer" className="mt-6">
                <Card className="border-slate-200 dark:border-slate-800 shadow-md">
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-600">
                        <Building2 />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">
                          Kuda Bank Transfer
                        </h3>
                        <p className="text-sm text-slate-500">
                          Manual funding via local transfer
                        </p>
                      </div>
                    </div>
                    <Alert className="bg-slate-900 text-white border-none py-6">
                      <AlertDescription className="text-slate-300 space-y-4">
                        <p>
                          Transfer exactly{" "}
                          <span className="text-white font-bold underline">
                            {formatNaira(nairaToPay)}
                          </span>{" "}
                          to:
                        </p>
                        <div className="bg-white/5 p-4 rounded-xl space-y-3 border border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-xs uppercase font-bold text-slate-400">
                              Acc. Number
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-lg">
                                2014495521
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                  navigator.clipboard.writeText("2014495521");
                                  toast.success("Copied");
                                }}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs uppercase font-bold text-slate-400">
                              Bank
                            </span>
                            <span className="font-bold">
                              Kuda Microfinance Bank
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs uppercase font-bold text-slate-400">
                              Account Name
                            </span>
                            <span className="font-bold uppercase tracking-tight">
                              KAMBIT FINTECH LTD
                            </span>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                    <Button
                      className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 font-bold text-lg"
                      onClick={handleFundingSubmit}
                      disabled={isProcessing || !amount}
                    >
                      {isProcessing
                        ? "Verifying..."
                        : "I have made the transfer"}
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="card" className="mt-6">
                <Card className="border-slate-200 dark:border-slate-800 shadow-md p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-600">
                      <CreditCard />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Naira Card Payment</h3>
                      <p className="text-sm text-slate-500">
                        Instant gateway funding
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400">
                        Card Number
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="0000 0000 0000 0000"
                          className="h-12 font-mono"
                        />
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400">
                          Expiry
                        </label>
                        <Input placeholder="MM/YY" className="h-12 font-mono" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-slate-400">
                          CVV
                        </label>
                        <Input
                          placeholder="***"
                          type="password"
                          maxLength={3}
                          className="h-12 font-mono"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 font-bold text-lg"
                    onClick={handleFundingSubmit}
                    disabled={isProcessing || !amount}
                  >
                    Pay {formatNaira(nairaToPay)}
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <motion.div variants={variants.item}>
            <Card className="bg-indigo-600 text-white border-none shadow-xl overflow-hidden">
              <CardHeader>
                <CardTitle className="text-indigo-100 text-xs font-bold uppercase flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Deposit Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <p className="text-xs text-indigo-200">Amount to Receive</p>
                  <p className="text-3xl font-heading font-bold">
                    {formatNaira(amount || 0)}
                  </p>
                </div>
                <div className="pt-4 border-t border-indigo-500/50 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-indigo-200">Processing Fee</span>
                    <span className="font-bold">Free</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-indigo-100 font-bold uppercase text-xs">
                      Total to Pay
                    </span>
                    <span className="text-xl font-bold">
                      {formatNaira(nairaToPay)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
