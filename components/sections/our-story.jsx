"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2018",
    title: "The Vision Began",
    description:
      "Founded with a mission to simplify digital asset access for the Nigerian market.",
  },
  {
    year: "2019",
    title: "Liquidity Expansion",
    description: "Established deep liquidity pools for major assets like BTC and USDT.",
  },
  {
    year: "2020",
    title: "Instant Settlement Launch",
    description: "Developed our proprietary system for automated, instant Naira payouts.",
  },
  {
    year: "2021",
    title: "Security Scaling",
    description: "Integrated institutional-grade cold storage and advanced encryption protocols.",
  },
  {
    year: "2022",
    title: "Asset Expansion",
    description: "Expanded our ecosystem to support high-speed trading for Ethereum and Solana.",
  },
  {
    year: "2023",
    title: "Becoming Kambit",
    description: "Officially rebranded as Kambit, solidifying our place as the fastest crypto-to-Naira gateway.",
  },
];

export default function OurStory() {
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
            Our Story
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            From our early days in the crypto space to becoming a trusted name in 
            digital asset trading, our journey has been driven by speed, security, 
            and the trust of our users.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 dark:bg-gray-800" />

            {/* Timeline items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center"
                >
                  <div className="flex-1 pr-8 text-right">
                    {index % 2 === 0 && (
                      <>
                        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                          {item.year}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  </div>
                  <div className="flex-1 pl-8">
                    {index % 2 === 1 && (
                      <>
                        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                          {item.year}
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {item.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}