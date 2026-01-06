"use client";

import {
  User,
  ChevronDown,
  ShieldCheck,
  Settings,
  LogOut,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNavigation } from "./mobile-navigation";
import Logo from "../shared/logo";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useBanking } from "@/contexts/BankingContext";

function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="w-32 h-8 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
    </div>
  );
}

export function DashboardNavbar({ user }) {
  const { signOut } = useClerk();
  const { balances } = useBanking();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !user) return <NavbarSkeleton />;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right Area */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Naira Wallet Pill */}
          <Link href="/dashboard/fund-account">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full hover:border-indigo-200 transition-colors group">
              <div className="p-1 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
                <Wallet className="w-3 h-3 text-indigo-600" />
              </div>
              <div className="flex flex-col pr-1">
                <span className="hidden sm:block text-[9px] font-black uppercase leading-none text-slate-400">
                  Naira Wallet
                </span>
                <span className="text-xs font-bold font-mono text-slate-900 dark:text-white mt-0.5 leading-none">
                  ₦{(balances?.NGN || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </Link>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="group flex items-center gap-2 px-1 sm:px-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all rounded-full md:rounded-lg h-10"
              >
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 border border-white/10">
                    <span className="text-xs font-bold text-white uppercase font-heading">
                      {user?.firstName?.[0] || "U"}
                    </span>
                  </div>
                </div>

                {/* Identity Label with inline Verified Badge */}
                <div className="hidden md:flex flex-col items-start text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold font-heading leading-none text-slate-900 dark:text-white">
                      {user?.firstName || "Trader"}
                    </span>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-0.5">
                    Account
                  </span>
                </div>
                <ChevronDown className="hidden md:block h-3 w-3 text-slate-400 group-data-[state=open]:rotate-180 transition-transform" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-64 p-2 mt-2 rounded-2xl shadow-xl"
            >
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold font-heading text-slate-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <BadgeCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="opacity-50" />

              <div className="p-1">
                <Link href="/dashboard/profile">
                  <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5">
                    <User className="h-4 w-4 mr-2 text-slate-400" />
                    Profile Details
                  </DropdownMenuItem>
                </Link>

                <Link href="/dashboard/settings">
                  <DropdownMenuItem className="cursor-pointer rounded-xl py-2.5">
                    <Settings className="h-4 w-4 mr-2 text-slate-400" />
                    Security Settings
                  </DropdownMenuItem>
                </Link>

                {user?.publicMetadata?.role === "admin" && (
                  <>
                    <DropdownMenuSeparator className="opacity-50" />
                    <Link href="/admin">
                      <DropdownMenuItem className="cursor-pointer text-indigo-600 dark:text-indigo-400 font-bold py-2.5 rounded-xl">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Admin Terminal
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}

                <DropdownMenuSeparator className="opacity-50" />

                <DropdownMenuItem
                  className="cursor-pointer text-rose-600 dark:text-rose-400 focus:bg-rose-50 dark:focus:bg-rose-950/30 rounded-xl py-2.5"
                  onClick={() => signOut({ redirectUrl: "/" })}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Nav Trigger */}
          <div className="lg:hidden">
            <MobileNavigation user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
