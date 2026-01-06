"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Copy,
  Check,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import Link from "next/link";
import { useRouter } from "next/navigation";

const ASSET_CONFIG = {
  USDT: {
    symbol: "₮",
    name: "Tether",
    precision: 2,
    network: "TRC20",
    address: "T9zBNo8W9Gxp3K1p8uVpLq3n4Xj",
  },
  BTC: {
    symbol: "₿",
    name: "Bitcoin",
    precision: 8,
    network: "BTC Mainnet",
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493",
  },
  ETH: {
    symbol: "Ξ",
    name: "Ethereum",
    precision: 8,
    network: "ERC20",
    address: "0x742d35Cc6634C0532925a3b844Bc454",
  },
  SOL: {
    symbol: "◎",
    name: "Solana",
    precision: 4,
    network: "SPL",
    address: "6dnNpxS9Y6dnNpxS9Y6dnNpxS9Y",
  },
};

const variants = {
  item: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
};

export default function TradePage() {
  const router = useRouter();
  const {
    balances,
    bankAccounts,
    handleWithdrawal,
    handleFunding,
    addBankAccount,
  } = useBanking();

  // Flow State
  const [tradeType, setTradeType] = useState("sell"); // 'buy' or 'sell'
  const [step, setStep] = useState(1);
  const [asset, setAsset] = useState("USDT");
  const [amount, setAmount] = useState(""); // Crypto amount if Sell, Naira amount if Buy
  const [selectedBankId, setSelectedBankId] = useState("");

  // New Bank State
  const [newBankData, setNewBankData] = useState({
    bankName: "",
    accountNumber: "",
  });

  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- Logic ---
  const rate = staticRates[asset]?.NGN || 0;
  const numAmount = parseFormattedNumber(amount || "0");

  const nairaValue = tradeType === "buy" ? numAmount : numAmount * rate;
  const cryptoReceived = tradeType === "buy" ? numAmount / rate : numAmount;

  // Internal Balance Check for Buying
  const hasSufficientNaira = (balances.NGN || 0) >= nairaValue;

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/,/g, "");
    if (val.includes(".")) {
      const [whole, decimal] = val.split(".");
      const prec = tradeType === "buy" ? 2 : ASSET_CONFIG[asset].precision;
      if (decimal && decimal.length > prec) return;
    }
    setAmount(val.replace(/[^\d.]/g, ""));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const finishTrade = async () => {
    // Validation for new bank account
    if (tradeType === "sell" && selectedBankId === "new") {
      if (!newBankData.bankName || !newBankData.accountNumber) {
        toast.error("Please fill in the new bank account details");
        return;
      }
      // Optionally save to context
      addBankAccount(newBankData);
    }

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));

    if (tradeType === "sell") {
      handleFunding(nairaValue, "NGN");
      toast.success("Trade request received. Naira credited to your balance.");
    } else {
      handleWithdrawal(nairaValue, "NGN");
      handleFunding(cryptoReceived, asset);
      toast.success(
        `${cryptoReceived.toFixed(
          ASSET_CONFIG[asset].precision
        )} ${asset} added to your wallet.`
      );
    }

    setIsProcessing(false);
    setStep(4);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Trade Assets
          </h1>
          <p className="text-slate-500">
            Securely buy or sell digital assets via your Kambit wallet.
          </p>
        </div>
      </div>

      {step === 1 && (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setTradeType("sell");
              setAmount("");
            }}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              tradeType === "sell"
                ? "bg-white dark:bg-slate-800 shadow-md text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Sell Crypto
          </button>
          <button
            onClick={() => {
              setTradeType("buy");
              setAmount("");
            }}
            className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
              tradeType === "buy"
                ? "bg-white dark:bg-slate-800 shadow-md text-indigo-600"
                : "text-slate-500"
            }`}
          >
            Buy Crypto
          </button>
        </div>
      )}

      {step < 4 && (
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= i
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                }`}
              >
                {step > i ? <Check className="w-4 h-4" /> : i}
              </div>
              {i < 3 && (
                <div
                  className={`w-12 h-0.5 ${
                    step > i
                      ? "bg-indigo-600"
                      : "bg-slate-200 dark:bg-slate-800"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Amount Configuration */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.item}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b">
                <CardTitle className="font-heading">
                  {tradeType === "sell" ? "Sell Crypto" : "Buy Crypto"}
                </CardTitle>
                <CardDescription>
                  {tradeType === "buy"
                    ? "Enter the Naira amount to spend from your wallet."
                    : "Enter the amount of crypto to sell for Naira."}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      Asset
                    </label>
                    <Select value={asset} onValueChange={setAsset}>
                      <SelectTrigger className="h-14 font-bold text-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(ASSET_CONFIG).map((c) => (
                          <SelectItem key={c} value={c}>
                            {c} - {ASSET_CONFIG[c].name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                      {tradeType === "buy"
                        ? "Amount (NGN)"
                        : `Amount (${asset})`}
                    </label>
                    <div className="relative">
                      <Input
                        value={formatNumberWithCommas(amount)}
                        onChange={handleAmountChange}
                        placeholder="0.00"
                        className="h-14 font-mono font-bold text-xl pl-12"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        {tradeType === "buy" ? "₦" : ASSET_CONFIG[asset].symbol}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl border flex justify-between items-center ${
                    tradeType === "buy"
                      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"
                      : "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      tradeType === "buy"
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-indigo-700 dark:text-indigo-300"
                    }`}
                  >
                    {tradeType === "buy"
                      ? `Receive to Wallet:`
                      : `Payout to Balance:`}
                  </span>
                  <span
                    className={`text-xl font-heading font-bold ${
                      tradeType === "buy"
                        ? "text-emerald-900 dark:text-white"
                        : "text-indigo-900 dark:text-white"
                    }`}
                  >
                    {tradeType === "buy"
                      ? `${cryptoReceived.toLocaleString(undefined, {
                          maximumFractionDigits: ASSET_CONFIG[asset].precision,
                        })} ${asset}`
                      : `₦${nairaValue.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`}
                  </span>
                </div>

                <Button
                  className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 font-bold text-lg rounded-2xl"
                  disabled={!amount}
                  onClick={nextStep}
                >
                  Continue <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* STEP 2: Order Summary */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.item}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              {tradeType === "sell" ? (
                <>
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="font-heading">
                      Transfer {asset}
                    </CardTitle>
                    <CardDescription>
                      Send exactly {amount} {asset} to the secure escrow address
                      below.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6 text-center">
                    <div className="p-4 bg-white rounded-2xl border-4 border-slate-50 inline-block shadow-inner">
                      <QRCode value={ASSET_CONFIG[asset].address} size={180} />
                    </div>
                    <div className="space-y-2 text-left">
                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Escrow {ASSET_CONFIG[asset].network} Address
                      </p>
                      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                        <code className="text-xs font-bold truncate text-indigo-600 mr-2">
                          {ASSET_CONFIG[asset].address}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            copyToClipboard(ASSET_CONFIG[asset].address)
                          }
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        className="h-14 font-bold"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="h-14 bg-indigo-600 font-bold"
                      >
                        I have sent it
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader>
                    <CardTitle className="font-heading">Review Order</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl space-y-4 border">
                      <div className="flex justify-between border-b dark:border-slate-800 pb-3">
                        <span className="text-sm text-slate-500">Asset</span>
                        <span className="font-bold">
                          {asset} ({ASSET_CONFIG[asset].name})
                        </span>
                      </div>
                      <div className="flex justify-between border-b dark:border-slate-800 pb-3">
                        <span className="text-sm text-slate-500">
                          You Receive
                        </span>
                        <span className="font-bold text-emerald-600">
                          {cryptoReceived.toFixed(
                            ASSET_CONFIG[asset].precision
                          )}{" "}
                          {asset}
                        </span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-sm text-slate-500">
                          Total Cost
                        </span>
                        <span className="font-bold text-indigo-600">
                          ₦{nairaValue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        className="h-14 font-bold"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="h-14 bg-indigo-600 font-bold"
                      >
                        Proceed
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        )}

        {/* STEP 3: Payment/Settlement Selection */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.item}
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
              {tradeType === "sell" ? (
                <>
                  <CardHeader>
                    <CardTitle className="font-heading">
                      Payout Account
                    </CardTitle>
                    <CardDescription>
                      Where should we send your Naira payout?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <Select
                        value={selectedBankId}
                        onValueChange={setSelectedBankId}
                      >
                        <SelectTrigger className="h-14">
                          <SelectValue placeholder="Select Destination Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {bankAccounts.map((b) => (
                            <SelectItem key={b.id} value={b.id.toString()}>
                              {b.bankName} ({b.accountNumber})
                            </SelectItem>
                          ))}
                          <SelectItem
                            value="new"
                            className="text-indigo-600 font-bold"
                          >
                            + Use a new bank account
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <AnimatePresence>
                        {selectedBankId === "new" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-4 pt-2"
                          >
                            <div className="grid grid-cols-1 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400">
                                  Bank Name
                                </label>
                                <Input
                                  placeholder="e.g. GTBank, Zenith"
                                  value={newBankData.bankName}
                                  onChange={(e) =>
                                    setNewBankData({
                                      ...newBankData,
                                      bankName: e.target.value,
                                    })
                                  }
                                  className="h-12"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-400">
                                  Account Number
                                </label>
                                <Input
                                  placeholder="10-digit number"
                                  value={newBankData.accountNumber}
                                  onChange={(e) =>
                                    setNewBankData({
                                      ...newBankData,
                                      accountNumber: e.target.value,
                                    })
                                  }
                                  className="h-12 font-mono"
                                />
                              </div>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Info className="h-4 w-4 text-blue-500" />
                              <p className="text-[11px] text-blue-600 dark:text-blue-400">
                                This account will be used for this transaction
                                only unless you save it in your profile.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <Button
                      onClick={finishTrade}
                      disabled={!selectedBankId || isProcessing}
                      className="w-full h-16 bg-indigo-600 font-bold text-lg rounded-2xl"
                    >
                      {isProcessing
                        ? "Processing..."
                        : "Confirm & Finish Trade"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                  </CardContent>
                </>
              ) : (
                <>
                  <CardHeader className="text-center">
                    <CardTitle className="font-heading">
                      Complete Purchase
                    </CardTitle>
                    <CardDescription>
                      Confirm deduction from your Naira Wallet.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {hasSufficientNaira ? (
                      <div className="space-y-6">
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center space-y-2">
                          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                            Available Balance
                          </p>
                          <p className="text-3xl font-heading font-bold text-indigo-900 dark:text-white">
                            ₦{(balances.NGN || 0).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-between items-center px-2">
                          <span className="text-sm text-slate-500 font-medium">
                            Order Total:
                          </span>
                          <span className="text-lg font-bold">
                            ₦{nairaValue.toLocaleString()}
                          </span>
                        </div>
                        <Button
                          onClick={finishTrade}
                          disabled={isProcessing}
                          className="w-full h-16 bg-indigo-600 font-bold text-lg rounded-2xl shadow-lg"
                        >
                          Confirm & Buy Now
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6 text-center">
                        <div className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-2xl border border-rose-100 dark:border-rose-800 space-y-4">
                          <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-rose-900">
                              Insufficient Balance
                            </h3>
                            <p className="text-sm text-rose-600">
                              You need ₦{nairaValue.toLocaleString()} to
                              complete this trade.
                            </p>
                          </div>
                        </div>
                        <Link href="/dashboard/fund-account" className="block">
                          <Button className="w-full h-16 bg-slate-900 dark:bg-white dark:text-slate-900 font-bold text-lg rounded-2xl">
                            Fund Your Account
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full text-slate-500"
                          onClick={prevStep}
                        >
                          Go Back
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        )}

        {/* STEP 4: Success Message */}
        {step === 4 && (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">
                Success!
              </h2>
              <p className="text-slate-500 max-w-sm mx-auto">
                {tradeType === "sell"
                  ? "We've received your request. Naira will hit your bank account once the crypto is confirmed."
                  : `You've successfully purchased ${cryptoReceived.toFixed(
                      ASSET_CONFIG[asset].precision
                    )} ${asset}. Your wallet has been updated.`}
              </p>
            </div>
            <div className="flex flex-col gap-3 max-w-xs mx-auto pt-6">
              <Button
                onClick={() => setStep(1)}
                className="h-14 font-bold bg-indigo-600"
              >
                New Trade
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
                className="h-14 font-bold"
              >
                Return to Dashboard
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
