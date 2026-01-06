"use client";

import { motion } from "framer-motion";
import {
  Repeat,
  Wallet,
  Building2,
  ArrowRightLeft,
  Globe,
  Shield,
} from "lucide-react";

const services = [
  {
    title: "Spot Trading",
    description: "Instant crypto-to-Naira trading at live market rates",
    icon: Repeat,
    features: [
      "Real-time crypto prices",
      "Zero hidden fees",
      "Instant trade execution",
      "Competitive Naira spreads",
    ],
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    title: "Digital Asset Wallet",
    description: "Securely hold your crypto and Naira in one place",
    icon: Wallet,
    features: [
      "BTC, USDT, ETH, SOL support",
      "Naira fiat wallet",
      "Real-time balance updates",
      "Secure fund management",
    ],
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    title: "OTC Desk",
    description: "High-volume solutions for institutional traders",
    icon: Building2,
    features: [
      "Volume-based rates",
      "Priority settlements",
      "API trading access",
      "Personal account manager",
    ],
    color: "text-indigo-500",
    gradient: "from-indigo-500/20 to-indigo-500/0",
  },
  {
    title: "Market Insights",
    description: "Track price movements with live data feeds",
    icon: ArrowRightLeft,
    features: [
      "Live NGN/Crypto rates",
      "Price change alerts",
      "Market trend analysis",
      "Historical data tracking",
    ],
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/0",
  },
  {
    title: "Instant Settlements",
    description: "Withdraw profits to your bank account instantly",
    icon: Globe,
    features: [
      "Fast bank processing",
      "Real-time tracking",
      "24/7 payout access",
      "Automated payouts",
    ],
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/0",
  },
  {
    title: "Institutional Security",
    description: "Bank-grade protection for your digital assets",
    icon: Shield,
    features: [
      "Cold storage vaults",
      "2FA authentication",
      "Real-time monitoring",
      "Multi-sig protection",
    ],
    color: "text-red-500",
    gradient: "from-red-500/20 to-red-500/0",
  },
];

export default function ExchangeServices() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Comprehensive Trading Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need for seamless digital asset trading between BTC, 
            USDT, ETH, SOL, and Naira.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl transition-shadow hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-xl ${service.color} bg-white dark:bg-gray-900`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${service.color.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}