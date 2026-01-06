"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Landmark,
  Trash2,
  BadgeCheck,
  Search,
  Building2,
  Info,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useBanking } from "@/contexts/BankingContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function SavedBanksPage() {
  const { bankAccounts, addBankAccount, removeBankAccount } = useBanking();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountName: "",
  });

  const handleAddBank = () => {
    if (!formData.bankName || formData.accountNumber.length < 10) {
      return toast.error("Please provide valid bank details");
    }
    addBankAccount({ ...formData, id: Date.now(), accountType: "Savings" });
    toast.success("Bank account linked");
    setIsAddModalOpen(false);
    setFormData({ bankName: "", accountNumber: "", accountName: "" });
  };

  const filteredBanks = bankAccounts.filter((bank) =>
    bank.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      variants={variants.container}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6 pb-20"
    >
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Saved Banks
          </h1>
          <p className="text-slate-500 text-sm">
            Settlement destinations for your Kambit wallet.
          </p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/20 flex gap-2">
              <Plus size={18} /> Add Account
            </Button>
          </DialogTrigger>
          {/* Add Bank Dialog remains high-quality as before */}
          <DialogContent className="rounded-[2rem] border-slate-200 dark:border-slate-800 p-8">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl font-bold">
                Link Account
              </DialogTitle>
              <DialogDescription>
                Enter your NGN bank details for instant payouts.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Bank
                </label>
                <Input
                  placeholder="GTBank, Kuda, etc."
                  className="h-12 rounded-xl"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Account Number
                </label>
                <Input
                  placeholder="10 Digits"
                  maxLength={10}
                  className="h-12 rounded-xl font-mono"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accountNumber: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Full Name
                </label>
                <Input
                  placeholder="Account Holder Name"
                  className="h-12 rounded-xl"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddBank}
                className="w-full h-14 bg-indigo-600 rounded-2xl font-bold text-white"
              >
                Link Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main List Card */}
      <Card className="border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-950">
        <div className="p-2 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search your banks..."
              className="h-11 pl-10 bg-transparent border-none focus-visible:ring-0 font-medium text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <CardContent className="p-0">
          <AnimatePresence mode="popLayout">
            {filteredBanks.length > 0 ? (
              <div className="divide-y divide-slate-50 dark:divide-slate-900">
                {filteredBanks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    variants={variants.item}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -10 }}
                    className="group flex items-center justify-between p-4 md:p-6 hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      {/* Professional Icon Placeholder (Initials or Landmark) */}
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 dark:border-indigo-900/30">
                        <Landmark size={20} />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-white tracking-tight">
                            {bank.bankName}
                          </h4>
                          <BadgeCheck className="w-3.5 h-3.5 text-indigo-500 fill-indigo-50" />
                        </div>
                        <p className="font-mono text-xs text-slate-500 font-medium">
                          {bank.accountNumber.replace(
                            /(\d{3})(\d{3})(\d{4})/,
                            "$1 $2 $3"
                          )}
                        </p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-0.5">
                          {bank.accountName || "Settlement Account"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="hidden sm:block px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                        {bank.accountType || "Savings"}
                      </div>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-full h-10 w-10 transition-colors"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[2rem] border-slate-200">
                          <DialogHeader className="space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                              <AlertTriangle size={24} />
                            </div>
                            <DialogTitle className="font-heading text-xl font-bold">
                              Delete Account?
                            </DialogTitle>
                            <DialogDescription>
                              You are about to remove{" "}
                              <span className="font-bold text-slate-900">
                                {bank.bankName}
                              </span>
                              . This cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-3 mt-4">
                            <DialogClose asChild>
                              <Button
                                variant="outline"
                                className="h-12 rounded-xl flex-1 font-bold"
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              onClick={() => {
                                removeBankAccount(bank.id);
                                toast.success("Bank removed");
                              }}
                              className="h-12 rounded-xl flex-1 bg-rose-600 hover:bg-rose-700 font-bold text-white"
                            >
                              Confirm
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <Building2 className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No banks found</p>
                <Button
                  variant="link"
                  onClick={() => setSearchQuery("")}
                  className="text-indigo-600 font-bold text-xs"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Modern Info Banner */}
      <div className="bg-slate-900 dark:bg-slate-900 rounded-[2rem] p-6 text-white flex items-center gap-5 shadow-2xl">
        <div className="p-3 bg-indigo-600 rounded-2xl">
          <ShieldCheck size={24} />
        </div>
        <div className="space-y-1">
          <p className="font-bold text-sm">Secure Settlement Protocol</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Linked accounts are encrypted. We only share details with authorized
            settlement partners for NGN payouts.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
