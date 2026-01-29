"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import Loading from "@/app/components/Loading";
import { Suspense } from "react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const clientID = searchParams.get("clientID");
    const username = searchParams.get("username");
    const email = searchParams.get("email");
    const error = searchParams.get("error");

    if (error) {
      router.push(`/login?error=${encodeURIComponent(error)}`);
      return;
    }

    if (token && clientID && username) {
      // Parse JWT to get expiration
      function parseJwt(token: string) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          return JSON.parse(window.atob(base64));
        } catch (e) {
          return null;
        }
      }

      const tokenData = parseJwt(token);
      const expires = tokenData?.exp 
        ? new Date(tokenData.exp * 1000)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Default 7 days

      // Store token in cookie (same way as traditional login)
      setCookie("token", token, {
        expires: expires,
      });

      // Store additional data if needed (optional)
      if (clientID) {
        setCookie("clientID", clientID, {
          expires: expires,
        });
      }
      if (username) {
        setCookie("username", username, {
          expires: expires,
        });
      }
      if (email) {
        setCookie("email", email, {
          expires: expires,
        });
      }

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } else {
      // Handle error - redirect back to login
      router.push("/login?error=oauth_failed");
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <Loading />
          <p className="mt-4 text-sm font-mono text-black/60">Completing sign in...</p>
        </div>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loading />
            <p className="mt-4 text-sm font-mono text-black/60">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
