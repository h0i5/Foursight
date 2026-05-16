"use client";
import { useState } from "react";
import { usernameRegex, emailRegex } from "../components/regexHandlers";
import axios from "axios";
import { apiURL } from "../components/apiURL";
var crypto = require("crypto");
import { NavTransition } from "../components/navbar/NavTransition";
import Loading from "../components/Loading";
import { sileo } from "sileo";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleGoogleLogin() {
    // Redirect to backend OAuth endpoint
    window.location.href = `${apiURL}/auth/oauth/google`;
  }

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (username === "" || email === "" || password === "") {
      sileo.error({ title: "Please fill all the fields" });
      return;
    } else if (!usernameRegex(username)) {
      sileo.error({ title: "Username should be atleast 3 characters long" });
      return;
    } else if (!emailRegex(email)) {
      sileo.error({ title: "Please enter a valid email" });
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
      sileo.success({ title: "Registration successful. Please login to continue" });
    } else if (results?.status === 409) {
      sileo.error({ title: "Username or email already exists" });
    } else {
      sileo.error({ title: "Server error" });
    }
  }

  return (
    <div className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-foreground font-mono">CREATE ACCOUNT</h1>
            <p className="text-foreground/60">
              Start your paper trading journey with Foursight
            </p>
          </div>

          <div className="mb-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full px-8 py-4 bg-card text-foreground hover:bg-muted transition-all duration-200 text-sm font-mono border border-border hover:border-foreground flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              SIGN UP WITH GOOGLE
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="text-xs font-mono text-foreground/60">OR</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2 text-foreground">
                Username
              </label>
              <input
                name="username"
                id="username"
                className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm font-mono focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                value={username}
                placeholder="Choose a username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email
              </label>
              <input
                name="email"
                id="email"
                type="email"
                className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm font-mono focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-foreground">
                Password
              </label>
              <input
                name="password"
                id="password"
                type="password"
                className="w-full px-4 py-3 border border-border bg-card text-foreground text-sm font-mono focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                value={password}
                placeholder="Create a password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 text-background bg-foreground hover:bg-foreground/90 transition-all duration-200 text-sm font-mono border border-foreground flex items-center justify-center"
            >
              {loading ? <Loading /> : "REGISTER"}
            </button>
            <p className="text-sm text-center text-foreground/60">
              Already have an account?{" "}
              <NavTransition
                href="/login"
                className="text-brand hover:underline font-medium"
              >
                Sign in
              </NavTransition>
            </p>
          </form>
        </div>
    </div>
  );
}
