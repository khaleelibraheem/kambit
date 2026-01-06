"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Sun, Moon, Coffee, Calendar, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export function GreetingSection() {
  const { user } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Updates the clock every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getGreetingConfig = () => {
    const hour = currentTime.getHours();
    if (hour < 12)
      return {
        text: "Good Morning",
        icon: Coffee,
        color: "text-amber-500",
        gradient: "from-amber-500/10 to-transparent",
      };
    if (hour < 18)
      return {
        text: "Good Afternoon",
        icon: Sun,
        color: "text-indigo-500",
        gradient: "from-indigo-500/10 to-transparent",
      };
    return {
      text: "Good Evening",
      icon: Moon,
      color: "text-sky-600",
      gradient: "from-sky-500/10 to-transparent",
    };
  };

  const greeting = getGreetingConfig();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Card className="relative overflow-hidden border-none bg-white dark:bg-slate-900 shadow-sm rounded-2xl p-5 sm:p-7">
        {/* Brand Ambient Gradient */}
        <div
          className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l pointer-events-none transition-all duration-1000"
          style={{
            backgroundImage: `linear-gradient(to left, ${greeting.gradient})`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Animated Icon Container */}
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="flex-shrink-0 rounded-2xl bg-slate-50 dark:bg-slate-800 p-3 shadow-inner border border-slate-100 dark:border-slate-700"
            >
              <greeting.icon
                className={`w-6 h-6 ${greeting.color}`}
              />
            </motion.div>

            <div className="min-w-0">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h1 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
                  {greeting.text}, {user?.firstName}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  Ready to trade? Here&apos;s your Kambit market overview.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Date Display Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}