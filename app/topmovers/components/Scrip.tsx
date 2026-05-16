import { Suspense } from "react";
import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function Scrip(props: {
  title: string;
  ltp: number;
  symbol: string;
  change: number;
  changePercent: number;
  opening: number;
  closing: number;
  equityType: string;
  yearlyHigh: number;
  yearlyLow: number;
  marketCap: string;
  logoUrl?: string;
}) {
  const isPositive = props.change > 0;

  let marketCapValue = "N/A";
  if (props.marketCap) {
    const marketCapNum =
      typeof props.marketCap === "string"
        ? parseFloat(props.marketCap)
        : props.marketCap;
    if (marketCapNum && !isNaN(marketCapNum) && marketCapNum > 0) {
      marketCapValue = marketCapNum.toLocaleString("en-IN", { maximumFractionDigits: 2 });
    }
  }

  return (
    <Suspense fallback={<div className="h-64 bg-card border border-border" />}>
      <NavTransition className="block h-full" href={`/stocks/${encodeURIComponent(props.symbol)}`}>
        <div className="flex flex-col border border-border bg-card p-6 hover:bg-muted transition-colors h-full">
          <div className="flex flex-row items-center gap-3 mb-3">
            {props.logoUrl && (
              <img
                src={props.logoUrl}
                alt={props.title}
                className="w-8 h-8 object-contain opacity-80 flex-shrink-0"
              />
            )}
            <div>
              <span className="text-xs font-mono text-muted-foreground tracking-wider block">
                {props.symbol}
              </span>
              <span className="text-sm font-medium text-foreground line-clamp-1">
                {props.title}
              </span>
            </div>
          </div>

          <div className="mb-5">
            <p className={`text-2xl font-mono font-semibold mb-1 ${isPositive ? "text-positive" : "text-negative"}`}>
              ₹{props.ltp}
            </p>
            <p className={`text-xs font-mono ${isPositive ? "text-positive" : "text-negative"}`}>
              {isPositive ? "+" : ""}{props.change} ({isPositive ? "+" : ""}{props.changePercent}%)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-auto">
            {[
              { label: "Opening", value: `₹${props.opening}` },
              { label: "52W High", value: `₹${props.yearlyHigh}` },
              { label: "Closing", value: `₹${props.closing}` },
              { label: "52W Low", value: `₹${props.yearlyLow}` },
              { label: "Equity Type", value: props.equityType },
              { label: "Market Cap", value: `${marketCapValue} Cr` },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xs font-mono text-foreground/50 mb-0.5 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-xs font-mono text-foreground">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </NavTransition>
    </Suspense>
  );
}
