"use client";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { usernameRegex, emailRegex } from "../components/regexHandlers";
import axios from "axios";
import { apiURL } from "../components/apiURL";
var crypto = require("crypto");
import { NavTransition } from "../components/navbar/NavTransition";
import Loading from "../components/Loading";
import { useToast } from "../hooks/use-toast";
import Footer from "../components/Footer";

export default function SignUpPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    } else if (!usernameRegex(username)) {
      toast({
        title: "Username should be atleast 3 characters long",
        variant: "destructive",
      });
      return;
    } else if (!emailRegex(email)) {
      toast({
        title: "Please enter a valid email",
        variant: "destructive",
      });
      return;
    }
    var hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");
    let results;
    try {
      setLoading(true);
      results = await axios.post(`${apiURL}/register`, {
        username: username,
        email: email,
        password: hashedPassword,
      });
      setLoading(false);
    } catch (err: any) {
      results = err.response;
      setLoading(false);
    }
    if (results?.status === 200) {
      toast({
        title: "Registration successful. Please login to continue",
      });
    } else if (results?.status === 409) {
      toast({
        title: "Username or email already exists",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Server error",
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
            <h1 className="text-4xl font-bold mb-3 text-black font-mono">CREATE ACCOUNT</h1>
            <p className="text-black/60">
              Start your paper trading journey with Foursight
            </p>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2 text-black">
                Username
              </label>
              <input
                name="username"
                id="username"
                className="w-full px-4 py-3 border border-[#374151] bg-white text-black text-sm font-mono focus:outline-none focus:border-black transition-colors"
                value={username}
                placeholder="Choose a username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-black">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-[#374151] bg-white text-black text-sm font-mono focus:outline-none focus:border-black transition-colors"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 text-white bg-black hover:bg-black/90 transition-all duration-200 text-sm font-mono border border-black flex items-center justify-center"
            >
              {loading ? <Loading /> : "REGISTER"}
            </button>
            <p className="text-sm text-center text-black/60">
              Already have an account?{" "}
              <NavTransition
                href="/login"
                className="text-[#037a68] hover:underline font-medium"
              >
                Sign in
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
