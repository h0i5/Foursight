"use client";
import { apiURL } from "@/app/components/apiURL";
import { NavTransition } from "@/app/components/navbar/NavTransition";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

export default function OrderPage() {
  let token = getCookie("token");
  const [details, setDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const results = await axios({
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
    getOrders();
  }, [token]);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 mb-16">
      <div className="max-w-7xl mx-auto">
        <div className="mt-8 mb-8">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">ORDER BOOK</span>
        </div>

        {loading ? (
          <div className="border border-border bg-card">
            <div className="border-b border-border px-4 py-3 bg-muted">
              <div className="grid grid-cols-6 gap-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                <div className="text-left">SCRIP</div>
                <div className="text-right">QUANTITY</div>
                <div className="text-right">PRICE</div>
                <div className="text-right">TYPE</div>
                <div className="text-right">DATE</div>
                <div className="text-right">TIME</div>
              </div>
            </div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b border-border px-4 py-3 last:border-b-0">
                <div className="grid grid-cols-6 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <div key={j} className="h-4 w-20 bg-foreground/10"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : details.length === 0 ? (
          <div className="border border-border bg-card py-12 text-center">
            <p className="text-sm font-mono text-foreground/60">No orders yet</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="border border-border bg-card min-w-[800px]">
              <div className="border-b border-border px-4 py-3 bg-muted">
                <div className="grid grid-cols-6 gap-4 text-xs font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                  <div className="text-left">SCRIP</div>
                  <div className="text-right">QUANTITY</div>
                  <div className="text-right">PRICE</div>
                  <div className="text-right">TYPE</div>
                  <div className="text-right">DATE</div>
                  <div className="text-right">TIME</div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {details.map((order: any) => {
                  if (!order || !order.scrip) return null;
                  const isSell = order.type === "SELL";
                  const price = order.price || 0;
                  const quantity = order.quantity || 0;
                  const date = order.time ? new Date(order.time).toLocaleDateString() : "N/A";
                  const time = order.time ? new Date(order.time).toLocaleTimeString() : "N/A";

                  return (
                    <div
                      key={`${order.scrip}-${order.time || Math.random()}`}
                      className="px-4 py-3 hover:bg-muted transition-colors"
                    >
                      <div className="grid grid-cols-6 gap-4 text-sm font-mono items-center">
                        <div className="text-left">
                          <NavTransition
                            href={`/stocks/${encodeURIComponent(order.scrip)}`}
                            className="font-semibold text-foreground hover:underline"
                          >
                            {order.scrip}
                          </NavTransition>
                        </div>
                        <div className="text-right text-foreground">{quantity}</div>
                        <div className={`text-right font-semibold ${isSell ? "text-negative" : "text-positive"}`}>
                          ₹{price.toFixed(1)}
                        </div>
                        <div className={`text-right font-semibold ${isSell ? "text-negative" : "text-positive"}`}>
                          {order.type || "N/A"}
                        </div>
                        <div className="text-right text-foreground">{date}</div>
                        <div className="text-right text-foreground">{time}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
