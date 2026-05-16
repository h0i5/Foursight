"use client";
import { useEffect, useState, use } from "react";
import axios from "axios";
import { apiURL } from "@/app/components/apiURL";
import { symbols } from "@/app/components/symbols";
import HighChart from "./components/HighChart";
import TopMoversColumn from "./components/TopMoversColumn";
import Link from "next/link";
import LTP from "./components/sections/LTP";
import Stats from "./components/sections/Statistics/Stats";
import BuySellWatch from "./components/sections/BuySellWatch";
import Loading from "@/app/components/Loading";
export const runtime = "edge";
export default function Page({
  params,
}: {
  params: Promise<{
    symbol: string | string[];
  }>;
}) {
  // Unwrap params Promise using React's use hook (Next.js 15+)
  const resolvedParams = use(params);
  const symbol = resolvedParams?.symbol
    ? Array.isArray(resolvedParams.symbol)
      ? resolvedParams.symbol[0]
      : resolvedParams.symbol
    : undefined;

  // Only show error if params exists but symbol is invalid
  if (resolvedParams && !symbol) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg font-mono text-foreground/70">Invalid stock symbol</p>
        </div>
      </div>
    );
  }

  if (!resolvedParams || !symbol) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto flex justify-center">
          <Loading />
        </div>
      </div>
    );
  }
  const [stockData, setStockData] = useState({
    type: "stock",
    symbol: symbol,
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    ltp: 0,
    volume: 0,
    tsInMillis: 0,
    lowPriceRange: 0.0,
    highPriceRange: 0.0,
    totalBuyQty: 0,
    totalSellQty: 0,
    dayChange: 0.0,
    dayChangePerc: 0.0,
    openInterest: null,
    lastTradeQty: 0,
    lastTradeTime: 1720515109,
    prevOpenInterest: null,
    oiDayChange: 0,
    oiDayChangePerc: 0,
    lowTradeRange: null,
    highTradeRange: null,
  });
  const [topMovers, setTopMovers] = useState({
    TOP_GAINERS: {
      items: [],
    },
    TOP_LOSERS: {
      items: [],
    },
    TOP_VOLUME: {
      items: [],
    },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) {
      setLoading(false);
      return;
    }

    // Store symbol in a const after guard check so TypeScript knows it's defined
    const symbolValue = symbol;

    async function getStockData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/getStockQuote`, {
          symbol: btoa(decodeURIComponent(symbolValue)),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
      setStockData(data?.data.stockQuote);
      return data?.data;
    }
    async function getTopMoverData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/topmovers`, {
          size: 10,
        });
      } catch (err) {
        console.error(err);
      }
      setTopMovers(data?.data);
      return data?.data.stockQuote;
    }
    getStockData();
    getTopMoverData();
  }, [symbol]);
  function getCompanyName(symbol: string) {
    if (!symbol) return "";
    let companyName = "";
    const decodedSymbol = decodeURIComponent(symbol);
    symbols.forEach((scrip) => {
      if (scrip.Scrip === decodedSymbol) {
        companyName = scrip["Company Name"];
      }
    });
    return companyName;
  }
  let companyName = symbol ? getCompanyName(symbol) : "";
  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
            <Link href="/stocks" className="hover:text-foreground transition-colors">STOCKS</Link>
            {" / "}{decodeURIComponent(symbol)}
          </span>
        </div>

        <div className="flex w-full flex-col xl:flex-row xl:justify-between gap-8">
          {/* Main column */}
          <div className="xl:w-[60%] flex-1">
            {loading ? (
              <div className="space-y-8">
                <div>
                  <div className="h-4 w-36 bg-foreground/10 mb-3"></div>
                  <div className="h-10 w-44 bg-foreground/10 mb-3"></div>
                  <div className="h-7 w-32 bg-foreground/10"></div>
                </div>
                <div>
                  <div className="border-t border-dashed border-border pt-4 mb-5 flex items-center justify-between">
                    <div className="h-3 w-20 bg-foreground/10"></div>
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => <div key={i} className="h-7 w-10 bg-foreground/10 border border-border" />)}
                    </div>
                  </div>
                  <div className="border border-border bg-card h-[360px] flex items-center justify-center">
                    <Loading />
                  </div>
                </div>
                <div className="border border-border">
                  <div className="bg-muted border-b border-border px-4 py-2">
                    <div className="h-3 w-20 bg-foreground/10"></div>
                  </div>
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="grid grid-cols-2 px-4 py-3 border-b border-border last:border-b-0">
                      <div className="h-3 w-20 bg-foreground/10"></div>
                      <div className="h-3 w-16 bg-foreground/10"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <LTP
                  symbol={symbol}
                  ltp={stockData.ltp}
                  dayChange={stockData.dayChange}
                  dayChangePerc={stockData.dayChangePerc}
                  companyName={companyName}
                />

                <div className="mt-8">
                  <HighChart
                    symbol={
                      Array.isArray(resolvedParams.symbol)
                        ? resolvedParams.symbol
                        : [resolvedParams.symbol]
                    }
                  />
                </div>

                <div className="mt-8 xl:hidden">
                  <BuySellWatch
                    symbol={symbol}
                    companyName={companyName}
                    ltp={stockData.ltp}
                  />
                </div>

                <div className="mt-8">
                  <Stats
                    symbol={symbol}
                    open={stockData.open}
                    close={stockData.close}
                    ltp={stockData.ltp}
                    high={stockData.high}
                    low={stockData.low}
                    volume={stockData.volume}
                    tsInMillis={stockData.tsInMillis}
                    lowPriceRange={stockData.lowPriceRange}
                    highPriceRange={stockData.highPriceRange}
                    totalBuyQty={stockData.totalBuyQty}
                    totalSellQty={stockData.totalSellQty}
                    lastTradeQty={stockData.lastTradeQty}
                    lastTradeTime={stockData.lastTradeTime}
                    dayChange={stockData.dayChange}
                    dayChangePerc={stockData.dayChangePerc}
                    oiDayChange={stockData.oiDayChange}
                    oiDayChangePerc={stockData.oiDayChangePerc}
                    lowTradeRange={stockData.lowTradeRange}
                    highTradeRange={stockData.highTradeRange}
                  />
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden xl:block xl:w-[35%]">
            {loading ? (
              <div className="space-y-10">
                {[0, 1].map(s => (
                  <div key={s}>
                    <div className="mb-3">
                      <div className="h-3 w-24 bg-foreground/10"></div>
                    </div>
                    <div className="border border-border bg-card divide-y divide-border">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex items-center justify-between px-4 py-3">
                          <div>
                            <div className="h-3 w-16 bg-foreground/10 mb-1.5"></div>
                            <div className="h-2.5 w-24 bg-foreground/10"></div>
                          </div>
                          <div className="text-right">
                            <div className="h-3 w-14 bg-foreground/10 mb-1.5"></div>
                            <div className="h-2.5 w-10 bg-foreground/10 ml-auto"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <TopMoversColumn data={topMovers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
