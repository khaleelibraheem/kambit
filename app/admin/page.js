"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  FileCheck,
  RefreshCw,
  History,
  FileText,
  TrendingUp,
  ShieldCheck,
  ChevronRight,
  X,
  Menu,
  Settings,
  AlertTriangle,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";

import { useAdmin } from "../hooks/useAdmin";
import Unauthorized from "./components/unauthorized";
import LoadingScreen from "./components/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import ScrollHeader from "./components/scroll-header";
import Link from "next/link";
import Logo from "@/components/shared/logo";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 10, weight: "bold" }, color: "#94a3b8" },
    },
    y: {
      grid: { color: "rgba(226, 232, 240, 0.4)", drawBorder: false },
      ticks: { display: false },
    },
  },
};

const transactionData = {
  labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
  datasets: [
    {
      data: [4200, 6800, 11400, 19300, 15200, 8900, 4800],
      fill: true,
      borderColor: "#6366f1",
      backgroundColor: "rgba(99, 102, 241, 0.03)",
      borderWidth: 2,
      pointRadius: 0,
      tension: 0.4,
    },
  ],
};

const QUICK_ACTIONS = [
  { label: "Users", icon: Users, href: "#" },
  { label: "Activity", icon: Activity, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
  { label: "Alerts", icon: AlertTriangle, href: "#" },
];

const AdminDashboardHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ScrollHeader>
      <div className="max-w-[1800px] mx-auto px-4 md:px-8">
        {/* Main Header Row */}
        <div className="h-20 flex items-center justify-between gap-4">
          {/* Left side: Branding & Context */}
          <div className="flex items-center gap-4">
            <Logo className="scale-90 md:scale-100" />

            <div className="hidden lg:block h-8 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="hidden md:flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Control Center
                </h1>
                <span className="px-2 py-0.5 bg-indigo-600 text-[10px] font-black text-white uppercase tracking-widest rounded-lg shadow-lg shadow-indigo-500/20">
                  Admin
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                System Overview & Management
              </p>
            </div>
          </div>
          {/* Right side: Actions & Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group"
            >
              <LayoutDashboard
                size={14}
                className="text-indigo-600 group-hover:scale-110 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">
                Dashboard
              </span>
              <ExternalLink size={10} className="text-slate-300" />
            </Link>
            {/* Desktop Only Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button className="h-11 px-6 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-black dark:hover:bg-slate-200 font-bold text-sm rounded-xl transition-all flex gap-2">
                <FileText size={16} />
                Generate Report
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-5 w-5 text-indigo-600" />
              ) : (
                <Menu className="h-5 w-5 text-slate-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu - Kambit Style Expandable */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-8 pt-2 space-y-6">
                {/* Mobile Identity Badge */}
                <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Logged in as
                    </p>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      System Administrator
                    </h4>
                  </div>
                  <ShieldCheck className="text-indigo-600 h-6 w-6" />
                </div>

                {/* Mobile Controls Grid */}
                <div className="space-y-3">
                  <p className="px-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {QUICK_ACTIONS.map((action) => (
                      <Link
                        href={action.href}
                        key={action.label}
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full h-16 flex flex-col items-center justify-center gap-1 rounded-2xl border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-indigo-200 transition-all group"
                        >
                          <action.icon className="h-5 w-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">
                            {action.label}
                          </span>
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Report Trigger */}
                <div className="space-y-3 pt-2">
                  <Select defaultValue="today">
                    <SelectTrigger className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-bold text-xs uppercase tracking-widest px-6">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20">
                    Generate System Report
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollHeader>
  );
};

const AdminPanel = () => {
  const { isAdmin, isLoaded } = useAdmin();

  const stats = [
    {
      title: "Total Volume",
      value: "₦2.4M",
      change: "+12%",
      trend: "up",
      icon: CircleDollarSign,
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Users,
    },
    {
      title: "KYC Queue",
      value: "45",
      change: "-3%",
      trend: "down",
      icon: FileCheck,
    },
    {
      title: "Market Sync",
      value: "Live",
      change: "100%",
      trend: "up",
      icon: RefreshCw,
    },
  ];

  if (!isLoaded) return <LoadingScreen />;
  if (!isAdmin) return <Unauthorized />;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <AdminDashboardHeader />
      <main className="pt-24 pb-20 px-4 md:px-8 max-w-[1800px] mx-auto space-y-8">
        {/* STATS GRID - BORDER FOCUS */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-[2rem] transition-colors hover:border-indigo-200 dark:hover:border-indigo-900/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
                      <stat.icon size={18} />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full border ${
                        stat.trend === "up"
                          ? "text-emerald-600 border-emerald-100 bg-emerald-50/50"
                          : "text-rose-600 border-rose-100 bg-rose-50/50"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                      {stat.value}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ANALYTICS & MARKET GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* VOLUME CHART */}
          <Card className="lg:col-span-8 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-950">
            <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-slate-50 dark:border-slate-900">
              <div className="space-y-1">
                <CardTitle className="font-heading text-xl font-bold">
                  Exchange Liquidity
                </CardTitle>
                <CardDescription className="text-xs font-bold uppercase tracking-widest">
                  Real-time throughput
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900 text-emerald-600 rounded-full text-[9px] font-black">
                  LIVE FEED
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] w-full">
                <Line options={lineChartOptions} data={transactionData} />
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-slate-100 dark:border-slate-900">
                <AnalyticsBox label="Total Volume" value="₦42.8M" />
                <AnalyticsBox label="Success Rate" value="99.2%" />
                <AnalyticsBox label="Avg. Order" value="₦245k" />
              </div>
            </CardContent>
          </Card>

          {/* MARKET RATES - DARK BORDER STYLE */}
          <Card className="lg:col-span-4 border border-slate-800 dark:border-slate-700 rounded-[2.5rem] bg-slate-900 text-white">
            <CardHeader className="p-8 pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Global Rates
                </CardTitle>
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-3">
              <RateItem pair="USD/NGN" rate="1,669.34" change="+0.2%" />
              <RateItem pair="GBP/NGN" rate="2,181.35" change="-0.1%" />
              <RateItem pair="USDT/NGN" rate="1,675.00" change="+0.4%" />
              <RateItem pair="BTC/USD" rate="64,245.0" change="+1.2%" />
              <div className="pt-4">
                <Button className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-bold border-none text-white">
                  Sync Market Rates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* LIST SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SETTLEMENTS */}
          <Card className="border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-950 overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-900">
              <div className="flex justify-between items-center">
                <h4 className="font-heading font-bold text-lg">Settlements</h4>
                <Button
                  variant="outline"
                  className="h-8 rounded-lg text-[10px] font-black uppercase border-slate-200"
                >
                  History
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50 dark:divide-slate-900">
                <TransactionRow
                  from="USD"
                  to="NGN"
                  val="₦1.6M"
                  status="pending"
                />
                <TransactionRow
                  from="GBP"
                  to="NGN"
                  val="₦1.0M"
                  status="completed"
                />
                <TransactionRow
                  from="ETH"
                  to="NGN"
                  val="₦2.4M"
                  status="completed"
                />
              </div>
            </CardContent>
          </Card>

          {/* VERIFICATIONS */}
          <Card className="border border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-950 overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-50 dark:border-slate-900">
              <div className="flex justify-between items-center">
                <h4 className="font-heading font-bold text-lg">KYC Queue</h4>
                <Button
                  variant="outline"
                  className="h-8 rounded-lg text-[10px] font-black uppercase border-slate-200"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50 dark:divide-slate-900">
                <KycRow name="John Doe" email="john@kambit.io" docs={2} />
                <KycRow name="Sarah Smith" email="sarah@kambit.io" docs={3} />
                <KycRow name="Mike Ross" email="mike@kambit.io" docs={1} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ACTION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionTile
            title="Rate Sync"
            icon={RefreshCw}
            color="border-indigo-100 bg-indigo-50/30"
            text="text-indigo-600"
          />
          <ActionTile
            title="KYC Audit"
            icon={ShieldCheck}
            color="border-emerald-100 bg-emerald-50/30"
            text="text-emerald-600"
          />
          <ActionTile
            title="Health"
            icon={Activity}
            color="border-rose-100 bg-rose-50/30"
            text="text-rose-600"
          />
          <ActionTile
            title="Logs"
            icon={FileText}
            color="border-slate-200 bg-slate-50/30"
            text="text-slate-600"
          />
        </div>
      </main>
    </div>
  );
};

// HELPER COMPONENTS
const AnalyticsBox = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-xl font-mono font-bold text-slate-900 dark:text-white">
      {value}
    </p>
  </div>
);

const RateItem = ({ pair, rate, change }) => (
  <div className="flex items-center justify-between p-4 bg-transparent border border-white/10 rounded-2xl hover:border-indigo-500/50 transition-colors">
    <div>
      <p className="text-[9px] font-black text-slate-500 uppercase">{pair}</p>
      <p className="text-lg font-mono font-bold">₦{rate}</p>
    </div>
    <span
      className={`text-[9px] font-black px-2 py-0.5 rounded border ${
        change.startsWith("+")
          ? "text-emerald-400 border-emerald-400/30 bg-emerald-400/5"
          : "text-rose-400 border-rose-400/30 bg-rose-400/5"
      }`}
    >
      {change}
    </span>
  </div>
);

const TransactionRow = ({ from, to, val, status }) => (
  <div className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-900/50">
    <div className="flex items-center gap-3">
      <div className="p-2 border border-slate-100 dark:border-slate-800 rounded-xl text-indigo-600">
        <TrendingUp size={16} />
      </div>
      <div>
        <p className="font-bold text-sm text-slate-900 dark:text-white">
          {from} → {to}
        </p>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          Base Payout
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-mono font-bold text-slate-900 dark:text-white">
        {val}
      </p>
      <div
        className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${
          status === "completed"
            ? "text-emerald-600 border-emerald-100 bg-emerald-50"
            : "text-amber-600 border-amber-100 bg-amber-50"
        }`}
      >
        {status}
      </div>
    </div>
  </div>
);

const KycRow = ({ name, email, docs }) => (
  <div className="flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-900/50">
    <div className="flex items-center gap-3">
      <Avatar className="h-9 w-9 rounded-xl border border-slate-100 dark:border-slate-800">
        <AvatarFallback className="bg-slate-50 text-[10px] font-bold">
          {name[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-bold text-sm text-slate-900 dark:text-white">
          {name}
        </p>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          {email}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold text-indigo-600 uppercase">
        {docs} Files
      </span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-lg border-slate-200"
      >
        <ChevronRight size={14} />
      </Button>
    </div>
  </div>
);

const ActionTile = ({ title, icon: Icon, color, text }) => (
  <Button
    variant="outline"
    className={`h-auto p-5 flex items-center gap-4 rounded-2xl border ${color} group hover:border-indigo-400 transition-all`}
  >
    <Icon size={18} className={text} />
    <span className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">
      {title}
    </span>
  </Button>
);

export default AdminPanel;
