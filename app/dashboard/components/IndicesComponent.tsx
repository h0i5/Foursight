export default function IndicesComponent(props: any) {
  let data = props.data;
  const isPositive = data.data?.dayChange >= 0;

  return (
    <div className="relative flex flex-col px-5 py-4 bg-card min-w-[160px] border border-border hover:bg-muted transition-colors cursor-default overflow-hidden">
      <div className={`absolute top-0 left-0 right-0 h-[2px] ${isPositive ? "bg-positive" : "bg-negative"}`} />
      <span className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase mb-3 mt-1">
        {data.name}
      </span>
      <span className="text-2xl font-mono font-semibold text-foreground mb-1">
        {data.data?.value}
      </span>
      <div className={`flex flex-row gap-1 text-xs font-mono font-medium ${isPositive ? "text-positive" : "text-negative"}`}>
        <span>{isPositive ? "+" : ""}{data.data?.dayChange.toFixed(2)}</span>
        <span>({isPositive ? "+" : ""}{data.data?.dayChangePerc.toFixed(2)}%)</span>
      </div>
    </div>
  );
}
