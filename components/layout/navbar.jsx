"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Home,
  Info,
  LayoutGrid,
  HelpCircle,
  AlignRight,
  X,
  ArrowRight,
} from "lucide-react";
import Logo from "../shared/logo";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Services", href: "/services", icon: LayoutGrid },
  { name: "FAQ", href: "/faq", icon: HelpCircle },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close sidebar on navigation
  useEffect(() => setIsOpen(false), [pathname]);

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
            : "bg-white dark:bg-slate-950"
        }`}
      >
        <nav className="mx-auto px-4 h-16 max-w-7xl flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    pathname === item.href
                      ? "text-indigo-600 bg-indigo-50 font-medium dark:bg-indigo-900/20"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6">
              <div className="min-w-[140px] flex justify-end">
                {!isLoaded ? (
                  <div className="h-9 w-24 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl" />
                ) : isSignedIn ? (
                  <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                      <Button
                        size="sm"
                        className="bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl px-5"
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                ) : (
                  <Link href="/sign-up">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold px-6 shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Toggle Area */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-slate-900 dark:text-white focus:outline-none"
            >
              <AlignRight className="w-7 h-7 stroke-[1.5]" />
            </button>
          </div>
        </nav>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/50 z-[80] lg:hidden"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white dark:bg-slate-950 z-[90] lg:hidden flex flex-col shadow-2xl"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-slate-50 dark:border-slate-900">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-900 dark:text-white focus:outline-none"
                >
                  <X className="w-7 h-7 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-1 px-4 py-8 flex flex-col justify-between">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        pathname === item.href
                          ? "bg-indigo-50 font-medium dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                      }`}
                    >
                      <item.icon className="w-5 h-5 opacity-70" />
                      <span className="text-lg">{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Auth Actions */}
                <div className="space-y-4">
                  {!isLoaded ? (
                    <div className="h-14 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
                  ) : isSignedIn ? (
                    <Link href="/dashboard">
                      <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-2xl shadow-xl shadow-indigo-500/20 text-lg">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/sign-up">
                        <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-2xl shadow-xl shadow-indigo-500/20 text-lg">
                          Create Account
                        </Button>
                      </Link>
                      <Link href="/sign-in">
                        <Button
                          variant="ghost"
                          className="w-full h-12 font-bold text-slate-500"
                        >
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  )}

                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center pt-4">
                    © {new Date().getFullYear()} Kambit
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
