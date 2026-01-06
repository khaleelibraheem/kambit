"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  QrCode, Building2, Wallet, Copy, Check, 
  Info, Zap, Share2, Download, ShieldCheck, 
  BadgeCheck, Landmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import QRCode from "react-qr-code";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ASSET_CONFIG = {
  USDT: { symbol: "₮", name: "Tether", network: "TRC20", address: "T9zBNo8W9Gxp3K1p8uVpLq3n4Xj" },
  BTC: { symbol: "₿", name: "Bitcoin", network: "BTC Mainnet", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493" },
  ETH: { symbol: "Ξ", name: "Ethereum", network: "ERC20", address: "0x742d35Cc6634C0532925a3b844Bc454" },
  SOL: { symbol: "◎", name: "Solana", network: "SPL", address: "6dnNpxS9Y6dnNpxS9Y6dnNpxS9Y" },
};

// Mock virtual bank details for the user
const VIRTUAL_BANK = {
  bankName: "Kuda Microfinance Bank",
  accountNumber: "2014495521",
  accountName: "KAMBIT / JOHN DOE"
};

export default function ReceivePage() {
  const [selectedAsset, setSelectedAsset] = useState("USDT");
  const [activeTab, setActiveTab] = useState("crypto");
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById("receive-qr");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 300, 300);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `kambit-receive-${selectedAsset}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 px-4">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Receive Money</h1>
        <p className="text-slate-500">Generate QR codes or share details to receive funds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Main Receive Card */}
        <div className="lg:col-span-7">
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 h-14 bg-slate-100 dark:bg-slate-900 p-1 rounded-none border-b">
                <TabsTrigger value="crypto" className="font-bold text-xs uppercase tracking-widest">Crypto Address</TabsTrigger>
                <TabsTrigger value="bank" className="font-bold text-xs uppercase tracking-widest">Bank Details</TabsTrigger>
              </TabsList>

              <CardContent className="p-6 sm:p-10 space-y-8">
                
                {/* CRYPTO RECEIVE SECTION */}
                <TabsContent value="crypto" className="mt-0 space-y-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Select Asset to Receive</label>
                      <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                        <SelectTrigger className="h-14 font-bold text-lg rounded-2xl border-slate-200 dark:border-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(ASSET_CONFIG).map(code => (
                            <SelectItem key={code} value={code} className="font-bold">{code} - {ASSET_CONFIG[code].name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* QR Code Container */}
                    <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                      <div className="p-4 bg-white rounded-3xl shadow-xl border-4 border-white mb-6">
                        <QRCode 
                          id="receive-qr"
                          value={ASSET_CONFIG[selectedAsset].address} 
                          size={200} 
                          level="H"
                        />
                      </div>
                      <div className="text-center space-y-1">
                        <BadgeCheck className="w-5 h-5 text-emerald-500 mx-auto" />
                        <p className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">
                          {ASSET_CONFIG[selectedAsset].network} Network
                        </p>
                      </div>
                    </div>

                    {/* Address Display */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Your Wallet Address</label>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl font-mono text-xs break-all border border-transparent dark:border-slate-700 text-slate-600 dark:text-slate-300">
                          {ASSET_CONFIG[selectedAsset].address}
                        </div>
                        <Button 
                          variant="secondary" 
                          className="h-auto px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white"
                          onClick={() => copyToClipboard(ASSET_CONFIG[selectedAsset].address, "Address")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-12 rounded-xl font-bold border-slate-200" onClick={downloadQR}>
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                    <Button variant="outline" className="h-12 rounded-xl font-bold border-slate-200">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                </TabsContent>

                {/* BANK RECEIVE SECTION */}
                <TabsContent value="bank" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
                     <div className="absolute top-0 right-0 p-6 opacity-10"><Landmark className="w-32 h-32" /></div>
                     <div className="relative z-10 space-y-6">
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Virtual Naira Account</p>
                          <h3 className="text-2xl font-heading font-bold">{VIRTUAL_BANK.bankName}</h3>
                        </div>

                        <div className="space-y-4 pt-4">
                           <div className="flex justify-between items-center group cursor-pointer" onClick={() => copyToClipboard(VIRTUAL_BANK.accountNumber, "Account Number")}>
                              <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-indigo-300 uppercase">Account Number</p>
                                <p className="text-3xl font-mono font-bold tracking-widest">{VIRTUAL_BANK.accountNumber}</p>
                              </div>
                              <Copy className="w-5 h-5 text-indigo-300 opacity-50 group-hover:opacity-100 transition-opacity" />
                           </div>

                           <div className="space-y-0.5">
                              <p className="text-[10px] font-bold text-indigo-300 uppercase">Account Name</p>
                              <p className="text-sm font-bold uppercase tracking-tight">{VIRTUAL_BANK.accountName}</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <Alert className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-800">
                    <Zap className="h-4 w-4 text-emerald-600 fill-emerald-600" />
                    <AlertDescription className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed font-medium">
                      Transfers to this virtual account are credited to your Kambit Naira wallet instantly. 
                      Supports all Nigerian bank apps and USSD.
                    </AlertDescription>
                  </Alert>
                </TabsContent>

              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Right: Security & Tips */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5"><ShieldCheck className="w-24 h-24" /></div>
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Receive Safely
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-4">
                  {[
                    { title: "Verify Network", desc: `Ensure sender uses the ${ASSET_CONFIG[selectedAsset].network} network.` },
                    { title: "Naira Payouts", desc: "Local transfers arrive within 60 seconds on average." },
                    { title: "Zero Limits", desc: "There is no limit to how much you can receive on Kambit." },
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-5 w-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 font-bold text-[10px]">{i+1}</div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200">{tip.title}</p>
                        <p className="text-[11px] text-slate-500 leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-4">
             <Info className="w-5 h-5 text-indigo-600 flex-shrink-0" />
             <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
               Funds are deposited directly into your Kambit wallet balances. You will receive a notification and email once a deposit is confirmed on the blockchain or bank network.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}