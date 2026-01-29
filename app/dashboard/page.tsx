"use client";
import TopMovers from "../components/sections/TopMovers/TopMovers";
import Navbar from "../components/navbar/Navbar";
import { useEffect, useState } from "react";
import parseJwt from "../components/navbar/utils/parseJwt";
import { getCookie } from "cookies-next";
import { NavTransition } from "../components/navbar/NavTransition";
import marketCap from "./handlers/marketCap";
import getIndices from "./handlers/indices";
import getNews from "./handlers/news";
import IndicesSection from "./sections/IndicesSection";
import NewsSection from "./sections/NewsSection";
import TopMoversSection from "./sections/TopMoversSection";
import getTopMovers from "./handlers/topMovers";
import TopMarketCap from "./components/TopMarketCap";
import RouterComponent from "../components/RouterComponent";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

export default function DashboardPage() {
  let token = getCookie("token");
  const [username, setUsername] = useState("");
  const [marketCapData, setMarketCapData] = useState<any>([]);
  const [indicesData, setIndicesData] = useState<any>({});
  const [news, setNews] = useState([]);
  const [topMovers, setTopMovers] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenContents;
    if (token) {
      tokenContents = parseJwt(token);
      setUsername(tokenContents?.username || "");
    }

    async function declareVariables() {
      let marketCapData, indicesData, topMoversData, news;
      try {
        marketCapData = await marketCap();
        indicesData = await getIndices();
        topMoversData = await getTopMovers();
        // news = await getNews();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
      setMarketCapData(marketCapData?.data);
      setIndicesData(indicesData?.data);
      setTopMovers(topMoversData?.data);
      // setNews(news?.data);
    }
    declareVariables();
  }, [token]);

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
          <h1 className="text-2xl font-bold font-mono text-black">
            Welcome back,{" "}
            {loading ? (
              <span className="inline-flex items-center">
                <Loading />
              </span>
            ) : (
              <span className="text-[#037a68]">{username}</span>
            )}
          </h1>
        </div>

        <div className="space-y-12 max-w-full mb-12">
          {loading ? (
            <>
              <div className="w-full">
                <div className="h-6 w-24 bg-black/10 mb-4"></div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="flex flex-col px-6 py-4 border border-[#374151] bg-white min-w-[140px]"
                    >
                      <div className="h-3 w-16 bg-black/10 mb-3"></div>
                      <div className="h-5 w-20 bg-black/10 mb-1"></div>
                      <div className="h-3 w-12 bg-black/10"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-12">
                <div>
                  <div className="h-6 w-32 bg-black/10 mb-4"></div>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col border border-[#374151] bg-white p-4 min-w-[180px]"
                      >
                        <div className="h-4 w-24 bg-black/10 mb-3"></div>
                        <div className="h-5 w-16 bg-black/10 mb-1"></div>
                        <div className="h-3 w-12 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="h-6 w-32 bg-black/10 mb-4"></div>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex flex-col border border-[#374151] bg-white p-4 min-w-[180px]"
                      >
                        <div className="h-4 w-24 bg-black/10 mb-3"></div>
                        <div className="h-5 w-16 bg-black/10 mb-1"></div>
                        <div className="h-3 w-12 bg-black/10"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="h-6 w-40 bg-black/10 mb-6"></div>
                <div className="border border-[#374151] bg-white">
                  <div className="border-b border-[#374151] px-6 py-4">
                    <div className="grid grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-3 w-16 bg-black/10"></div>
                      ))}
                    </div>
                  </div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="border-b border-[#374151] px-6 py-4 last:border-b-0"
                    >
                      <div className="grid grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <div key={j} className="h-4 w-20 bg-black/10"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <IndicesSection data={indicesData} />
              <TopMoversSection data={topMovers} />
              <TopMarketCap data={marketCapData} />
            </>
          )}
        </div>
      </main>
      <div className="mx-6 md:mx-[15%] mt-8">
        <Footer />
      </div>
    </div>
  );
}
