"use client";
import { usernameRegex } from "../components/regexHandlers";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import axios from "axios";
import { apiURL } from "../components/apiURL";
import { useRouter } from "next/navigation";
var crypto = require("crypto");
import { setCookie } from "cookies-next";
import { NavTransition } from "../components/navbar/NavTransition";
import Loading from "../components/Loading";
import { useToast } from "../hooks/use-toast";
import Footer from "../components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  function parseJwt(token: string) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    let hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (username === "" || password === "") {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    } else if (!usernameRegex(username)) {
      toast({
        title: "Enter a valid username!",
        variant: "destructive",
      });
      return;
    }
    let results;
    try {
      results = await axios.post(`${apiURL}/login`, {
        username: username,
        password: hashedPassword,
      });
      setLoading(true);
    } catch (err: any) {
      results = err.response;
    }
    if (results?.status === 200) {
      toast({
        title: "Logged in successfully",
      });
      setCookie("token", results.data.token, {
        expires: new Date(parseJwt(results.data.token).exp * 1000),
      });
      console.log(parseJwt(results.data.token).exp);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else if (results?.status === 401) {
      toast({
        title: "Incorrect Credentials",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="text-center md:text-start flex flex-col md:mx-[15%]">
        <Navbar />
      </div>
      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-black font-mono">WELCOME BACK</h1>
            <p className="text-black/60">
              Sign in to your account to continue trading
            </p>
          </div>
          <form onSubmit={loginHandler} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2 text-black">
                Username
              </label>
              <input
                name="username"
                id="username"
                className="w-full px-4 py-3 border border-[#374151] bg-white text-black text-sm font-mono focus:outline-none focus:border-black transition-colors"
                value={username}
                placeholder="Enter your username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-black">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-[#374151] bg-white text-black text-sm font-mono focus:outline-none focus:border-black transition-colors"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 text-white bg-black hover:bg-black/90 transition-all duration-200 text-sm font-mono border border-black flex items-center justify-center"
            >
              {loading ? <Loading /> : "LOGIN"}
            </button>
            <p className="text-sm text-center text-black/60">
              Don&apos;t have an account?{" "}
              <NavTransition
                href="/signup"
                className="text-[#037a68] hover:underline font-medium"
              >
                Sign up
              </NavTransition>
            </p>
          </form>
        </div>
      </div>
      <div className="mx-6 md:mx-[15%] mt-8">
        <Footer />
      </div>
    </div>
  );
}
