import ScripTable from "../../ScripTable";
import Orderbook from "../Orderbook";

export default function Overview(props: any) {
  const {
    symbol,
    ltp,
    high,
    low,
    dayChange,
  } = props;

  const isPositive = dayChange >= 0;
  const range = high - low;
  const ltpPercent = range > 0 ? ((ltp - low) / range) * 100 : 50;
  const clampedPercent = Math.min(100, Math.max(0, ltpPercent));

  return (
    <div className="space-y-10">
      {/* Today's Range */}
      <div>
        <div className="border-t border-dashed border-border pt-4 mb-5">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">TODAY&apos;S RANGE</span>
        </div>
        <div className="max-w-[500px]">
          <div className="relative h-1.5 bg-border mb-3">
            <div
              className={`absolute top-0 left-0 h-full ${isPositive ? "bg-positive" : "bg-negative"}`}
              style={{ width: `${clampedPercent}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-foreground border-2 border-background"
              style={{ left: `calc(${clampedPercent}% - 5px)` }}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-0.5">LOW</div>
              <div className="text-sm font-mono text-foreground tabular-nums">₹{low}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-0.5">HIGH</div>
              <div className="text-sm font-mono text-foreground tabular-nums">₹{high}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div>
        <div className="border-t border-dashed border-border pt-4 mb-5">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">KEY METRICS</span>
        </div>
        <ScripTable {...props} />
      </div>

      {/* Order Book */}
      <div>
        <div className="border-t border-dashed border-border pt-4 mb-5">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">ORDER BOOK</span>
        </div>
        <Orderbook symbol={symbol} />
      </div>
    </div>
  );
}
