"use client";
import { apiURL } from "@/app/components/apiURL";
import Navbar from "@/app/components/navbar/Navbar";
import { NavTransition } from "@/app/components/navbar/NavTransition";
import parseJwt from "@/app/components/navbar/utils/parseJwt";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
import RouterComponent from "@/app/components/RouterComponent";
import Loading from "@/app/components/Loading";
import Footer from "@/app/components/Footer";

export default function OrderPage() {
  let token = getCookie("token");
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tokenContents;
    if (token) {
      tokenContents = parseJwt(token);
    }

    async function getNetworth() {
      let results;
      try {
        results = await axios({
          method: "post",
          url: apiURL + "/auth/getAccountDetails",
          headers: { Authorization: "Bearer " + token },
        });
        setDetails(results.data.orderBook.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getNetworth();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen md:mx-[15%]">
      <Navbar />
      <main className="flex-grow mx-6 md:mx-0 mb-12 overflow-x-hidden max-w-full">
        <div>
          <RouterComponent />
        </div>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-mono text-black">
            ORDER BOOK
          </h1>
        </div>

        {loading ? (
          <div className="border border-[#374151] bg-white">
            <div className="border-b border-[#374151] px-4 py-3 bg-white">
              <div className="grid grid-cols-6 gap-4 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                <div className="text-left">SCRIP</div>
                <div className="text-right">QUANTITY</div>
                <div className="text-right">PRICE</div>
                <div className="text-right">TYPE</div>
                <div className="text-right">DATE</div>
                <div className="text-right">TIME</div>
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="border-b border-[#374151] px-4 py-3 last:border-b-0"
              >
                <div className="grid grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="h-4 w-20 bg-black/10"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : details.length === 0 ? (
          <div className="border border-[#374151] bg-white py-12 text-center">
            <p className="text-sm font-mono text-black/60">No orders yet</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="border border-[#374151] bg-white min-w-[800px]">
              <div className="border-b border-[#374151] px-4 py-3 bg-white">
                <div className="grid grid-cols-6 gap-4 text-xs font-mono font-semibold text-black/60 uppercase tracking-wider">
                  <div className="text-left">SCRIP</div>
                  <div className="text-right">QUANTITY</div>
                  <div className="text-right">PRICE</div>
                  <div className="text-right">TYPE</div>
                  <div className="text-right">DATE</div>
                  <div className="text-right">TIME</div>
                </div>
              </div>
              <div className="divide-y divide-[#374151]">
                {details.map((order: any) => {
                  if (!order || !order.scrip) return null;
                  const isSell = order.type === "SELL";
                  const price = order.price || 0;
                  const quantity = order.quantity || 0;
                  const time = order.time
                    ? new Date(order.time).toLocaleDateString()
                    : "N/A";
                  const timeStr = order.time
                    ? new Date(order.time).toLocaleTimeString()
                    : "N/A";

                  return (
                    <div
                      key={`${order.scrip}-${order.time || Math.random()}`}
                      className="px-4 py-3 hover:bg-black/5 transition-colors"
                    >
                      <div className="grid grid-cols-6 gap-4 text-sm font-mono items-center">
                        <div className="text-left">
                          <NavTransition
                            href={`/stocks/${encodeURIComponent(order.scrip)}`}
                            className="font-semibold text-black hover:underline"
                          >
                            {order.scrip}
                          </NavTransition>
                        </div>
                        <div className="text-right text-black">{quantity}</div>
                        <div
                          className={`text-right font-semibold ${
                            isSell ? "text-[#ce0000]" : "text-[#037a68]"
                          }`}
                        >
                          ₹{price.toFixed(1)}
                        </div>
                        <div
                          className={`text-right font-semibold ${
                            isSell ? "text-[#ce0000]" : "text-[#037a68]"
                          }`}
                        >
                          {order.type || "N/A"}
                        </div>
                        <div className="text-right text-black">{time}</div>
                        <div className="text-right text-black">{timeStr}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
      <div className="mx-6 md:mx-0 mt-8">
        <Footer />
      </div>
    </div>
  );
}
