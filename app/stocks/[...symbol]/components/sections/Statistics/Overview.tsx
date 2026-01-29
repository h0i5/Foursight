import ScripTable from "../../ScripTable";
import Orderbook from "../Orderbook";

export default function Overview(props: any) {
  const {
    symbol,
    ltp,
    open,
    close,
    high,
    low,
    volume,
    lowPriceRange,
    highPriceRange,
    totalBuyQty,
    totalSellQty,
    dayChange,
    dayChangePerc,
    lastTradeQty,
    lastTradeTime,
  } = props;

  const isPositive = dayChange >= 0;
  const range = high - low;
  const leftPercent = range > 0 ? (((ltp - low) / range) * 100).toFixed(0) : "50";
  const rightPercent = range > 0 ? (((high - ltp) / range) * 100).toFixed(0) : "50";
  const leftWidth = `${leftPercent}%`;
  const rightWidth = `${rightPercent}%`;

  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <h1 className="text-base font-semibold font-mono mb-4 text-black">
          TODAY&apos;S PERFORMANCE
        </h1>
        <div className="flex max-w-[500px] items-center flex-row mb-4">
          <div
            className={`h-3 ${isPositive ? "bg-[#037a68]" : "bg-[#ce0000]"}`}
            style={{ width: leftWidth }}
          ></div>
          <div className="w-1 h-6 bg-black"></div>
          <div
            className={`h-3 ${isPositive ? "bg-[#037a68]" : "bg-[#ce0000]"}`}
            style={{ width: rightWidth }}
          ></div>
        </div>
        <div className="flex flex-row justify-between max-w-[500px]">
          <div className="flex flex-col">
            <h2 className="text-sm font-mono text-black/60 mb-1">Low</h2>
            <p className="text-base font-mono text-black">₹{low}</p>
          </div>
          <div className="flex flex-col text-right">
            <h2 className="text-sm font-mono text-black/60 mb-1">High</h2>
            <p className="text-base font-mono text-black">₹{high}</p>
          </div>
        </div>
      </div>
      
      <div className="pt-6">
        <ScripTable {...props} />
      </div>
      
      <div className="pt-6">
        <Orderbook symbol={symbol} />
      </div>
    </div>
  );
}
