"use client";

import { motion } from "framer-motion";

export default function FAQHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -z-10" />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl" />

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about trading on Kambit, asset security, 
            and instant Naira settlements. If you can&apos;t find what you&apos;re 
            looking for, our support team is available 24/7.
          </p>
        </motion.div>
      </div>
    </section>
  );
}