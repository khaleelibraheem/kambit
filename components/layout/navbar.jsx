"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Home,
  Info,
  LayoutGrid,
  HelpCircle,
  AlignRight,
  X,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import Logo from "../shared/logo";
import { cn } from "@/lib/utils";

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

  // Block body scroll when menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

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
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm"
            : "bg-white dark:bg-slate-950"
        )}
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
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm transition-all",
                    pathname === item.href
                      ? "text-indigo-600 bg-indigo-50 font-medium dark:bg-indigo-900/20"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6">
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
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold px-6 shadow-lg shadow-indigo-500/20">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-slate-900 dark:text-white"
            >
              <AlignRight className="w-7 h-7 stroke-[1.5]" />
            </button>
          </div>
        </nav>
      </header>

      {/* --- REDESIGNED MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[80] lg:hidden"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white dark:bg-slate-950 z-[90] lg:hidden flex flex-col shadow-2xl border-l border-slate-200 dark:border-slate-800"
            >
              {/* Header - EXACT MATCH */}
              <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950 sticky top-0 z-10">
                <Logo />
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-11 w-11 p-0 text-slate-900 dark:text-white flex items-center justify-center"
                >
                  <X className="w-7 h-7 stroke-[1.5]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-8 no-scrollbar">
                <div className="mb-8">
                  <div className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 p-3.5 rounded-xl transition-all",
                            isActive
                              ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium shadow-sm"
                              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                          )}
                        >
                          <div
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              isActive
                                ? "bg-indigo-100 dark:bg-indigo-900/40"
                                : "bg-slate-100 dark:bg-slate-800"
                            )}
                          >
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="text-sm flex-1">{item.name}</span>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 opacity-40" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Account Section */}
                <div>
                  <div className="px-2 space-y-4">
                    {!isLoaded ? (
                      <div className="h-14 w-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
                    ) : isSignedIn ? (
                      <Link href="/dashboard" className="block">
                        <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-2xl shadow-xl shadow-indigo-500/20 text-sm flex gap-2">
                          <LayoutDashboard size={18} />
                          User Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <Link href="/sign-up">
                          <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-2xl shadow-xl shadow-indigo-500/20">
                            Create Account
                          </Button>
                        </Link>
                        <Link href="/sign-in">
                          <Button
                            variant="ghost"
                            className="w-full h-12 font-bold text-slate-500 hover:text-slate-900"
                          >
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
                <p className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-tighter">
                  © {new Date().getFullYear()} Kambit
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
