export default function IndicesComponent(props: any) {
  let data = props.data;
  const isPositive = data.data?.dayChange > 0;
  const accentColor = isPositive ? "#037a68" : "#ce0000";
  
  return (
    <div className="flex flex-col px-6 py-4 border border-[#374151] bg-white min-w-[140px] hover:border-black transition-colors relative">
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: accentColor }}
      ></div>
      <div className="pl-3">
        <div className={`text-xs font-mono font-medium mb-3 ${isPositive ? "text-[#037a68]" : "text-[#ce0000]"}`}>
          {data.name}
        </div>
        <div className={`${isPositive ? "text-[#037a68]" : "text-[#ce0000]"} font-mono`}>
          <p className="text-lg font-semibold mb-1">{data.data?.value}</p>
          <div className="flex flex-row gap-1 text-xs">
            <span>{data.data?.dayChange.toFixed(2)}</span>
            <span>({data.data?.dayChangePerc.toFixed(2)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
