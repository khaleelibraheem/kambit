"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const benefits = [
  "BTC, USDT, ETH, & SOL supported",
  "Real-time Naira market rates",
  "Instant crypto buy & sell",
  "Zero hidden trading fees",
  "Secure bank-grade encryption",
  "24/7 dedicated human support",
];

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-500">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 -translate-y-1/2 translate-x-[-30%] w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-[30%] w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to trade crypto for Naira?
            </h2>
            <p className="text-base sm:text-lg text-indigo-100 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              Join thousands of satisfied traders who trust Kambit for instant 
              crypto settlements. Start buying and selling digital assets today 
              and experience the difference.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex-shrink-0 w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="w-2.5 sm:w-3 h-2.5 sm:h-3 text-white" />
                  </div>
                  <span className="text-sm sm:text-base text-indigo-100">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto"
                asChild
              >
                <Link href="/sign-up">
                  Start Trading <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-indigo-600 hover:bg-white/10 hover:text-white dark:bg-white dark:hover:bg-white/10"
                asChild
              >
                <Link href="/prices">View Live Rates</Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:flex-1"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                {[
                  { value: "₦10B+", label: "Trade Volume" },
                  { value: "10k+", label: "Active Users" },
                  { value: "< 5m", label: "Settlement" },
                  { value: "24/7", label: "Support" },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-3 sm:p-6 rounded-xl bg-white/10"
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm sm:text-base text-indigo-100">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}