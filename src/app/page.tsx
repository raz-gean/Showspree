import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">🎬 Showspree</h1>

      <p className="text-gray-600">
        Discover movies powered by machine learning
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-4 py-2 border rounded"
        >
          Sign up
        </Link>
      </div>
    </main>
  );
}
