"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <Card className="w-full max-w-[340px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden">
          <CardContent className="p-10 flex flex-col items-center gap-6">
            
            <div className="relative flex items-center justify-center">
              {/* Animated Outer Pulse Ring */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-20 h-20 bg-indigo-500/20 rounded-full"
              />
              
              {/* Rotating Border Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-slate-100 dark:border-slate-800 border-t-indigo-600 rounded-full"
              />

              {/* Secure Lock Icon in center */}
              <div className="absolute flex items-center justify-center">
                <Lock className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            {/* STATUS TEXT */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2">
                <ShieldCheck size={12} className="text-indigo-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Secure Protocol
                </span>
              </div>
              
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-1">
                Authorizing
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                >
                  ...
                </motion.span>
              </h3>
              
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed px-4">
                Accessing Kambit Control Center
              </p>
            </div>

          </CardContent>
          
          <div className="h-1 bg-slate-50 dark:bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="h-full w-1/2 bg-indigo-600"
            />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;