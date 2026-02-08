"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  AlertTriangle,
  Activity,
  Zap,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { RateChart } from "@/components/charts/rate-chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useHistoricalRates } from "@/app/hooks/useExchangeRates";
import staticRates from "@/lib/mock-data/static-rates";

const supportedAssets = ["USDT", "BTC", "ETH", "SOL", "NGN"];

export default function MarketPrices() {
  const [baseAsset, setBaseAsset] = useState("USDT");
  const [selectedAsset, setSelectedAsset] = useState("NGN");
  const [currentTime, setCurrentTime] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: historicalRates,
    isLoading: loadingHistory,
    isError: historyError,
  } = useHistoricalRates(baseAsset, selectedAsset, 30);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const formatRate = (value) => {
    if (value >= 1000)
      return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    if (value < 0.0001) return value.toFixed(8);
    return value.toFixed(4);
  };

  const getRateChange = (asset) => {
    if (!mounted) return { value: 0, trend: "up" };
    const val = (Math.random() * 4 - 2).toFixed(2);
    return {
      value: Math.abs(val),
      trend: val >= 0 ? "up" : "down",
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
            Market Prices
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-500">Live analytics</p>
            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
              Last Sync: {currentTime}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              Base:
            </span>
            <Select value={baseAsset} onValueChange={setBaseAsset}>
              <SelectTrigger className="w-24 border-none shadow-none focus:ring-0 h-7 text-sm font-bold">
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                {supportedAssets.map((asset) => (
                  <SelectItem key={asset} value={asset}>
                    {asset}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className={isRefreshing ? "animate-spin" : ""}
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Optimized Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportedAssets
          .filter((curr) => curr !== baseAsset)
          .map((asset) => {
            const rate = staticRates[baseAsset]?.[asset] || 0;
            const change = getRateChange(asset);

            return (
              <motion.div
                key={asset}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="cursor-pointer"
                onClick={() => setSelectedAsset(asset)}
              >
                <Card
                  className={`transition-all duration-200 border-gray-100 dark:border-gray-800 ${
                    selectedAsset === asset
                      ? "ring-2 ring-indigo-500 border-transparent shadow-md"
                      : "hover:border-gray-200 dark:hover:border-gray-700"
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        {baseAsset} / {asset}
                      </span>
                      <div
                        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          change.trend === "up"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
                            : "bg-rose-50 text-rose-600 dark:bg-rose-900/20"
                        }`}
                      >
                        {change.trend === "up" ? (
                          <ArrowUp className="w-3 h-3" />
                        ) : (
                          <ArrowDown className="w-3 h-3" />
                        )}
                        {change.value}%
                      </div>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatRate(rate)}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        {asset}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
      </div>

      {/* Analytics Card */}
      <Card className="shadow-sm border-gray-100 dark:border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <div>
            <CardTitle className="text-lg font-bold">Price Analytics</CardTitle>
            <CardDescription>
              30-day volatility data for {baseAsset}/{selectedAsset}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded text-[10px] font-bold text-indigo-600 border border-indigo-100 dark:border-indigo-800">
            <Activity className="w-3 h-3" /> LIVE
          </div>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {historyError ? (
            <div className="text-center py-12 text-gray-400 text-sm italic">
              Historical data unavailable for this pair.
            </div>
          ) : loadingHistory ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="w-[95%] h-[250px] rounded-xl" />
            </div>
          ) : (
            historicalRates && (
              <div className="w-full">
                <RateChart
                  data={historicalRates}
                  currency={`${baseAsset}/${selectedAsset}`}
                />
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Zap, title: "Instant Settlement", desc: "Avg payout: < 5m" },
          {
            icon: Activity,
            title: "Deep Liquidity",
            desc: "Ready for high volume",
          },
          { icon: Bell, title: "Price Alerts", desc: "Available in settings" },
        ].map((feature, index) => (
          <Card
            key={index}
            className="bg-gray-50/50 dark:bg-gray-900/20 border-none"
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
                  <feature.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
