import Link from "next/link";
import { Suspense } from "react";

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
}) {
  return (
    <Suspense
      fallback={
        <div className="text-2xl font-extrabold text-black">Loading...</div>
      }
    >
      <div className="min-w-[450px] md:min-w-[500px] flex flex-col border border-[#374151] p-6 bg-white hover:border-black transition-colors">
        <Link href={`/stocks/${encodeURIComponent(props.symbol)}`}>
          <h1 className="text-xl font-bold mb-4 text-black">{props.title}</h1>
          <div className="flex flex-row items-baseline gap-4 mb-6">
            <p className="text-2xl font-mono font-semibold text-black">
              ₹{props.ltp}
            </p>
            <p
              className={`font-mono text-lg ${
                props.change >= 0 ? "text-[#037a68]" : "text-[#ce0000]"
              }`}
            >
              {props.change >= 0 ? "+" : ""}
              {props.change} ({props.changePercent}%)
            </p>
          </div>
          <div>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-2 font-semibold text-black">Opening</td>
                  <td className="py-2 pr-4 text-right font-mono text-black/70">
                    ₹{props.opening}
                  </td>
                  <td className="py-2 font-semibold text-black">52 Wk High</td>
                  <td className="py-2 text-right font-mono text-black/70">
                    ₹{props.yearlyHigh}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-black">Closing</td>
                  <td className="py-2 pr-4 text-right font-mono text-black/70">
                    ₹{props.closing}
                  </td>
                  <td className="py-2 font-semibold text-black">52 Wk Low</td>
                  <td className="py-2 text-right font-mono text-black/70">
                    ₹{props.yearlyLow}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-black">Equity Type</td>
                  <td className="py-2 pr-4 text-right font-mono text-black/70">
                    {props.equityType}
                  </td>
                  <td className="py-2 font-semibold text-black">
                    Market Cap (Cr.)
                  </td>
                  <td className="py-2 text-right font-mono text-black/70">
                    {props.marketCap}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Link>
      </div>
    </Suspense>
  );
}
