"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import WatchlistScrip from "./components/WatchlistScrip";
import { apiURL } from "../components/apiURL";
import axios from "axios";
import { getCookie } from "cookies-next";
import Loading from "../components/Loading";
import RouterComponent from "../components/RouterComponent";
import { NavTransition } from "../components/navbar/NavTransition";
import Footer from "../components/Footer";

export default function WatchlistPage() {
  const [watchlistData, setWatchlistData] = useState<any>({});
  const token = getCookie("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWatchListData() {
      let data;
      try {
        data = await axios({
          method: "post",
          url: apiURL + "/getWatchList",
          headers: { Authorization: "Bearer " + token },
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
      setWatchlistData(data?.data || {});
      return data?.data;
    }
    getWatchListData();
  }, [token]);

  const watchlistItems = Object.keys(watchlistData || {});
  const isEmpty = !loading && watchlistItems.length === 0;

  return (
    <div className="flex flex-col min-h-screen md:mx-[15%]">
      <Navbar />
      <main className="flex-grow mb-8 mx-6 md:mx-0 overflow-x-hidden max-w-full">
        <div>
          <RouterComponent />
        </div>

        <div className="my-6">
          <h1 className="text-2xl md:text-3xl font-bold font-mono">
            WATCHLIST
          </h1>
        </div>

        {loading ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="border border-[#374151] bg-white p-6 hover:border-black transition-colors"
              >
                <div className="h-5 w-32 bg-black/10 mb-4"></div>
                <div className="h-6 w-24 bg-black/10 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-black/10"></div>
                  <div className="h-3 w-3/4 bg-black/10"></div>
                  <div className="h-3 w-1/2 bg-black/10"></div>
                </div>
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <div className="py-20 text-center border border-[#374151] bg-white">
            <div className="max-w-md mx-auto px-6">
              <h2 className="text-2xl font-bold font-mono mb-4 text-black">
                YOUR WATCHLIST IS EMPTY
              </h2>
              <p className="text-black/70 mb-8 font-sans">
                Start tracking stocks by adding them to your watchlist from any
                stock page.
              </p>
              <NavTransition
                href="/stocks"
                className="inline-block px-8 py-4 text-white bg-black hover:bg-black/90 transition-colors text-sm font-mono border border-black"
              >
                BROWSE STOCKS
              </NavTransition>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {watchlistItems.map((key: any) => {
              const scrip = watchlistData[key];
              return <WatchlistScrip key={key} scrip={scrip} />;
            })}
          </div>
        )}
      </main>
      <div className="mx-6 md:mx-0 mt-8">
        <Footer />
      </div>
    </div>
  );
}
