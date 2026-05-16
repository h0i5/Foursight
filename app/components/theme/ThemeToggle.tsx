"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-[34px] w-[34px] border border-border" />;
  }

  function cycle() {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }

  const Icon = resolvedTheme === "light" ? Sun : Moon;

  return (
    <button
      onClick={cycle}
      title={`Theme: ${resolvedTheme}`}
      className="h-[34px] w-[34px] flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 transition-colors"
    >
      <Icon className="h-4 w-4 text-foreground" strokeWidth={1.5} />
    </button>
  );
}
