import Scrip from "../Scrip";

export default function TopVolume() {
  return (
    <div className="mt-12 mx-4">
      <table className=" w-full ">
        <tbody className="py-4">
          <tr>
            <td className="px-2">
              <h1 className="text-black text-3xl font-semibold my-4">
                Top Volume
              </h1>
            </td>
            <td>
              <h1 className="text-black text-3xl font-semibold ">LTP</h1>
            </td>
            <td>
              <h1 className="text-black text-3xl font-semibold ">52W High</h1>
            </td>
            <td>
              <h1 className="text-black text-3xl font-semibold ">52W Low</h1>
            </td>
            <td>
              <h1 className="text-black text-3xl font-semibold ">Volume</h1>
            </td>
          </tr>
          <Scrip
            title="Reliance Industries"
            ltp={2500}
            symbol="RELIANCE"
            change={5}
            changePercent={0.5}
            volume="7.15M"
            yearlyHigh={2600}
            yearlyLow={2300}
            color="Black"
          />
          <Scrip
            title="Reliance Industries"
            ltp={2500}
            symbol="RELIANCE"
            change={5}
            changePercent={0.5}
            volume="7.15M"
            yearlyHigh={2600}
            yearlyLow={2300}
            color="Black"
          />
          <Scrip
            title="Reliance Industries"
            ltp={2500}
            symbol="RELIANCE"
            change={5}
            changePercent={0.5}
            volume="7.15M"
            yearlyHigh={2600}
            yearlyLow={2300}
            color="Black"
          />
          <Scrip
            title="Reliance Industries"
            ltp={2500}
            symbol="RELIANCE"
            change={5}
            changePercent={0.5}
            volume="7.15M"
            yearlyHigh={2600}
            yearlyLow={2300}
            color="Black"
          />
        </tbody>
      </table>
    </div>
  );
}