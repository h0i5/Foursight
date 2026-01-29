"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import TopGainers from "./components/sections/TopGainers";
import TopLosers from "./components/sections/TopLosers";
import TopVolume from "./components/sections/TopVolume";
import axios from "axios";
import { apiURL } from "../components/apiURL";
import RouterComponent from "../components/RouterComponent";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export default function TopMovers() {
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
  const [display, setDisplay] = useState("Gainers");

  useEffect(() => {
    async function getTopMoverData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/topmovers`, {
          size: 10,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
      setTopMovers(data?.data);
      return data?.data;
    }
    getTopMoverData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <div className="text-center md:text-start flex flex-col md:mx-[15%]">
        <Navbar logStatus={true} />
      </div>
      <main className="flex-grow px-6 md:px-0 max-w-full md:mx-[15%]">
        <div className="mb-4">
          <RouterComponent />
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 text-black">Top Movers</h1>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setDisplay("Gainers")}
              className={`px-6 py-3 text-sm font-mono border border-[#374151] transition-colors ${
                display === "Gainers"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black hover:border-black"
              }`}
            >
              GAINERS
            </button>
            <button
              onClick={() => setDisplay("Losers")}
              className={`px-6 py-3 text-sm font-mono border border-[#374151] transition-colors ${
                display === "Losers"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black hover:border-black"
              }`}
            >
              LOSERS
            </button>
            <button
              onClick={() => setDisplay("Volume")}
              className={`px-6 py-3 text-sm font-mono border border-[#374151] transition-colors ${
                display === "Volume"
                  ? "bg-black text-white border-black"
                  : "bg-white text-black hover:border-black"
              }`}
            >
              VOLUME
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex flex-col border border-[#374151] bg-white p-6 hover:border-black transition-colors relative h-full"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/10"></div>
                <div className="pl-4">
                  <div className="h-6 w-32 bg-black/10 mb-4"></div>
                  <div className="mb-6">
                    <div className="flex flex-row items-baseline gap-3 mb-2">
                      <div className="h-7 w-24 bg-black/10"></div>
                      <div className="h-4 w-20 bg-black/10"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div key={j}>
                        <div className="h-3 w-16 bg-black/10 mb-1"></div>
                        <div className="h-4 w-20 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {display === "Gainers" && (
              <TopGainers type="Gainers" apiData={topMovers.TOP_GAINERS.items} />
            )}
            {display === "Losers" && (
              <TopLosers type="Losers" apiData={topMovers.TOP_LOSERS.items} />
            )}
            {display === "Volume" && (
              <TopVolume type="Volume" apiData={topMovers.TOP_VOLUME.items} />
            )}
          </div>
        )}
      </main>
      <div className="mx-6 md:mx-[15%] mt-8">
        <Footer />
      </div>
    </div>
  );
}
