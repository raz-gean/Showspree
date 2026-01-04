"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Check console for details.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <h2 className="text-2xl font-semibold text-center">
          Create account
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={name ?? ""}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email ?? ""}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password ?? ""}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </main>
  );
}
