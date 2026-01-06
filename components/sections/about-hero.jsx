"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -z-10" />
      <div className="container px-4 mx-auto">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trade Assets Instantly
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Kambit is a premier fintech platform dedicated to simplifying the
            way Nigerians interact with digital assets. We specialize in
            providing the most liquid and secure gateway for buying and selling
            BTC, USDT, ETH, and SOL using Naira.
          </p>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto italic">
            Our mission is to bridge the gap between traditional finance and the
            future of crypto, making digital wealth accessible, safe, and
            instant for everyone.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
