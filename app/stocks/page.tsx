"use client";
import Link from "next/link";
import Navbar from "../components/navbar/Navbar";
import TopMovers from "../components/sections/TopMovers/TopMovers";
import { useSearchParams } from "next/navigation";
import { symbols } from "../components/symbols";
import { Suspense } from "react";
import RouterComponent from "../components/RouterComponent";
import ScrollableContainer from "../dashboard/components/ScrollableContainer";
import Footer from "../components/Footer";

function StocksPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const filteredSymbols = symbols.filter(
    (scrip) =>
      scrip["Company Name"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      scrip["Scrip"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Suspense>
      <div className="flex flex-col min-h-screen md:mx-[15%]">
        <Navbar />
        <main className="flex-grow mx-6 md:mx-0 overflow-x-hidden max-w-full">
          <div>
            <RouterComponent />
          </div>

          {searchQuery !== "" && (
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 font-mono">
                Showing results for{" "}
                <span className="text-[#037a68]">{searchQuery}</span>
              </h1>
              {filteredSymbols.length > 0 ? (
                <ScrollableContainer>
                  {filteredSymbols.map((scrip) => (
                    <Link
                      key={scrip["Scrip"]}
                      href={`/stocks/${encodeURIComponent(scrip["Scrip"])}`}
                      className="flex flex-col border border-[#374151] p-6 min-w-[280px] hover:border-black transition-colors bg-white"
                    >
                      <p className="font-semibold text-lg mb-2 text-black">
                        {scrip["Company Name"]}
                      </p>
                      <p className="text-sm font-mono text-black/70">
                        {scrip["Scrip"]}
                      </p>
                    </Link>
                  ))}
                </ScrollableContainer>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-lg text-black/70 font-mono">
                    No results found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}

          <div>
            <TopMovers />
          </div>
        </main>
        <div className="mx-6 md:mx-0 mt-8">
          <Footer />
        </div>
      </div>
    </Suspense>
  );
}
export default function Stocks() {
  return (
    <Suspense>
      <StocksPage />
    </Suspense>
  );
}
