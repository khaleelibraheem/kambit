"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "Kambit is a game changer for my USDT trades. The Naira settlements are actually instant—usually hitting my bank in less than 3 minutes.",
    author: "Chidi Okoro",
    role: "P2P Merchant",
    location: "Lagos, Nigeria",
    rating: 5,
    image: "/avatars/avatar-1.jpg",
  },
  {
    content:
      "I've used many platforms, but Kambit's rates for buying Solana and Bitcoin are consistently the best in the market. No hidden fees at all.",
    author: "Amara Williams",
    role: "Crypto Investor",
    location: "Abuja, Nigeria",
    rating: 5,
    image: "/avatars/avatar-2.jpg",
  },
  {
    content:
      "The interface is so clean. Selling my ETH for Naira was seamless, and the customer support team actually responds within seconds.",
    author: "Tunde Bakare",
    role: "Tech Professional",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    image: "/avatars/avatar-3.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
            User Stories
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Trusted by thousands of Nigerian traders
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            See why Kambit is becoming the preferred choice for buying and selling crypto assets.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-500/10" />

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                  {/* Placeholder for avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-500 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-full border border-emerald-100 dark:border-emerald-900/30">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700"
                />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
                +10k
              </div>
            </div>
            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
              Join 10,000+ active traders on Kambit
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}