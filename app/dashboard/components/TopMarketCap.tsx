"use client";
import { NavTransition } from "@/app/components/navbar/NavTransition";
import { useRouter } from "next/navigation";

export default function TopMarketCap(props: any) {
  const { data } = props;
  const router = useRouter();

  return (
    <div>
      <div className="border-t border-dashed border-border pt-4 mb-4">
        <span className="text-xs font-mono text-muted-foreground tracking-wider">04 / MARKET CAP</span>
      </div>
      <div className="border border-border bg-card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="text-left py-3 px-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                #&nbsp;&nbsp;Company
              </th>
              <th className="text-right py-3 px-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                Price
              </th>
              <th className="text-right py-3 px-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                Mkt Cap
              </th>
              <th className="text-right py-3 px-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                52W High
              </th>
              <th className="text-right py-3 px-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                52W Low
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.records?.map((coin: any, index: number) => {
              if (!coin || !coin.nseScriptCode) return null;

              const isPositive = coin.livePriceDto?.dayChange > 0;
              const marketCapValue = coin.marketCap
                ? (parseInt(coin.marketCap) / 10000000).toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })
                : "N/A";

              return (
                <tr
                  key={coin.nseScriptCode || `market-cap-${index}`}
                  onClick={() => router.push(`/stocks/${encodeURIComponent(coin.nseScriptCode)}`)}
                  className="border-b border-border last:border-b-0 hover:bg-muted transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-foreground/30 w-5 shrink-0 text-right">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {coin.companyName || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-mono font-semibold text-foreground">
                        ₹{coin.livePriceDto?.ltp || "0.00"}
                      </span>
                      <span className={`text-xs font-mono ${isPositive ? "text-positive" : "text-negative"}`}>
                        {coin.livePriceDto?.dayChange !== undefined
                          ? `${isPositive ? "+" : ""}${coin.livePriceDto.dayChange.toFixed(2)} (${isPositive ? "+" : ""}${coin.livePriceDto.dayChangePerc?.toFixed(2) || "0.00"}%)`
                          : "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-sm text-foreground/60">
                    {marketCapValue} Cr
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-sm text-foreground/60">
                    ₹{coin.yearlyHighPrice || "N/A"}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-sm text-foreground/60">
                    ₹{coin.yearlyLowPrice || "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
