"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Wifi,
  Zap,
  Tv,
  ShieldCheck,
  Info,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/utils";

const UTILITY_PROVIDERS = {
  airtime: [
    { id: "mtn", name: "MTN Nigeria", icon: "🟡" },
    { id: "airtel", name: "Airtel", icon: "🔴" },
    { id: "glo", name: "Glo", icon: "🟢" },
    { id: "9mobile", name: "9mobile", icon: "🟢" },
  ],
  data: [
    { id: "mtn-data", name: "MTN Data", icon: "🟡" },
    { id: "airtel-data", name: "Airtel Data", icon: "🔴" },
    { id: "glo-data", name: "Glo Data", icon: "🟢" },
    { id: "9mobile-data", name: "9mobile Data", icon: "🟢" },
  ],
  electricity: [
    { id: "ekedc", name: "EKEDC (Eko Electricity)" },
    { id: "ikedc", name: "IKEDC (Ikeja Electricity)" },
    { id: "aedc", name: "AEDC (Abuja Electricity)" },
    { id: "kedco", name: "KEDCO (Kano Electricity)" },
    { id: "phed", name: "PHED (Port Harcourt)" },
  ],
  cable: [
    { id: "dstv", name: "DSTV" },
    { id: "gotv", name: "GOtv" },
    { id: "startimes", name: "StarTimes" },
  ],
};

const CATEGORIES = [
  { id: "airtime", name: "Airtime", icon: Smartphone },
  { id: "data", name: "Data", icon: Wifi },
  { id: "cable", name: "Cable", icon: Tv },
  { id: "electricity", name: "Electricity", icon: Zap },
];

export default function UtilitiesPage() {
  const { balances, handleWithdrawal } = useBanking();
  const [activeTab, setActiveTab] = useState("airtime");

  // Shared State
  const [provider, setProvider] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Electricity Specific State
  const [meterType, setMeterType] = useState("");
  const [saveMeter, setSaveMeter] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const currentBalance = balances["NGN"] || 0;

  useEffect(() => {
    if (activeTab === "electricity" && beneficiary.length >= 10) {
      setIsVerifying(true);
      const timer = setTimeout(() => {
        setCustomerName("ADEDAYO KOLAWOLE JOHNSON");
        setIsVerifying(false);
        toast.success("Meter Number Verified");
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setCustomerName("");
    }
  }, [beneficiary, activeTab]);

  const handlePayment = async () => {
    const numAmount = parseFormattedNumber(amount);

    if (!numAmount || numAmount < 100)
      return toast.error("Minimum payment is ₦100");
    if (numAmount > currentBalance)
      return toast.error("Insufficient NGN balance");
    if (!provider || !beneficiary) return toast.error("Please fill all fields");

    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const success = handleWithdrawal(numAmount, "NGN");

      if (success) {
        toast.success(`${activeTab.toUpperCase()} purchase successful!`);
        setAmount("");
        setBeneficiary("");
        setCustomerName("");
      }
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 pb-20">
      {/* Header */}
      <div className="space-y-1 text-left">
        <h1 className="font-heading text-3xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Bills & Utilities
        </h1>
        <p className="text-slate-500 text-sm sm:text-lg">
          Pay for essential services instantly from your Naira wallet.
        </p>
      </div>

      {/* Pill Toggle Navigation - Scrollable on Mobile */}
      <div className="flex justify-center sm:justify-start">
        <div className="inline-flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl gap-1 border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setProvider("");
                setBeneficiary("");
                setAmount("");
              }}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === cat.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Form Section */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-5 sm:p-8 space-y-5 sm:space-y-6">
              {/* Provider Selection */}
              <div className="space-y-2">
                <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">
                  Select{" "}
                  {activeTab === "electricity" ? "Power Company" : "Provider"}
                </label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm sm:text-base font-medium">
                    <SelectValue placeholder={`Select ${activeTab} provider`} />
                  </SelectTrigger>
                  <SelectContent>
                    {UTILITY_PROVIDERS[activeTab].map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        <div className="flex items-center gap-2">
                          {p.icon && <span>{p.icon}</span>}
                          <span>{p.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Electricity Specific: Meter Type */}
              {activeTab === "electricity" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">
                    Select Meter Type
                  </label>
                  <Select value={meterType} onValueChange={setMeterType}>
                    <SelectTrigger className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm sm:text-base">
                      <SelectValue placeholder="Select Meter type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="postpaid">Postpaid</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
              )}

              {/* Identifier */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest">
                    {activeTab === "electricity"
                      ? "Meter Number"
                      : activeTab === "cable"
                        ? "SmartCard Number"
                        : "Phone Number"}
                  </label>
                  <button className="text-[10px] sm:text-[11px] font-bold text-indigo-600 hover:underline">
                    Choose Beneficiary
                  </button>
                </div>
                <div className="relative">
                  <Input
                    placeholder={
                      activeTab === "electricity"
                        ? "Enter meter number"
                        : "080XXXXXXXX"
                    }
                    value={beneficiary}
                    onChange={(e) =>
                      setBeneficiary(e.target.value.replace(/\D/g, ""))
                    }
                    className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-base sm:text-lg font-medium"
                  />
                  {isVerifying && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-indigo-500 border-t-transparent" />
                    </div>
                  )}
                </div>
              </div>

              {/* Checkbox */}
              <div className="flex items-center space-x-2 px-1">
                <Checkbox
                  id="save"
                  checked={saveMeter}
                  onCheckedChange={(val) => setSaveMeter(!!val)}
                  className="h-4 w-4 sm:h-5 sm:w-5 border-slate-300 data-[state=checked]:bg-indigo-600"
                />
                <label
                  htmlFor="save"
                  className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-400 cursor-pointer"
                >
                  Save {activeTab === "electricity" ? "meter" : "beneficiary"}{" "}
                  number
                </label>
              </div>

              {/* Verified Name */}
              {(customerName || isVerifying) && (
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">
                    Customer Name
                  </label>
                  <div className="h-12 sm:h-14 flex items-center px-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl text-indigo-700 dark:text-indigo-400 text-sm sm:text-base font-bold border border-indigo-100 dark:border-indigo-900/30">
                    {isVerifying ? "Verifying..." : customerName}
                  </div>
                </div>
              )}

              {/* Amount & Email Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">
                    Amount (₦)
                  </label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={formatNumberWithCommas(amount)}
                      onChange={(e) =>
                        setAmount(e.target.value.replace(/[^\d.]/g, ""))
                      }
                      placeholder="0.00"
                      className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-lg sm:text-xl font-bold pl-10"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                      ₦
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] sm:text-[11px] font-black uppercase text-slate-400 tracking-widest px-1">
                    Email address
                  </label>
                  <Input
                    type="email"
                    placeholder="Email for receipt"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 sm:h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl flex gap-3 border border-slate-100 dark:border-slate-800">
                <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-[10px] sm:text-[11px] text-slate-500 leading-relaxed font-medium">
                  {activeTab === "electricity"
                    ? "Tokens are generated instantly."
                    : "Transactions are processed instantly."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-5">
          <Card className="bg-slate-900 text-white border-none shadow-2xl rounded-2xl overflow-hidden lg:sticky lg:top-8">
            <CardHeader className="p-5 sm:p-6 pb-4 border-b border-slate-800/50 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">
                <ShieldCheck className="w-4 h-4" /> Secure Payment
              </div>
              <CardTitle className="text-lg sm:text-xl font-bold tracking-tight">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium">Provider</span>
                  <span className="font-bold text-slate-200">
                    {UTILITY_PROVIDERS[activeTab].find((p) => p.id === provider)
                      ?.name || "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium">Recipient</span>
                  <span className="font-mono font-bold text-slate-200 truncate ml-4">
                    {beneficiary || "-"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium">Fee</span>
                  <span className="font-bold text-emerald-500">₦0.00</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-1 text-center sm:text-left">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">
                  Total to Pay
                </p>
                <div className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tighter truncate">
                  ₦{amount ? Number(amount).toLocaleString() : "0.00"}
                </div>
              </div>

              <Button
                className="w-full h-14 sm:h-16 bg-indigo-600 hover:bg-indigo-700 font-bold text-base sm:text-lg rounded-2xl transition-all shadow-lg shadow-indigo-500/20 group"
                disabled={
                  isProcessing ||
                  !amount ||
                  !beneficiary ||
                  !provider ||
                  (activeTab === "electricity" && !customerName)
                }
                onClick={handlePayment}
              >
                {isProcessing
                  ? "Processing..."
                  : `Pay ₦${amount ? Number(amount).toLocaleString() : ""}`}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 uppercase font-black tracking-[0.15em]">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> Instant
                Settlement
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
