"use client";

import { motion } from "framer-motion";
import { UserPlus, ArrowLeftRight, Banknote, Wallet } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Join Kambit",
    description:
      "Create your account and complete a quick verification to secure your trading wallet.",
    color: "text-blue-500",
  },
  {
    icon: Wallet,
    title: "Fund Your Wallet",
    description:
      "Deposit Naira via bank transfer or send crypto directly to your secure Kambit wallet.",
    color: "text-emerald-500",
  },
  {
    icon: ArrowLeftRight,
    title: "Buy or Sell",
    description:
      "Trade BTC, USDT, ETH, or SOL instantly at the best market rates with a single click.",
    color: "text-indigo-500",
  },
  {
    icon: Banknote,
    title: "Instant Cash Out",
    description:
      "Withdraw your profits directly to your local Nigerian bank account in under 5 minutes.",
    color: "text-purple-500",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Start trading in 4 simple steps
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We&apos;ve simplified crypto trading so you can focus on building your 
            wealth without the technical hurdles.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line (Hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700 -z-0" />
                )}

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon Container */}
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none mb-6 border border-gray-100 dark:border-gray-700">
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}