"use client";

import { motion } from "framer-motion";
import { Scale, Shield, Clock, Users, Globe, LineChart } from "lucide-react";

const values = [
  {
    icon: Scale,
    title: "Competitive Market Rates",
    description:
      "We provide industry-leading rates for BTC, USDT, and more, ensuring you always get the best value when trading for Naira.",
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-blue-500/0",
  },
  {
    icon: Shield,
    title: "Compliance & Security",
    description:
      "Operating with strict AML and KYC protocols, we ensure your assets are protected by institutional-grade security measures.",
    color: "text-indigo-500",
    gradient: "from-indigo-500/20 to-indigo-500/0",
  },
  {
    icon: Clock,
    title: "Always-On Trading",
    description:
      "Digital assets never sleep. Our platform provides 24/7 access to liquidity, allowing you to trade whenever the market moves.",
    color: "text-green-500",
    gradient: "from-green-500/20 to-green-500/0",
  },
  {
    icon: Users,
    title: "Trader-Centric Support",
    description:
      "Our dedicated team provides personalized, human-led support to help you navigate the crypto market with absolute confidence.",
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-purple-500/0",
  },
  {
    icon: Globe,
    title: "Digital Asset Gateway",
    description:
      "Kambit serves as the premier bridge between global crypto assets (USDT, BTC, SOL) and the local Naira economy.",
    color: "text-orange-500",
    gradient: "from-orange-500/20 to-orange-500/0",
  },
  {
    icon: LineChart,
    title: "Instant Execution",
    description:
      "Experience lightning-fast settlements and real-time price feeds designed for the speed of modern fintech.",
    color: "text-pink-500",
    gradient: "from-pink-500/20 to-pink-500/0",
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

export default function CompanyValues() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Kambit is built on principles of speed, transparency, and 
            institutional-grade security for the Nigerian crypto community.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="relative h-full p-8 bg-white dark:bg-gray-900 rounded-2xl transition-shadow hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-flex p-3 rounded-lg ${value.color} bg-white dark:bg-gray-900 mb-4`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
        >
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              4+
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Top Crypto Assets
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              10k+
            </div>
            <div className="text-gray-600 dark:text-gray-300">Active Traders</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              99.9%
            </div>
            <div className="text-gray-600 dark:text-gray-300">Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-300">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}