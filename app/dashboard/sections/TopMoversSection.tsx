import TopLosers from "./TopLosers";
import TopGainers from "./TopGainers";
import { NavTransition } from "@/app/components/navbar/NavTransition";

export default function TopMoversSection(props: any) {
  const { data } = props;
  
  return (
    <div className="space-y-12">
      <div>
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#037a68]">Top Gainers</h2>
          <NavTransition href="/topmovers" className="text-sm font-mono text-[#037a68] hover:underline">
            VIEW MORE
          </NavTransition>
        </div>
        <TopGainers data={data.TOP_GAINERS} />
      </div>
      
      <div>
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#ce0000]">Top Losers</h2>
          <NavTransition href="/topmovers" className="text-sm font-mono text-[#037a68] hover:underline">
            VIEW MORE
          </NavTransition>
        </div>
        <TopLosers data={data.TOP_LOSERS} />
      </div>
    </div>
  );
}
