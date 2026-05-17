"use client";
import { useEffect, useState } from "react";
import WatchlistScrip from "./components/WatchlistScrip";
import { apiURL } from "../components/apiURL";
import axios from "axios";
import { getCookie } from "cookies-next";
import { NavTransition } from "../components/navbar/NavTransition";

export default function WatchlistPage() {
  const [watchlistData, setWatchlistData] = useState<any>({});
  const token = getCookie("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWatchListData() {
      try {
        const data = await axios({
          method: "post",
          url: apiURL + "/getWatchList",
          headers: { Authorization: "Bearer " + token },
        });
        setWatchlistData(data?.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getWatchListData();
  }, [token]);

  function handleRemove(symbol: string) {
    setWatchlistData((prev: any) => {
      const next = { ...prev };
      delete next[symbol];
      return next;
    });
  }

  const watchlistItems = Object.keys(watchlistData || {});
  const isEmpty = !loading && watchlistItems.length === 0;

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div
          className="mt-8 mb-8"
        >
          <span className="text-xs font-mono text-muted-foreground tracking-wider">WATCHLIST</span>
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-border bg-card p-6 hover:bg-muted transition-colors">
                <div className="h-3 w-20 bg-foreground/10 mb-3"></div>
                <div className="h-4 w-32 bg-foreground/10 mb-4"></div>
                <div className="h-7 w-24 bg-foreground/10 mb-1"></div>
                <div className="h-3 w-16 bg-foreground/10 mb-6"></div>
                <div className="h-9 w-full bg-foreground/10"></div>
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <div className="py-20 text-center border border-border bg-card">
            <div className="max-w-md mx-auto px-6">
              <h2 className="text-2xl font-bold font-mono mb-4 text-foreground">
                YOUR WATCHLIST IS EMPTY
              </h2>
              <p className="text-foreground/70 mb-8 font-sans">
                Start tracking stocks by adding them to your watchlist from any stock page.
              </p>
              <NavTransition
                href="/stocks"
                className="inline-block px-8 py-4 text-background bg-foreground hover:bg-foreground/90 transition-colors text-sm font-mono border border-foreground"
              >
                BROWSE STOCKS
              </NavTransition>
            </div>
          </div>
        ) : (
          <div
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          >
            {watchlistItems.map((key: any) => {
              const scrip = watchlistData[key];
              return <WatchlistScrip key={key} scrip={scrip} onRemove={handleRemove} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
