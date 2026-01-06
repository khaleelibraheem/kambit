"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Home, ArrowLeft, Lock, ShieldOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 px-4">
      <motion.div
        variants={variants.container}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full"
      >
        <Card className="border border-rose-100 dark:border-rose-900/30 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            
            {/* STYLIZED ERROR ICON */}
            <motion.div variants={variants.item} className="relative flex justify-center">
              <div className="w-20 h-20 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-[1.8rem] flex items-center justify-center text-rose-600">
                <ShieldOff size={36} />
              </div>
              {/* Decorative Pulse */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-rose-500/20 rounded-full blur-2xl -z-10"
              />
            </motion.div>

            {/* TEXT CONTENT */}
            <motion.div variants={variants.item} className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-950/30 rounded-full border border-rose-100 dark:border-rose-900/30">
                <Lock size={12} className="text-rose-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-600">
                  Security Violation
                </span>
              </div>
              
              <h1 className="font-heading text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Access Restricted
              </h1>
              
              <p className="text-slate-500 text-sm leading-relaxed px-2">
                Your current credentials do not have administrative clearance for the 
                <span className="text-slate-900 dark:text-slate-200 font-bold"> Kambit Control Center</span>.
              </p>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div variants={variants.item} className="space-y-3 pt-2">
              <Button
                onClick={() => router.push("/")}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Return to Home
              </Button>
              
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="w-full h-14 rounded-2xl border-slate-200 dark:border-slate-800 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Go Back
              </Button>
            </motion.div>

            {/* ERROR CODE FOOTER */}
            <motion.div variants={variants.item} className="pt-4 border-t border-slate-50 dark:border-slate-800">
              <div className="flex items-center justify-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Ref: <span className="font-mono text-rose-500">ERR_403_FORBIDDEN</span></span>
              </div>
            </motion.div>

          </CardContent>
        </Card>

        {/* EXTERNAL LINK HELP */}
        <motion.p 
          variants={variants.item}
          className="mt-8 text-center text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors cursor-pointer"
        >
          Contact System Administrator
        </motion.p>
      </motion.div>
    </div>
  );
}