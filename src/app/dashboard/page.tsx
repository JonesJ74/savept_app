'use client'

import withAuth from "../../hoc/withAuth";

function Dashboard() {
  return (
    <div>
      <h1>Welcome to SavePoint!</h1>
      <p>This is a protected page.</p>
    </div>
  );
}

export default withAuth(Dashboard);