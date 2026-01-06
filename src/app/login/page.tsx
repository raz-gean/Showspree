"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res) {
        setError("Unexpected error. Please try again.");
        return;
      }

      if (res.error) {
        setError("Invalid email or password.");
        return;
      }

      if (res.ok) {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error("Login error", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen text-zinc-50 flex items-center justify-center px-4 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-110"
          style={{ backgroundImage: "url(/images/backgroundimglogin.jpg)" }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-black/40 backdrop-blur-xl p-6 shadow-[0_18px_45px_rgba(0,0,0,0.9)]">
        <h1 className="text-center text-2xl font-semibold mb-2">Sign in</h1>
        <p className="mb-4 text-center text-xs text-zinc-400 uppercase tracking-[0.25em]">
          Welcome back to Showspree
        </p>

        {error && (
          <div className="mb-4 rounded border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1 text-sm">
            <label className="block text-zinc-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-50 outline-none focus:border-white/80"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="block text-zinc-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-zinc-700 bg-black px-3 py-2 text-sm text-zinc-50 outline-none focus:border-white/80"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-white py-2 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.9)] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-zinc-500">
          New here?{" "}
          <Link
            href="/register"
            className="text-zinc-200 underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
