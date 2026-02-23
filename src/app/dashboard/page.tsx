'use client'

import withAuth from "../../hoc/withAuth";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="p-6">
      <h1>Welcome to SavePoint!</h1>
      <p>This is a protected page.</p>
      <nav className="mb-6">
        <Link
          href="/reviews"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create a review
        </Link>
      </nav>
    </div>
  );
}

export default withAuth(Dashboard);