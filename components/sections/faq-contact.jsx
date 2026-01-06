"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, PhoneCall, Mail } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Instant Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    href: "#", 
  },
  {
    icon: PhoneCall,
    title: "Support Hotline",
    description: "Available 24/7 for you",
    action: "Call Kambit",
    href: "tel:+234800KAMBIT", 
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Get email support",
    action: "Send Email",
    href: "mailto:support@kambit.com",
  },
];

export default function FAQContact() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our specialized trading support team is here to help you navigate 
            the Kambit ecosystem with ease.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full p-8 bg-white dark:bg-gray-900 rounded-2xl text-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="inline-flex p-3 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {method.description}
                  </p>
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Link href={method.href}>{method.action}</Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}