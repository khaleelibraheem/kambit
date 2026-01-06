"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Download,
  Search,
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/app/hooks/use-media-query";

// Kambit Animation Variants
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

const createMockTransactions = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    type: i % 3 === 0 ? "sent" : i % 3 === 1 ? "received" : "trade",
    amount: Math.floor(Math.random() * 100000),
    currency: ["USDT", "BTC", "ETH", "NGN", "SOL"][
      Math.floor(Math.random() * 5)
    ],
    recipient: "John Doe",
    sender: "Sarah Smith",
    status: Math.random() > 0.2 ? "completed" : "pending",
    date: new Date(2024, 2, Math.floor(Math.random() * 30)).toISOString(),
  }));
};

const statusConfig = {
  completed: {
    color:
      "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30",
    icon: CheckCircle2,
  },
  pending: {
    color:
      "text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30",
    icon: Clock,
  },
  failed: {
    color:
      "text-rose-600 bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30",
    icon: XCircle,
  },
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setTransactions(createMockTransactions());
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Reusable Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${config.color}`}
      >
        <Icon className="h-3 w-3" />
        {status}
      </span>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants.container}
      className="max-w-6xl mx-auto space-y-8 pb-20"
    >
      {/* Header Section */}
      <motion.div
        variants={variants.item}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Activity Feed
          </h1>
          <p className="text-slate-500">
            Track your Kambit settlements and asset movements.
          </p>
        </div>
        <Button
          variant="outline"
          className="h-12 rounded-xl font-bold border-slate-200 dark:border-slate-800 hover:bg-slate-50"
        >
          <Download className="mr-2 h-4 w-4" /> Export CSV
        </Button>
      </motion.div>

      {/* Modern Filter Bar */}
      <motion.div variants={variants.item}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-slate-100 dark:bg-slate-900/50 p-2 rounded-[2rem] border border-slate-200 dark:border-slate-800">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm"
            />
          </div>
          <div className="md:col-span-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm font-bold text-xs uppercase tracking-widest text-slate-500">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-12 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm font-bold text-xs uppercase tracking-widest text-slate-500">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="all">All Activities</SelectItem>
                <SelectItem value="sent">Sent Assets</SelectItem>
                <SelectItem value="received">Received Assets</SelectItem>
                <SelectItem value="trade">Trades</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Button
              variant="ghost"
              className="w-full h-12 rounded-2xl font-bold text-slate-500 flex gap-2"
            >
              <Calendar className="h-4 w-4" /> Dates
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div variants={variants.item}>
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] overflow-hidden">
          <CardContent className="p-0">
            {isMobile ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTransactions.map((tx) => (
                  <div key={tx.id} className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl ${
                            tx.type === "received"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownLeft className="h-5 w-5" />
                          ) : (
                            <ArrowUpRight className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {tx.type === "sent" ? tx.recipient : tx.sender}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {new Date(tx.date).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <StatusBadge status={tx.status} />
                    </div>
                    <div className="flex justify-between items-end bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Amount
                      </span>
                      <p
                        className={`font-mono font-bold text-lg ${
                          tx.type === "received"
                            ? "text-emerald-600"
                            : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {tx.type === "sent" ? "-" : "+"}
                        {tx.amount.toLocaleString()}{" "}
                        <span className="text-xs">{tx.currency}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                    <TableRow className="border-slate-100 dark:border-slate-800">
                      <TableHead className="py-5 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Date
                      </TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Activity
                      </TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Status
                      </TableHead>
                      <TableHead className="text-right px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx) => (
                      <TableRow
                        key={tx.id}
                        className="border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                      >
                        <TableCell className="px-6 py-5">
                          <p className="font-medium text-slate-900 dark:text-white">
                            {new Date(tx.date).toLocaleDateString()}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            {new Date(tx.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-xl ${
                                tx.type === "received"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {tx.type === "received" ? (
                                <ArrowDownLeft className="h-4 w-4" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-sm capitalize">
                                {tx.type}
                              </p>
                              <p className="text-xs text-slate-500">
                                {tx.type === "sent"
                                  ? `To: ${tx.recipient}`
                                  : `From: ${tx.sender}`}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={tx.status} />
                        </TableCell>
                        <TableCell className="text-right px-6">
                          <p
                            className={`font-mono font-bold text-base ${
                              tx.type === "received"
                                ? "text-emerald-600"
                                : "text-slate-900 dark:text-white"
                            }`}
                          >
                            {tx.type === "sent" ? "-" : "+"}
                            {tx.amount.toLocaleString()}
                          </p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {tx.currency}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <motion.div
          variants={variants.item}
          className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
        >
          <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Search className="h-6 w-6 text-slate-300" />
          </div>
          <h3 className="font-heading text-lg font-bold">
            No activities found
          </h3>
          <p className="text-slate-500 text-sm mb-6">
            Try adjusting your filters or search terms.
          </p>
          <Button
            variant="outline"
            className="rounded-xl font-bold"
            onClick={() => {
              setStatusFilter("all");
              setTypeFilter("all");
              setSearchQuery("");
            }}
          >
            Clear All Filters
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
