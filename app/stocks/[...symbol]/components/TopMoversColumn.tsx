import TopMoversItem from "./TopMoversItem";

export default function TopMoversColumn(data: any) {
  const TOP_GAINERS: Array<object> = data.data.TOP_GAINERS.items;
  const TOP_LOSERS: Array<object> = data.data.TOP_LOSERS.items;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-mono text-positive tracking-widest uppercase font-semibold">TOP GAINERS</span>
        </div>
        <div className="border border-border bg-card divide-y divide-border">
          {TOP_GAINERS.map((item: any, index: number) => (
            <TopMoversItem key={item?.company?.nseScriptCode || `gainer-${index}`} data={item} />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-mono text-negative tracking-widest uppercase font-semibold">TOP LOSERS</span>
        </div>
        <div className="border border-border bg-card divide-y divide-border">
          {TOP_LOSERS.map((item: any, index: number) => (
            <TopMoversItem key={item?.company?.nseScriptCode || `loser-${index}`} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
