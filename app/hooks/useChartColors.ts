"use client";
import { useTheme } from "next-themes";

export interface ChartColors {
  positive: string;
  negative: string;
  border: string;
  foreground: string;
  background: string;
}

const light: ChartColors = {
  positive:   "#037a68",
  negative:   "#ce0000",
  border:     "#374151",
  foreground: "#374151",
  background: "#ffffff",
};

const dark: ChartColors = {
  positive:   "#3ecf8e",
  negative:   "#ff4d4d",
  border:     "#2e2e2e",
  foreground: "#a0a0a0",
  background: "#1f1f1f",
};

export function useChartColors(): ChartColors {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? dark : light;
}
