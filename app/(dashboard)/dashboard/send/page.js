"use client";

import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { motion, AnimatePresence } from "framer-motion";
import {
  SendHorizontal,
  Building2,
  Wallet,
  ArrowRight,
  ShieldCheck,
  Copy,
  Check,
  Info,
  Zap,
  User,
  Scan,
  X,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";
import { formatNumberWithCommas, parseFormattedNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import staticRates from "@/lib/mock-data/static-rates";
import { Html5Qrcode } from "html5-qrcode";

const ASSET_CONFIG = {
  NGN: { symbol: "₦", name: "Nigerian Naira", precision: 2 },
  USDT: { symbol: "₮", name: "Tether", precision: 2 },
  BTC: { symbol: "₿", name: "Bitcoin", precision: 8 },
  ETH: { symbol: "Ξ", name: "Ethereum", precision: 8 },
  SOL: { symbol: "◎", name: "Solana", precision: 4 },
};

export default function SendPage() {
  const router = useRouter();
  const { balances, handleWithdrawal } = useBanking();
  const scannerRef = useRef(null);

  const [selectedAsset, setSelectedAsset] = useState("NGN");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const [bankDetails, setBankDetails] = useState({
    bank: "",
    account: "",
    name: "",
  });
  const [cryptoDetails, setCryptoDetails] = useState({
    address: "",
    network: "native",
  });

  const currentBalance = balances[selectedAsset] || 0;
  const numAmount = parseFormattedNumber(amount || "0");
  const rate = staticRates[selectedAsset]?.NGN || 0;
  const nairaValue = selectedAsset === "NGN" ? numAmount : numAmount * rate;

  // --- QR SCANNER LOGIC ---
  useEffect(() => {
    let html5QrCode;

    if (isScannerOpen) {
      const timer = setTimeout(() => {
        html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        html5QrCode
          .start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              // Logic to clean address (removes ethereum: or bitcoin: prefixes)
              const cleanAddress = decodedText.includes(":")
                ? decodedText.split(":")[1].split("?")[0]
                : decodedText;

              setCryptoDetails((prev) => ({ ...prev, address: cleanAddress }));
              toast.success("Wallet address scanned!");
              handleCloseScanner(); 
            },
            () => {
              /* ignore silent errors */
            }
          )
          .catch(() => {
            toast.error("Failed to start camera");
            setIsScannerOpen(false);
          });
      }, 300);

      return () => {
        clearTimeout(timer);
        if (html5QrCode) handleCloseScanner();
      };
    }
  }, [isScannerOpen]);

  const handleCloseScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log("Stop error", e);
      }
    }
    setIsScannerOpen(false);
  };

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/,/g, "");
    if (val.includes(".")) {
      const [whole, decimal] = val.split(".");
      if (decimal && decimal.length > ASSET_CONFIG[selectedAsset].precision)
        return;
    }
    setAmount(val.replace(/[^\d.]/g, ""));
  };

  const handleSend = async () => {
    if (numAmount <= 0) return toast.error("Enter a valid amount");
    if (numAmount > currentBalance) return toast.error("Insufficient balance");

    setIsProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 2000));
      handleWithdrawal(numAmount, selectedAsset);
      setStep(3);
    } catch (e) {
      toast.error("Transfer failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Send Money
        </h1>
        <p className="text-slate-500">
          Transfer funds instantly to bank accounts or crypto wallets.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-7 space-y-6">
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <Tabs
                  value={selectedAsset === "NGN" ? "bank" : "crypto"}
                  onValueChange={(v) =>
                    setSelectedAsset(v === "bank" ? "NGN" : "USDT")
                  }
                >
                  <TabsList className="grid grid-cols-2 h-14 bg-slate-100 dark:bg-slate-900 p-1 rounded-none border-b">
                    <TabsTrigger
                      value="bank"
                      className="font-bold text-xs uppercase"
                    >
                      Bank Transfer
                    </TabsTrigger>
                    <TabsTrigger
                      value="crypto"
                      className="font-bold text-xs uppercase"
                    >
                      Crypto Wallet
                    </TabsTrigger>
                  </TabsList>

                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400">
                        Select Asset
                      </label>
                      <Select
                        value={selectedAsset}
                        onValueChange={setSelectedAsset}
                      >
                        <SelectTrigger className="h-12 font-bold">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(ASSET_CONFIG).map((code) => (
                            <SelectItem key={code} value={code}>
                              {code} - {ASSET_CONFIG[code].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedAsset === "NGN" ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Account Number"
                            className="h-12 font-mono"
                            maxLength={10}
                            value={bankDetails.account}
                            onChange={(e) =>
                              setBankDetails({
                                ...bankDetails,
                                account: e.target.value.replace(/\D/g, ""),
                              })
                            }
                          />
                          <Select
                            onValueChange={(v) =>
                              setBankDetails({ ...bankDetails, bank: v })
                            }
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select Bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "GTBank",
                                "Zenith",
                                "Kuda",
                                "Access",
                                "FirstBank",
                              ].map((b) => (
                                <SelectItem key={b} value={b}>
                                  {b}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="relative">
                          <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">
                            Recipient Address
                          </label>
                          <div className="flex gap-2">
                            <Input
                              placeholder={`Paste ${selectedAsset} Address`}
                              className="h-12 font-mono text-xs"
                              value={cryptoDetails.address}
                              onChange={(e) =>
                                setCryptoDetails({
                                  ...cryptoDetails,
                                  address: e.target.value,
                                })
                              }
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsScannerOpen(true)}
                              className="lg:hidden h-12 w-12 flex-shrink-0 border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-950 text-indigo-600"
                            >
                              <Scan className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <label className="text-[10px] font-black uppercase text-slate-400">
                          Amount
                        </label>
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          Balance:{" "}
                          {selectedAsset === "NGN"
                            ? "₦" + balances.NGN.toLocaleString()
                            : balances[selectedAsset] + " " + selectedAsset}
                        </span>
                      </div>
                      <div className="relative">
                        <Input
                          value={formatNumberWithCommas(amount)}
                          onChange={handleAmountChange}
                          placeholder="0.00"
                          className="h-14 text-2xl font-mono font-bold pl-10"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                          {ASSET_CONFIG[selectedAsset].symbol}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 font-bold text-lg rounded-2xl shadow-lg"
                      disabled={!amount || numAmount > currentBalance}
                      onClick={() => setStep(2)}
                    >
                      Review Transaction <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </CardContent>
                </Tabs>
              </Card>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden">
                <CardContent className="p-6 space-y-6">
                  <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Naira Value
                  </p>
                  <p className="text-3xl font-heading font-bold text-indigo-400">
                    ₦
                    {nairaValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </CardContent>
              </Card>
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 leading-relaxed">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase">
                  <ShieldCheck className="w-4 h-4" /> Secure Transfer
                </div>
                <p className="text-xs text-slate-500">
                  Outgoing transfers are processed through Kambit&apos;s
                  verified liquidity nodes. Bank settlements typically take 60
                  seconds.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: CONFIRMATION */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xl mx-auto w-full"
          >
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
              <CardHeader className="text-center border-b bg-slate-50 dark:bg-slate-900/50">
                <CardTitle className="font-heading">Confirm Send</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border space-y-4">
                  <div className="flex justify-between pb-3 border-b dark:border-slate-800">
                    <span className="text-slate-500 text-sm">Amount</span>
                    <span className="font-bold">
                      {selectedAsset === "NGN"
                        ? "₦" + formatNumberWithCommas(amount)
                        : amount + " " + selectedAsset}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-500 text-sm">Value</span>
                    <span className="font-bold text-indigo-600">
                      ₦{nairaValue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="h-14 font-bold"
                  >
                    Back
                  </Button>
                  <Button
                    className="h-14 bg-indigo-600 font-bold"
                    onClick={handleSend}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Sending..." : "Confirm"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20 space-y-6"
          >
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-heading font-bold">
              Sent Successfully!
            </h2>
            <Button
              onClick={() => router.push("/dashboard")}
              className="h-14 font-bold bg-indigo-600 px-10 rounded-xl"
            >
              Return to Dashboard
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- SCANNER OVERLAY --- */}
      <AnimatePresence>
        {isScannerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
          >
            <div className="absolute top-6 right-6 z-[110]">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseScanner}
                className="text-white bg-white/10 rounded-full h-12 w-12"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="w-full max-w-sm space-y-8 text-center text-white">
              <div className="space-y-2">
                <Camera className="w-10 h-10 mx-auto text-indigo-400" />
                <h3 className="text-xl font-bold">Scan QR Code</h3>
                <p className="text-sm text-slate-400">
                  Align the recipient address QR within the frame.
                </p>
              </div>
              <div
                id="reader"
                className="overflow-hidden rounded-3xl border-2 border-indigo-500 bg-slate-900 aspect-square"
              />
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Kambit Secure Scanner
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
