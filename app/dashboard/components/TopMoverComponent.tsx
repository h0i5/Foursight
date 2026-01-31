import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function TopMoverComponent(props: any) {
  let { companyName, ltp, dayChange, dayChangePerc, symbol, logoUrl } = props;
  const isPositive = dayChange > 0;
  const accentColor = isPositive ? "#037a68" : "#ce0000";

  return (
    <NavTransition
      className="block"
      href={`/stocks/${encodeURIComponent(symbol)}`}
    >
      <div className="flex flex-col border border-[#374151] bg-white p-4 min-w-[180px] hover:border-black transition-colors relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{ backgroundColor: accentColor }}
        ></div>
        <div className="pl-3">
          <div className="flex flex-row items-center gap-2 mb-3">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={companyName}
                className="w-8 h-8 object-contain flex-shrink-0"
              />
            )}
            <h1 className="text-sm font-medium text-black line-clamp-1">
              {companyName}
            </h1>
          </div>
          <div
            className={`flex flex-col font-mono ${
              isPositive ? "text-[#037a68]" : "text-[#ce0000]"
            }`}
          >
            <h1 className="text-lg font-semibold mb-1">₹{ltp}</h1>
            <div className="flex flex-row gap-1 text-xs">
              <span>{dayChange.toFixed(2)}</span>
              <span>({dayChangePerc.toFixed(2)}%)</span>
            </div>
          </div>
        </div>
      </div>
    </NavTransition>
  );
}
