"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="h-11 w-11 hover:bg-transparent active:bg-transparent"
      />
    );
  }

  return (
    <Button
      variant="ghost"
      className="h-11 w-11 hover:bg-transparent active:bg-transparent hover:scale-110 transition-all duration-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Moon className="!w-4 !h-4 stroke-[1.5] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute !w-4 !h-4 stroke-[1.5] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
