"use client";
import Navbar from "@/app/components/navbar/Navbar";
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
import RouterComponent from "@/app/components/RouterComponent";
import Footer from "@/app/components/Footer";
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
    ? (Array.isArray(resolvedParams.symbol) ? resolvedParams.symbol[0] : resolvedParams.symbol)
    : undefined;
  
  // Only show error if params exists but symbol is invalid
  if (resolvedParams && !symbol) {
    return (
      <div className="flex flex-col min-h-screen md:mx-[15%]">
        <Navbar />
        <main className="flex-grow mx-6 md:mx-0 mb-12 overflow-x-hidden max-w-full">
          <div className="py-20 text-center">
            <p className="text-lg font-mono text-black/70">Invalid stock symbol</p>
          </div>
        </main>
      </div>
    );
  }
  
  // If params or symbol is not available yet, show loading
  if (!resolvedParams || !symbol) {
    return (
      <div className="flex flex-col min-h-screen md:mx-[15%]">
        <Navbar />
        <main className="flex-grow mx-6 md:mx-0 mb-12 overflow-x-hidden max-w-full">
          <div className="py-20 text-center">
            <Loading />
          </div>
        </main>
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
    <div className="flex flex-col min-h-screen md:mx-[15%]">
      <Navbar />
      <main className="flex-grow mx-6 md:mx-0 mb-12 overflow-x-hidden max-w-full">
        <div>
          <RouterComponent />
        </div>
        
        <div className="flex w-full flex-col xl:flex-row xl:justify-between gap-8">
          <div className="xl:w-[60%] flex-1">
            {loading ? (
              <div className="space-y-8">
                <div>
                  <div className="h-7 w-48 bg-black/10 mb-3"></div>
                  <div className="flex flex-row items-baseline gap-3">
                    <div className="h-8 w-32 bg-black/10"></div>
                    <div className="h-5 w-24 bg-black/10"></div>
                  </div>
                </div>
                <div className="border border-[#374151] bg-white h-[400px] flex items-center justify-center">
                  <Loading />
                </div>
                <div className="xl:hidden flex gap-2 justify-center">
                  <div className="h-10 w-24 bg-black/10"></div>
                  <div className="h-10 w-24 bg-black/10"></div>
                  <div className="h-10 w-24 bg-black/10"></div>
                </div>
                <div className="border border-[#374151] bg-white p-6 space-y-6">
                  <div className="h-5 w-32 bg-black/10"></div>
                  <div className="grid grid-cols-2 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i}>
                        <div className="h-3 w-20 bg-black/10 mb-1"></div>
                        <div className="h-4 w-24 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
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
                  <HighChart symbol={Array.isArray(resolvedParams.symbol) ? resolvedParams.symbol : [resolvedParams.symbol]} />
                </div>
                
                <div className="my-8 w-full flex justify-center xl:hidden">
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
          
          <div className="hidden xl:block xl:w-[35%]">
            {loading ? (
              <div className="space-y-8">
                <div>
                  <div className="h-5 w-32 bg-black/10 mb-4"></div>
                  <div className="border border-[#374151] bg-white">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="border-b border-[#374151] p-4 last:border-b-0"
                      >
                        <div className="h-4 w-24 bg-black/10 mb-2"></div>
                        <div className="h-5 w-20 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-5 w-32 bg-black/10 mb-4"></div>
                  <div className="border border-[#374151] bg-white">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="border-b border-[#374151] p-4 last:border-b-0"
                      >
                        <div className="h-4 w-24 bg-black/10 mb-2"></div>
                        <div className="h-5 w-20 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <TopMoversColumn data={topMovers} />
            )}
          </div>
        </div>
      </main>
      <div className="mx-6 md:mx-0 mt-8">
        <Footer />
      </div>
    </div>
  );
}
