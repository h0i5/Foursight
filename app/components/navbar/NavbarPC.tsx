import { FaHome } from "react-icons/fa";
import NavbarItem from "./NavbarItem";

export default function NavbarPC() {
  return (
    <div className="flex flex-row justify-between bg-[#BCBCBC] my-2 mx-2 rounded-xl px-2 py-1">
      <div className="flex flex-row">
        <NavbarItem
          title="Home"
          component={<FaHome />}
          link="/"
          active={false}
        />
        <NavbarItem
          title="Watchlist"
          component={<FaHome />}
          link="/watchlist"
          active={false}
        />
        <NavbarItem
          title="Find Stocks"
          component={<FaHome />}
          link="/search"
          active={false}
        />
      </div>
      <div className="flex flex-row">
        <NavbarItem
          title="Top Movers"
          component={<FaHome />}
          link="/topmovers"
          active={false}
        />
        <NavbarItem
          title="Account"
          component={<FaHome />}
          link="/account"
          active={false}
        />
      </div>
    </div>
  );
}