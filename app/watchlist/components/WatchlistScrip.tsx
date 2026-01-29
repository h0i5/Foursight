"use client";
import { apiURL } from "@/app/components/apiURL";
import { symbols } from "@/app/components/symbols";
import axios from "axios";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/use-toast";

export default function WatchlistScrip(props: any) {
  const router = useRouter();
  const { toast } = useToast();
  const symbol = props.scrip.symbol;
  const token = getCookie("token");
  const ltp = props.scrip.ltp;
  const dayChange = props.scrip.dayChange;
  const dayChangePerc = props.scrip.dayChangePerc;
  function getCompanyName(symbol: string) {
    let companyName = "";
    symbols.forEach((scrip) => {
      if (scrip.Scrip === decodeURIComponent(symbol)) {
        companyName = scrip["Company Name"];
      }
    });
    return companyName;
  }
  let companyName = getCompanyName(symbol) || "";

  async function handleWatchlistRemoval(symbol: string) {
    let results;
    try {
      results = await axios({
        method: "post",
        url: apiURL + "/transaction/removeWatchList",
        headers: { Authorization: "Bearer " + token },
        data: {
          scrip: symbol,
        },
      });
    } catch (err: any) {
      results = err.response;
    }
    if (results.status === 200) {
      window.location.reload();
      toast({
        title: "Removed " + symbol + " from watchlist",
      });
    } else {
      toast({
        title: "Failed to remove " + symbol + " from watchlist",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="h-full">
      <div className="flex flex-col border border-[#374151] p-6 h-full bg-white hover:border-black transition-colors">
        <Link href={`/stocks/${encodeURIComponent(symbol)}`}>
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-4 text-black line-clamp-1">
              {companyName}
            </h1>
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-2xl font-mono font-semibold text-black">
                ₹{ltp}
              </h1>
              <div className="flex flex-row items-baseline gap-1">
                <h1
                  className={`${
                    dayChange > 0 ? "text-[#037a68]" : "text-[#ce0000]"
                  } font-mono text-lg`}
                >
                  {dayChange > 0 ? "+" : ""}
                  {dayChange.toFixed(2)}
                </h1>
                <h1
                  className={`${
                    dayChange > 0 ? "text-[#037a68]" : "text-[#ce0000]"
                  } font-mono text-sm`}
                >
                  ({dayChangePerc > 0 ? "+" : ""}
                  {dayChangePerc.toFixed(2)}%)
                </h1>
              </div>
            </div>
          </div>
        </Link>
        <div className="w-full mt-auto">
          <button
            onClick={(e) => {
              handleWatchlistRemoval(symbol);
            }}
            className="w-full text-center border border-[#374151] hover:bg-black hover:text-white hover:border-black transition-colors px-4 py-3 text-sm font-mono"
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}
