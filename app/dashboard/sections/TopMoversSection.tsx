import TopLosers from "./TopLosers";
import TopGainers from "./TopGainers";
import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function TopMoversSection(props: any) {
  const { data } = props;

  if (!data?.TOP_GAINERS && !data?.TOP_LOSERS) return null;

  return (
    <div className="space-y-12">
      <div>
        <div className="border-t border-dashed border-border pt-4 mb-4 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">GAINERS</span>
          <NavTransition href="/topmovers" className="text-xs font-mono text-positive hover:underline shrink-0">
            VIEW MORE →
          </NavTransition>
        </div>
        <TopGainers data={data.TOP_GAINERS} />
      </div>

      <div>
        <div className="border-t border-dashed border-border pt-4 mb-4 flex items-center justify-between">
          <span className="text-xs font-mono text-muted-foreground tracking-wider">LOSERS</span>
          <NavTransition href="/topmovers" className="text-xs font-mono text-negative hover:underline shrink-0">
            VIEW MORE →
          </NavTransition>
        </div>
        <TopLosers data={data.TOP_LOSERS} />
      </div>
    </div>
  );
}
