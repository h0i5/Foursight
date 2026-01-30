"use client";
import { NavTransition } from "@/app/components/navbar/NavTransition";
import { useRouter } from "next/navigation";

export default function TopMarketCap(props: any) {
  const { data } = props;
  const router = useRouter();

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-black">Top By Market Cap</h2>
      <div className="border border-[#374151] bg-white overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#374151]">
              <th className="text-left py-4 px-6 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                Company
              </th>
              <th className="text-right py-4 px-6 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                Price
              </th>
              <th className="text-right py-4 px-6 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="text-right py-4 px-6 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                52W High
              </th>
              <th className="text-right py-4 px-6 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                52W Low
              </th>
            </tr>
          </thead>
          <tbody>
            {data.data?.records?.map((coin: any, index: number) => {
              if (!coin || !coin.nseScriptCode) return null;

              const isPositive = coin.livePriceDto?.dayChange > 0;
              const marketCapValue = coin.marketCap
                ? (parseInt(coin.marketCap) / 10000000).toLocaleString(
                    "en-IN",
                    { maximumFractionDigits: 0 },
                  )
                : "N/A";

              return (
                <tr
                  key={coin.nseScriptCode || `market-cap-${index}`}
                  onClick={() =>
                    router.push(
                      `/stocks/${encodeURIComponent(coin.nseScriptCode)}`,
                    )
                  }
                  className="border-b border-[#374151] last:border-b-0 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? "text-[#037a68]" : "text-[#ce0000]"
                      }`}
                    >
                      {coin.companyName || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-mono font-semibold text-black mb-1">
                        ₹{coin.livePriceDto?.ltp || "0.00"}
                      </div>
                      <div
                        className={`text-xs font-mono ${
                          isPositive ? "text-[#037a68]" : "text-[#ce0000]"
                        }`}
                      >
                        {coin.livePriceDto?.dayChange !== undefined
                          ? `${isPositive ? "+" : ""}${coin.livePriceDto.dayChange.toFixed(2)} (${isPositive ? "+" : ""}${coin.livePriceDto.dayChangePerc?.toFixed(2) || "0.00"}%)`
                          : "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-sm text-black/60">
                    {marketCapValue} Cr
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-sm text-[#037a68]">
                    ₹{coin.yearlyHighPrice || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-sm text-[#ce0000]">
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
