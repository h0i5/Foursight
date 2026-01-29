import { apiURL } from "@/app/components/apiURL";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
moment().format();
export default function Orderbook(props: any) {
  let symbol = decodeURIComponent(props.symbol);

  const [sellOrdersData, setSellOrdersData] = useState<
    { price: number; qty: number }[]
  >([]);
  const [buyOrdersData, setBuyOrdersData] = useState<
    { price: number; qty: number }[]
  >([]);
  const [time, setTime] = useState("");
  useEffect(() => {
    async function getOrderBookData() {
      let data;
      try {
        data = await axios.post(`${apiURL}/getOrderBook`, {
          symbol: symbol,
        });
      } catch (err) {
        console.error(err);
      }
      setSellOrdersData(data?.data.orderData.sellBook);
      setBuyOrdersData(data?.data.orderData.buyBook);
      setTime(
        moment(data?.data.orderData.tsInMillis * 1000).format(
          "MMMM Do YYYY h:mm A"
        )
      );
    }
    getOrderBookData();
  }, [symbol]);

  return (
    <div>
      <h2 className="text-base font-semibold font-mono mb-3 text-black">
        ORDER BOOK
      </h2>
      <div className="mb-4 py-2">
        <p className="text-xs font-mono text-black/60">
          Last Updated: <span className="text-black">{time}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="border border-[#374151] bg-white">
            <div className="px-4 py-2 bg-white">
              <h3 className="text-xs font-mono font-semibold text-black">
                BID PRICE
              </h3>
            </div>
            <div className="divide-y divide-[#374151]">
              {Object.entries(buyOrdersData).map(([key, value]: [string, any]) => (
                <div
                  key={key}
                  className="flex justify-between px-4 py-2 hover:bg-black/5 transition-colors"
                >
                  <span className="text-sm font-mono text-black">₹{value.price}</span>
                  <span className="text-sm font-mono text-[#037a68]">
                    {value.qty.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="border border-[#374151] bg-white">
            <div className="px-4 py-2 bg-white">
              <h3 className="text-xs font-mono font-semibold text-black">
                ASK PRICE
              </h3>
            </div>
            <div className="divide-y divide-[#374151]">
              {Object.entries(sellOrdersData).map(([key, value]: [string, any]) => (
                <div
                  key={key}
                  className="flex justify-between px-4 py-2 hover:bg-black/5 transition-colors"
                >
                  <span className="text-sm font-mono text-black">₹{value.price}</span>
                  <span className="text-sm font-mono text-[#ce0000]">
                    {value.qty.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
