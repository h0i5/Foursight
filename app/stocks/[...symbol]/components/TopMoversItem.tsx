import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function TopMoversItem(data: any) {
  const nseScriptCode = data.data.company.nseScriptCode;
  const ltp = data.data.stats.ltp.toFixed(2);
  const dayChange = data.data.stats.dayChange.toFixed(2);
  const dayChangePerc = data.data.stats.dayChangePerc.toFixed(2);
  const isPositive = dayChange >= 0;
  const changeColor = isPositive ? "text-[#037a68]" : "text-[#ce0000]";

  return (
    <NavTransition
      href={`/stocks/${encodeURIComponent(nseScriptCode)}`}
      className="block hover:bg-black/5 transition-colors"
    >
      <div className="flex w-full flex-row justify-between items-center px-4 py-3">
        <div className="text-sm font-semibold text-black">
          {nseScriptCode}
        </div>
        <div className="flex flex-row items-baseline gap-2">
          <span className="text-sm font-mono text-black">₹{ltp}</span>
          <span className={`text-sm font-mono ${changeColor}`}>
            {isPositive ? "+" : ""}
            {dayChange} ({isPositive ? "+" : ""}
            {dayChangePerc}%)
          </span>
        </div>
      </div>
    </NavTransition>
  );
}
