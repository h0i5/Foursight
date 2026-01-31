import Link from "next/link";
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
  const accentColor = isPositive ? "#037a68" : "#ce0000";

  // Calculate market cap: API returns values already in crores
  let marketCapValue = "N/A";
  if (props.marketCap) {
    const marketCapNum =
      typeof props.marketCap === "string"
        ? parseFloat(props.marketCap)
        : props.marketCap;
    if (marketCapNum && !isNaN(marketCapNum) && marketCapNum > 0) {
      // Market cap is already in crores, just format it
      marketCapValue = marketCapNum.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });
    }
  }

  return (
    <Suspense
      fallback={<div className="text-lg font-bold text-black">Loading...</div>}
    >
      <NavTransition
        className="block"
        href={`/stocks/${encodeURIComponent(props.symbol)}`}
      >
        <div className="flex flex-col border border-[#374151] bg-white p-6 hover:border-black transition-colors relative h-full">
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: accentColor }}
          ></div>
          <div className="pl-4">
            <div className="flex flex-row items-center gap-3 mb-4">
              {props.logoUrl && (
                <img
                  src={props.logoUrl}
                  alt={props.title}
                  className="w-10 h-10 object-contain"
                />
              )}
              <h1
                className={`text-xl font-semibold ${
                  isPositive ? "text-[#037a68]" : "text-[#ce0000]"
                }`}
              >
                {props.title}
              </h1>
            </div>

            <div className="mb-6">
              <div className="flex flex-row items-baseline gap-3 mb-2">
                <p className="text-2xl font-mono font-semibold text-black">
                  ₹{props.ltp}
                </p>
                <p
                  className={`text-sm font-mono ${
                    isPositive ? "text-[#037a68]" : "text-[#ce0000]"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {props.change} ({isPositive ? "+" : ""}
                  {props.changePercent}%)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <div className="text-xs font-mono font-medium text-black/60 mb-1 uppercase tracking-wider">
                  Opening
                </div>
                <div className="text-sm font-mono text-black">
                  ₹{props.opening}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono font-medium text-black/60 mb-1 uppercase tracking-wider">
                  52W High
                </div>
                <div className="text-sm font-mono text-[#037a68]">
                  ₹{props.yearlyHigh}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono font-medium text-black/60 mb-1 uppercase tracking-wider">
                  Closing
                </div>
                <div className="text-sm font-mono text-black">
                  ₹{props.closing}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono font-medium text-black/60 mb-1 uppercase tracking-wider">
                  52W Low
                </div>
                <div className="text-sm font-mono text-[#ce0000]">
                  ₹{props.yearlyLow}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono font-medium text-black/60 mb-1 uppercase tracking-wider">
                  Equity Type
                </div>
                <div className="text-sm font-mono text-black">
                  {props.equityType}
                </div>
              </div>
              <div>
                <div className="text-xs font-mono font-medium text-black/60 mb-1 uppercase tracking-wider">
                  Market Cap
                </div>
                <div className="text-sm font-mono text-black">
                  {marketCapValue} Cr
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavTransition>
    </Suspense>
  );
}
