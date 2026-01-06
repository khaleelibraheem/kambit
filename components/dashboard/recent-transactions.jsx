"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

// Kambit Animation Stagger
const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
};

const recentTransactions = [
  {
    id: 1,
    type: "sent",
    amount: 500,
    currency: "USDT",
    recipient: "John Doe",
    status: "completed",
    date: "2024-03-08T10:30:00",
  },
  {
    id: 2,
    type: "received",
    amount: 300,
    currency: "NGN",
    sender: "Kuda Transfer",
    status: "completed",
    date: "2024-03-07T15:45:00",
  },
  {
    id: 3,
    type: "sent",
    amount: 1000,
    currency: "BTC",
    recipient: "External Wallet",
    status: "pending",
    date: "2024-03-07T09:15:00",
  },
  {
    id: 4,
    type: "received",
    amount: 750,
    currency: "USDT",
    sender: "Marie Claire",
    status: "completed",
    date: "2024-03-06T14:20:00",
  },
];

const statusStyles = {
  completed:
    "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30",
  pending:
    "text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30",
  failed:
    "text-rose-600 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30",
};

export function RecentTransactions() {
  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-50 dark:border-slate-900/50 pb-6">
        <div className="space-y-1">
          <CardTitle className="font-heading text-xl font-bold flex items-center gap-2">
            <History className="h-5 w-5 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Latest asset movements
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="rounded-xl font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <Link
            href="/dashboard/transactions"
            className="flex items-center gap-2"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-6">
        <motion.div
          variants={variants.container}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {recentTransactions.map((tx) => (
            <motion.div
              key={tx.id}
              variants={variants.item}
              className="group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 rounded-2xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
            >
              {/* Left: Icon & Description */}
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                    tx.type === "sent"
                      ? "bg-slate-100 text-slate-600"
                      : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30"
                  }`}
                >
                  {tx.type === "sent" ? (
                    <ArrowUpRight className="h-5 w-5" />
                  ) : (
                    <ArrowDownLeft className="h-5 w-5" />
                  )}
                </div>

                <div>
                  <p className="font-bold text-slate-900 dark:text-white truncate max-w-[120px] md:max-w-none">
                    {tx.type === "sent" ? tx.recipient : tx.sender}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    <Clock className="h-3 w-3" />
                    {new Date(tx.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    •
                    {new Date(tx.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Amount & Status */}
              <div className="text-right space-y-1.5">
                <p
                  className={`font-mono font-bold text-base ${
                    tx.type === "sent"
                      ? "text-slate-900 dark:text-white"
                      : "text-emerald-600"
                  }`}
                >
                  {tx.type === "sent" ? "-" : "+"}
                  {tx.amount.toLocaleString()}
                  <span className="text-[10px] ml-1 opacity-60 uppercase font-sans tracking-widest">
                    {tx.currency}
                  </span>
                </p>

                <div
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-black uppercase tracking-tighter ${
                    statusStyles[tx.status] || statusStyles.pending
                  }`}
                >
                  {tx.status === "completed" ? (
                    <CheckCircle2 className="h-2.5 w-2.5" />
                  ) : (
                    <Clock className="h-2.5 w-2.5" />
                  )}
                  {tx.status}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
