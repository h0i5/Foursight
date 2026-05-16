"use client";
import { apiURL } from "@/app/components/apiURL";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
moment().format();

export default function Orderbook(props: any) {
  let symbol = decodeURIComponent(props.symbol);

  const [sellOrdersData, setSellOrdersData] = useState<{ price: number; qty: number }[]>([]);
  const [buyOrdersData, setBuyOrdersData] = useState<{ price: number; qty: number }[]>([]);
  const [time, setTime] = useState("");

  useEffect(() => {
    async function getOrderBookData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/getOrderBook`, { symbol });
      } catch (err) {
        console.error(err);
      }
      setSellOrdersData(data?.data.orderData.sellBook);
      setBuyOrdersData(data?.data.orderData.buyBook);
      const ts = data?.data.orderData.tsInMillis;
      if (ts && ts > 0) {
        setTime(moment(ts * 1000).format("DD MMM YYYY, h:mm A"));
      }
    }
    getOrderBookData();
  }, [symbol]);

  return (
    <div className="border border-border">
      {/* header row */}
      <div className="bg-muted border-b border-border px-4 py-2 flex items-center justify-between">
        <div className="grid grid-cols-2 flex-1 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-positive tracking-widest uppercase">BID</span>
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">PRICE</span>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground tracking-widest uppercase">QTY</span>
          </div>
          <div className="flex items-center gap-3 border-l border-border pl-4">
            <span className="text-[10px] font-mono text-negative tracking-widest uppercase">ASK</span>
            <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">PRICE</span>
            <span className="ml-auto text-[10px] font-mono text-muted-foreground tracking-widest uppercase">QTY</span>
          </div>
        </div>
      </div>

      {/* rows */}
      <div>
        {Array.from({
          length: Math.max(Object.keys(buyOrdersData).length, Object.keys(sellOrdersData).length),
        }).map((_, i) => {
          const buy = (buyOrdersData as any)[i];
          const sell = (sellOrdersData as any)[i];
          return (
            <div key={i} className="grid grid-cols-2 border-b border-border last:border-b-0">
              <div className="flex items-center justify-between px-4 py-2.5 hover:bg-muted transition-colors">
                {buy ? (
                  <>
                    <span className="text-sm font-mono text-foreground tabular-nums">₹{buy.price}</span>
                    <span className="text-sm font-mono text-positive tabular-nums">
                      {buy.qty.toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-mono text-muted-foreground">—</span>
                )}
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 border-l border-border hover:bg-muted transition-colors">
                {sell ? (
                  <>
                    <span className="text-sm font-mono text-foreground tabular-nums">₹{sell.price}</span>
                    <span className="text-sm font-mono text-negative tabular-nums">
                      {sell.qty.toLocaleString("en-IN")}
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-mono text-muted-foreground">—</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {time && (
        <div className="px-4 py-2 border-t border-border bg-muted">
          <span className="text-[10px] font-mono text-muted-foreground">
            UPDATED · {time}
          </span>
        </div>
      )}
    </div>
  );
}
