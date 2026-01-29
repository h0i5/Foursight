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
            {data.data?.records.map((coin: any, index: number) => {
              const isPositive = coin.livePriceDto.dayChange > 0;
              const marketCapValue = (parseInt(coin.marketCap) / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 0 });
              
              return (
                <tr
                  key={coin.id}
                  onClick={() => router.push(`/stocks/${encodeURIComponent(coin.nseScriptCode)}`)}
                  className="border-b border-[#374151] last:border-b-0 hover:bg-black/5 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6">
                    <span
                      className={`text-sm font-medium ${
                        isPositive ? "text-[#037a68]" : "text-[#ce0000]"
                      }`}
                    >
                      {coin.companyName}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-mono font-semibold text-black mb-1">
                        ₹{coin.livePriceDto.ltp}
                      </div>
                      <div
                        className={`text-xs font-mono ${
                          isPositive ? "text-[#037a68]" : "text-[#ce0000]"
                        }`}
                      >
                        {isPositive ? "+" : ""}{coin.livePriceDto.dayChange.toFixed(2)} ({isPositive ? "+" : ""}{coin.livePriceDto.dayChangePerc.toFixed(2)}%)
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-sm text-black/60">
                    {marketCapValue} Cr
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-sm text-[#037a68]">
                    ₹{coin.yearlyHighPrice}
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-sm text-[#ce0000]">
                    ₹{coin.yearlyLowPrice}
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
