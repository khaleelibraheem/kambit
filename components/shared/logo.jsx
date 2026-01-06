"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({ className = "", iconOnly = false }) => {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "flex items-center gap-2.5 group transition-all duration-300 w-fit",
        className
      )}
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center">
        <Image
          src="/logo.png"
          width={32}
          height={32}
          alt="Kambit Logo Icon"
          className="object-contain transition-transform duration-500"
        />
      </div>

      {!iconOnly && (
        <span className="font-heading text-xl font-bold tracking-tighter text-slate-900 dark:text-white  transition-colors duration-300">
          Kambit
        </span>
      )}
    </Link>
  );
};

export default Logo;
