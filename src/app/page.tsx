import Link from "next/link";
export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome to SavePoint 🎮
      </h1>
      <p className="mt-4">
        <Link href="/signup" className="underline text-blue-600">Sign Up</Link><br></br>
        <Link href="/login" className="underline text-blue-600">Login</Link><br></br>
        <Link href="/dashboard" className="underline text-blue-600">Dashboard</Link><br></br>
        Track and review your favorite games.
      </p>
    </main>
  );
}