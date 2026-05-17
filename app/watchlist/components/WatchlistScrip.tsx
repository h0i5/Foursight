"use client";
import { apiURL } from "@/app/components/apiURL";
import { symbols } from "@/app/components/symbols";
import axios from "axios";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { sileo } from "sileo";

export default function WatchlistScrip({ scrip, onRemove }: { scrip: any; onRemove: (symbol: string) => void }) {
  const token = getCookie("token") as string | undefined;
  const symbol = scrip.symbol;
  const ltp = scrip.ltp;
  const dayChange = scrip.dayChange;
  const dayChangePerc = scrip.dayChangePerc;
  const isPositive = dayChange > 0;

  function getCompanyName(symbol: string) {
    const found = symbols.find((s) => s.Scrip === decodeURIComponent(symbol));
    return found?.["Company Name"] || "";
  }
  const companyName = getCompanyName(symbol);

  async function handleRemove() {
    try {
      const results = await axios({
        method: "post",
        url: apiURL + "/transaction/removeWatchList",
        headers: { Authorization: "Bearer " + token },
        data: { scrip: symbol },
      });
      if (results.status === 200) {
        sileo.success({ title: "Removed " + symbol + " from watchlist" });
        onRemove(symbol);
      } else {
        sileo.error({ title: "Failed to remove " + symbol + " from watchlist" });
      }
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 200) {
        sileo.success({ title: "Removed " + symbol + " from watchlist" });
        onRemove(symbol);
      } else {
        sileo.error({ title: "Failed to remove " + symbol + " from watchlist" });
      }
    }
  }

  return (
    <div className="flex flex-col border border-border bg-card hover:bg-muted transition-colors h-full">
      <Link href={`/stocks/${encodeURIComponent(symbol)}`} className="flex flex-col p-6 flex-grow">
        <span className="text-xs font-mono text-muted-foreground tracking-wider mb-1">{symbol}</span>
        <span className="text-sm font-medium text-foreground mb-4 line-clamp-1">{companyName}</span>
        <span className={`text-2xl font-mono font-semibold mb-1 ${isPositive ? "text-positive" : "text-negative"}`}>
          ₹{ltp}
        </span>
        <div className={`flex flex-row gap-1 text-xs font-mono ${isPositive ? "text-positive" : "text-negative"}`}>
          <span>{isPositive ? "+" : ""}{dayChange.toFixed(2)}</span>
          <span>({isPositive ? "+" : ""}{dayChangePerc.toFixed(2)}%)</span>
        </div>
      </Link>
      <div className="border-t border-border">
        <button
          onClick={handleRemove}
          className="w-full text-center px-4 py-3 text-xs font-mono text-muted-foreground hover:text-negative hover:bg-muted transition-colors"
        >
          REMOVE
        </button>
      </div>
    </div>
  );
}
