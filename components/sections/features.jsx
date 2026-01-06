"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Coins,
  Wallet,
  ArrowRight,
  RefreshCcw,
  LineChart,
  Lock,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
  {
    icon: RefreshCcw,
    title: "Live Crypto Prices",
    description:
      "Stay ahead with real-time price feeds for BTC, USDT, ETH, and SOL, pegged accurately to the current Naira market.",
    color: "text-amber-500",
    gradient: "from-amber-500/20 to-amber-500/0",
  },
  {
    icon: Zap,
    title: "Instant Buy & Sell",
    description:
      "No more waiting for P2P matches. Purchase or liquidate your crypto assets instantly with direct Naira settlement.",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    icon: LineChart,
    title: "Deep Liquidity",
    description:
      "Trade any volume with confidence. Our platform ensures minimal slippage and the most competitive rates in Nigeria.",
    color: "text-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    icon: Lock,
    title: "Institutional Security",
    description:
      "Your assets are protected by multi-sig cold storage, 2FA, and bank-grade encryption protocols.",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    icon: Wallet,
    title: "Naira Fiat Wallet",
    description:
      "Seamlessly deposit and withdraw Naira. Fund your account via bank transfer and start trading in under 60 seconds.",
    color: "text-pink-500",
    gradient: "from-pink-500/20 to-pink-500/0",
  },
  {
    icon: History,
    title: "Automated Settlements",
    description:
      "Every trade is processed automatically. Get your crypto or Naira delivered to your wallet without manual delays.",
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/0",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful features for the modern trader
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kambit provides a secure, high-speed infrastructure designed to make 
            crypto trading accessible to every Nigerian.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative overflow-hidden rounded-2xl p-8 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors h-full border border-transparent hover:border-slate-200 dark:hover:border-slate-600">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-lg ${feature.color} bg-white dark:bg-gray-900 mb-4 shadow-sm`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button
            size="lg"
            asChild
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8"
          >
            <Link href="/dashboard">
              Start Trading Now <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}