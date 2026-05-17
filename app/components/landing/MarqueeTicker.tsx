"use client";
import Link from "next/link";

const TICKERS = [
  { symbol: "RELIANCE", price: "2,941.55", change: "+1.24%" },
  { symbol: "TCS", price: "3,812.40", change: "+0.87%" },
  { symbol: "HDFCBANK", price: "1,623.90", change: "-0.43%" },
  { symbol: "INFY", price: "1,489.75", change: "+2.11%" },
  { symbol: "WIPRO", price: "461.30", change: "+0.62%" },
  { symbol: "ADANIENT", price: "2,334.10", change: "-1.82%" },
  { symbol: "BAJFINANCE", price: "6,914.55", change: "+1.39%" },
  { symbol: "TATAMOTORS", price: "812.45", change: "+3.07%" },
  { symbol: "SUNPHARMA", price: "1,572.80", change: "+0.54%" },
  { symbol: "ICICIBANK", price: "1,218.65", change: "+0.31%" },
  { symbol: "SBIN", price: "793.50", change: "-0.28%" },
  { symbol: "LTIM", price: "4,901.25", change: "+1.75%" },
  { symbol: "MARUTI", price: "11,843.00", change: "+0.96%" },
  { symbol: "AXISBANK", price: "1,094.30", change: "-0.61%" },
  { symbol: "NESTLEIND", price: "2,187.40", change: "+0.19%" },
  { symbol: "HCLTECH", price: "1,521.60", change: "+1.03%" },
];

function Chip({ symbol, price, change }: { symbol: string; price: string; change: string }) {
  const positive = change.startsWith("+");
  return (
    <Link
      href={`/stocks/${symbol}`}
      className="inline-flex items-center gap-3 px-4 py-2 border-r border-border shrink-0 hover:bg-muted transition-colors"
    >
      <span className="font-mono text-xs font-semibold text-foreground tracking-wider">{symbol}</span>
      <span className="font-mono text-xs text-foreground/70">₹{price}</span>
      <span
        className="font-mono text-xs font-medium"
        style={{ color: positive ? "rgb(var(--positive))" : "rgb(var(--negative))" }}
      >
        {change}
      </span>
    </Link>
  );
}

export default function MarqueeTicker() {
  const doubled = [...TICKERS, ...TICKERS];
  return (
    <div
      className="w-full overflow-hidden border-y border-border bg-card group"
    >
      <div
        className="flex"
        style={{
          animation: "marquee 40s linear infinite",
          width: "max-content",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
        }}
      >
        {doubled.map((t, i) => (
          <Chip key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
