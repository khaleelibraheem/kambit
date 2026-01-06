"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  RefreshCcw,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { useHistoricalRates, useLiveRates } from "@/app/hooks/useExchangeRates";
import staticRates from "@/lib/mock-data/static-rates";

const supportedAssets = ["USDT", "BTC", "ETH", "SOL", "NGN"];

const RateCardSkeleton = () => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
    <Skeleton className="h-10 w-32 mb-4" />
    <Skeleton className="h-4 w-24" />
  </div>
);

export default function CryptoMarketRates() {
  const [baseCurrency, setBaseCurrency] = useState("BTC");
  const [selectedCurrency, setSelectedCurrency] = useState("NGN");
  const [currentTime, setCurrentTime] = useState("");

  const {
    data: liveRates,
    isLoading: loadingRates,
    isError: ratesError,
    refetch: refetchRates,
  } = useLiveRates(baseCurrency);

  const {
    data: historicalRates,
    isLoading: loadingHistory,
    isError: historyError,
  } = useHistoricalRates(baseCurrency, selectedCurrency, 30);

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getRateChange = (currency) => {
    return {
      value: Math.random() * 5 - 2, // Slightly higher volatility for crypto
      trend: Math.random() > 0.5 ? "up" : "down",
    };
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900" id="exchange-rates">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 fill-indigo-600/20" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Live Market Data
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Real-Time Crypto Prices
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Monitor live market movements for major digital assets. Get the most 
            accurate Naira conversion rates updated every minute.
          </p>
        </motion.div>

        {/* Currency Selector */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-sm font-medium text-gray-500">Base:</span>
          <Select value={baseCurrency} onValueChange={setBaseCurrency}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-gray-800">
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
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetchRates()}
            className="rounded-full"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Exchange Rates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {ratesError ? (
            <div className="col-span-full text-center text-red-500 py-12">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4" />
              <p className="font-medium">Error syncing with market data. Please refresh.</p>
            </div>
          ) : loadingRates ? (
            Array(4).fill(0).map((_, i) => <RateCardSkeleton key={i} />)
          ) : (
            supportedAssets
              .filter((curr) => curr !== baseCurrency)
              .map((currency) => {
                const rate = staticRates[baseCurrency]?.[currency] || 0;
                const change = getRateChange(currency);

                return (
                  <motion.div
                    key={currency}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="cursor-pointer"
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    <Card
                      className={`hover:shadow-md transition-all duration-300 ${
                        selectedCurrency === currency
                          ? "ring-2 ring-indigo-500 border-transparent shadow-md"
                          : "border-gray-100 dark:border-gray-800"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <CardHeader className="p-0">
                            <CardTitle className="text-sm font-bold text-gray-400 uppercase">
                              {baseCurrency}/{currency}
                            </CardTitle>
                          </CardHeader>
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                              change.trend === "up"
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30"
                                : "bg-rose-100 text-rose-600 dark:bg-rose-900/30"
                            }`}
                          >
                            {change.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {change.value.toFixed(2)}%
                          </div>
                        </div>

                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {rate > 1000 ? rate.toLocaleString() : rate.toFixed(2)}
                          </span>
                          <span className="text-xs font-semibold text-gray-400 mb-1.5 uppercase">
                            {currency}
                          </span>
                        </div>

                        {currentTime && (
                          <CardDescription className="text-[10px] text-gray-400 italic">
                            Updated: {currentTime}
                          </CardDescription>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
          )}
        </div>

        {/* Historical Chart */}
        <Card className="mb-12 border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
          <CardHeader className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Price Analytics</CardTitle>
                <CardDescription>
                  30-day performance for {baseCurrency} against {selectedCurrency}
                </CardDescription>
              </div>
              <div className="text-xs font-bold bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg">
                NGN Market Pair
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {historyError ? (
              <div className="text-center py-20 text-gray-400">
                <p>History unavailable for this pair.</p>
              </div>
            ) : loadingHistory ? (
              <div className="h-[400px] flex items-center justify-center">
                <Skeleton className="w-[90%] h-[300px]" />
              </div>
            ) : (
              historicalRates && (
                <div className="w-full">
                  <RateChart
                    data={historicalRates}
                    currency={`${baseCurrency}/${selectedCurrency}`}
                  />
                </div>
              )
            )}
          </CardContent>
        </Card>

        {/* Fintech Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Institutional Liquidity",
              description: "Direct connection to global liquidity providers for stable pricing.",
            },
            {
              title: "Naira Optimized",
              description: "Rates specifically tailored for the Nigerian P2P and bank markets.",
            },
            {
              title: "Historical Trends",
              description: "Access deep data insights to time your trades perfectly.",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 * index }}
              className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-md font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 h-14 rounded-xl text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none"
            asChild
          >
            <Link href="/trade">
              Trade Asset Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}