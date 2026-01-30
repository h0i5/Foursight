import TopMoversItem from "./TopMoversItem";

export default function TopMoversColumn(data: any) {
  const TOP_GAINERS: Array<object> = data.data.TOP_GAINERS.items;
  const TOP_LOSERS: Array<object> = data.data.TOP_LOSERS.items;
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold font-mono mb-4 text-[#037a68]">
          TOP GAINERS
        </h2>
        <div className="border border-[#374151] bg-white">
          {TOP_GAINERS.map((item: any, index: number) => (
            <div key={item?.company?.nseScriptCode || `top-gainer-${index}`}>
              <TopMoversItem data={item} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold font-mono mb-4 text-[#ce0000]">
          TOP LOSERS
        </h2>
        <div className="border border-[#374151] bg-white">
          {TOP_LOSERS.map((item: any, index: number) => (
            <div key={item?.company?.nseScriptCode || `top-loser-${index}`}>
              <TopMoversItem data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
