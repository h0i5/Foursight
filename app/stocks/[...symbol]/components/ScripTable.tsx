export default function ScripTable(stockData: any) {
  const {
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
    ltp,
    lastTradeTime,
  } = stockData;

  const isPositive = dayChangePerc > 0;

  return (
    <div>
      <h2 className="text-base font-semibold font-mono mb-4 text-black">
        KEY METRICS
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <div className="text-xs font-mono text-black/60 mb-2 uppercase tracking-wider">
            Open
          </div>
          <div className="text-base font-mono text-black">₹{open}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-mono text-black/60 mb-2 uppercase tracking-wider">
            Volume
          </div>
          <div className="text-base font-mono text-black">
            {volume.toLocaleString("en-IN")}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-mono text-black/60 mb-2 uppercase tracking-wider">
            Upper Circuit
          </div>
          <div className="text-base font-mono text-black">₹{highPriceRange}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-mono text-black/60 mb-2 uppercase tracking-wider">
            Yesterday&apos;s Close
          </div>
          <div className="text-base font-mono text-black">₹{close}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-mono text-black/60 mb-2 uppercase tracking-wider">
            Day Change
          </div>
          <div
            className={`text-base font-mono ${
              isPositive ? "text-[#037a68]" : "text-[#ce0000]"
            }`}
          >
            {isPositive ? "+" : ""}
            {dayChangePerc.toFixed(2)}%
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-mono text-black/60 mb-2 uppercase tracking-wider">
            Lower Circuit
          </div>
          <div className="text-base font-mono text-black">₹{lowPriceRange}</div>
        </div>
      </div>
    </div>
  );
}
// {
//     "type": "LIVE_PRICE",
//     "symbol": "RELIANCE",
//     "open": 3195.2,
//     "high": 3201,
//     "low": 3161,
//     "close": 3201.8,
//     "ltp": 3181.7,
//     "volume": 2529805,
//     "tsInMillis": 1720515109,
//     "lowPriceRange": 2881.65,
//     "highPriceRange": 3521.95,
//     "totalBuyQty": 167473,
//     "totalSellQty": 311534,
//     "dayChange": -20.100000000000364,
//     "dayChangePerc": -0.6277718783184572,
//     "openInterest": null,
//     "lastTradeQty": 1,
//     "lastTradeTime": 1720515109,
//     "prevOpenInterest": null,
//     "oiDayChange": 0,
//     "oiDayChangePerc": 0,
//     "lowTradeRange": null,
//     "highTradeRange": null
// }
