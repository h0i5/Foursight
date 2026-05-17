"use client";
import { useEffect } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
export default function Logout() {
  const router = useRouter();

  function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (getCookie("token") as string | undefined) {
      deleteCookie("token");
      sleep(500);
      router.push("/");
    }
  });

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
}
