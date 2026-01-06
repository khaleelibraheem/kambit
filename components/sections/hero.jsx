"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-24 sm:pt-44 overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 -z-10" />

      {/* Gradient blob */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl dark:bg-indigo-500/10" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl dark:bg-sky-500/10" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-full mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium">Market Live: Best Rates in Nigeria</span>
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>

            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 mb-8 leading-tight">
              Buy & Sell Crypto <br />
              <span className="text-indigo-600 dark:text-indigo-400">
                Instantly with Naira
              </span>
            </motion.h1>

            <motion.p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              The secure gateway to trade **BTC, USDT, ETH, and SOL**. Experience instant settlements, 
              zero hidden fees, and the most competitive market rates in Nigeria.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto px-8"
                asChild
              >
                <Link href="/sign-up">
                  Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link href="/prices">Check Live Prices</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  4+
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Top Assets
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  &lt; 5m
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Settlement
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  24/7
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Trading Access
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Price Preview Card */}
          <motion.div
            className="flex-1 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="relative">
              <div className="hidden xl:block absolute inset-0 bg-gradient-to-tr from-indigo-500 to-sky-500 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Kambit Rates
                      </span>
                    </div>
                    <span className="text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded">
                      Live
                    </span>
                  </div>

                  {/* Crypto Assets Rates */}
                  <div className="space-y-4">
                    {[
                      { asset: "USDT", pair: "USDT/NGN", price: "₦1,710.50", change: "+0.2%" },
                      { asset: "BTC", pair: "BTC/NGN", price: "₦110,450,200", change: "-1.4%" },
                      { asset: "ETH", pair: "ETH/NGN", price: "₦4,520,300", change: "+2.1%" },
                      { asset: "SOL", pair: "SOL/NGN", price: "₦245,150", change: "+5.4%" },
                    ].map((item) => (
                      <div
                        key={item.asset}
                        className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{item.asset}</span>
                          <span className="text-xs text-gray-500">{item.pair}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-gray-900 dark:text-white font-medium">
                            {item.price}
                          </span>
                          <span className={`text-[10px] ${item.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="ghost" className="w-full text-indigo-600 dark:text-indigo-400 text-sm h-8" asChild>
                    <Link href="/dashboard">Trade Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-auto fill-white dark:fill-slate-800"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,50 C280,100 720,0 1440,50 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}