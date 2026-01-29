import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { NavTransition } from "./navbar/NavTransition";

export default function RouterComponent() {
  const pathname = usePathname();
  const pathArray: any = pathname.split("/");
  const objectArray: any = {
    "": "Home",
    about: "About",
    contact: "Contact",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    topmovers: "Top Movers",
    watchlist: "Watchlist",
    portfolio: "Portfolio",
    stocks: "Stocks",
  };

  return (
    <div className="mr-6 md:mx-0 py-4">
      <div className="flex flex-row flex-wrap items-center gap-2">
        {pathArray.map((path: any, index: number) => {
          const isLast = index === pathArray.length - 1;
          return (
            <div key={path + index} className="flex items-center gap-2">
              <NavTransition
                href={`/${path}`}
                className={`text-xs font-mono ${
                  isLast
                    ? "text-black"
                    : "text-black/70 hover:text-black hover:underline"
                }`}
              >
                {objectArray[path]
                  ? objectArray[path]
                  : path.charAt(0).toUpperCase() + path.slice(1)}
              </NavTransition>
              {!isLast && (
                <span className="text-xs text-black/50 font-mono">&gt;</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// {pathArray.map((path: any) => {
//   return objectArray[path]
//     ? objectArray[path]
//     : path.charAt(0).toUpperCase() + path.slice(1);
// })}

// <div className="md:mt-4 mx-6 md:mx-0">
//   <div className="flex flex-row">
//     <p className="text-xs text-[#1E1E1E] font-light mr-2 ">
//       <Link className="hover:underline" href={"/"}>
//         {" "}
//         Home
//       </Link>{" "}
//       &gt;{" "}
//     </p>
//     <p className="text-xs text-[#1E1E1E] font-light mr-2">
//       <Link className="hover:underline" href={"/stocks"}>
//         {" "}
//         Stocks
//       </Link>{" "}
//       &gt;{" "}
//     </p>
//     <p className="line-clamp-1 text-xs text-[#1E1E1E] font-light mr-2">
//       {symbol}
//     </p>
//   </div>
