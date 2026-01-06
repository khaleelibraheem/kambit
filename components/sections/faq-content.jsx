"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Trading & Market Rates",
    questions: [
      {
        question: "How are Kambit's exchange rates determined?",
        answer: "Our rates are pulled in real-time from global liquidity providers and adjusted for the local Naira market. We offer some of the most competitive spreads in Nigeria for BTC, USDT, ETH, and SOL."
      },
      {
        question: "Are there hidden fees when buying or selling?",
        answer: "No. Kambit pride itself on transparency. The price you see during your trade is the price you pay. We incorporate a small spread to cover operational costs, with no hidden service charges."
      },
      {
        question: "Why do crypto prices change so quickly?",
        answer: "Digital assets are traded 24/7 globally. Prices fluctuate based on market supply, demand, and global economic news. We provide live updates every minute to ensure you trade at the most accurate price."
      }
    ]
  },
  {
    title: "Deposits & Withdrawals",
    questions: [
      {
        question: "How long does it take to get my Naira after selling?",
        answer: "Settlements on Kambit are designed to be instant. Once your trade is confirmed, the Naira is typically processed and sent to your linked bank account in under 5 minutes."
      },
      {
        question: "Which digital assets can I trade on Kambit?",
        answer: "Currently, you can buy and sell Bitcoin (BTC), Tether (USDT), Ethereum (ETH), and Solana (SOL). We are constantly evaluating new assets to add to our ecosystem."
      },
      {
        question: "What are the minimum and maximum trade limits?",
        answer: "The minimum trade amount is the equivalent of $10 USD. Maximum daily limits depend on your account verification (KYC) level, designed to ensure platform security."
      }
    ]
  },
  {
    title: "Security & Verification",
    questions: [
      {
        question: "How secure are my digital assets on Kambit?",
        answer: "We use a combination of institutional-grade cold storage, multi-signature wallets, and end-to-end encryption. Your funds are protected by the same security protocols used by global financial institutions."
      },
      {
        question: "What is required for account verification (KYC)?",
        answer: "To ensure compliance and security, we require a government-issued ID and a quick liveness check. This process is automated and usually takes less than 2 minutes to complete."
      },
      {
        question: "Can I hold both Crypto and Naira in my Kambit wallet?",
        answer: "Yes. Your Kambit account features a multi-asset wallet where you can securely hold your digital coins and your Naira balance simultaneously, making it easy to trade whenever the market is right."
      }
    ]
  }
];

export default function FAQContent() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${categoryIndex}-${index}`}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 bg-gray-50/50 dark:bg-gray-800/30"
                  >
                    <AccordionTrigger className="text-left text-gray-900 dark:text-white font-medium hover:no-underline py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300 pb-4 leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}