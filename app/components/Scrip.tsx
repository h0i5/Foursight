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
  logoUrl?: string;
}) {
  return (
    <Suspense
      fallback={
        <div className="text-2xl font-extrabold text-foreground">Loading...</div>
      }
    >
      <div className="min-w-[450px] md:min-w-[500px] flex flex-col border border-border p-6 bg-card hover:border-muted-foreground transition-colors">
        <Link href={`/stocks/${encodeURIComponent(props.symbol)}`}>
          <div className="flex flex-row items-center gap-3 mb-4">
            {props.logoUrl && (
              <img
                src={props.logoUrl}
                alt={props.title}
                className="w-10 h-10 object-contain flex-shrink-0"
              />
            )}
            <h1 className="text-xl font-bold text-foreground">{props.title}</h1>
          </div>
          <div className="flex flex-row items-baseline gap-4 mb-6">
            <p className="text-2xl font-mono font-semibold text-foreground">
              ₹{props.ltp}
            </p>
            <p
              className={`font-mono text-lg ${
                props.change >= 0 ? "text-positive" : "text-negative"
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
                  <td className="py-2 font-semibold text-foreground">Opening</td>
                  <td className="py-2 pr-4 text-right font-mono text-foreground/70">
                    ₹{props.opening}
                  </td>
                  <td className="py-2 font-semibold text-foreground">52 Wk High</td>
                  <td className="py-2 text-right font-mono text-foreground/70">
                    ₹{props.yearlyHigh}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-foreground">Closing</td>
                  <td className="py-2 pr-4 text-right font-mono text-foreground/70">
                    ₹{props.closing}
                  </td>
                  <td className="py-2 font-semibold text-foreground">52 Wk Low</td>
                  <td className="py-2 text-right font-mono text-foreground/70">
                    ₹{props.yearlyLow}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold text-foreground">Equity Type</td>
                  <td className="py-2 pr-4 text-right font-mono text-foreground/70">
                    {props.equityType}
                  </td>
                  <td className="py-2 font-semibold text-foreground">
                    Market Cap (Cr.)
                  </td>
                  <td className="py-2 text-right font-mono text-foreground/70">
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
