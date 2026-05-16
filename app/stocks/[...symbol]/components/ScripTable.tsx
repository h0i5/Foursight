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
  } = stockData;

  const isPositive = dayChangePerc > 0;

  const metrics = [
    { label: "Open", value: `₹${open}` },
    { label: "Volume", value: Number(volume).toLocaleString("en-IN") },
    { label: "Upper Circuit", value: `₹${highPriceRange}` },
    { label: "Prev. Close", value: `₹${close}` },
    {
      label: "Day Change",
      value: `${isPositive ? "+" : ""}${dayChangePerc.toFixed(2)}%`,
      colored: true,
      positive: isPositive,
    },
    { label: "Lower Circuit", value: `₹${lowPriceRange}` },
    { label: "Total Buy Qty", value: Number(totalBuyQty).toLocaleString("en-IN") },
    { label: "Total Sell Qty", value: Number(totalSellQty).toLocaleString("en-IN") },
    { label: "Last Trade Qty", value: Number(lastTradeQty).toLocaleString("en-IN") },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {metrics.map(({ label, value, colored, positive }, i) => (
        <div key={i} className="flex flex-col">
          <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-1">
            {label}
          </div>
          <div
            className={`text-base font-mono tabular-nums ${
              colored
                ? positive
                  ? "text-positive"
                  : "text-negative"
                : "text-foreground"
            }`}
          >
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
