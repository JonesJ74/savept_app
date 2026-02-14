'use client'

import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // redirect to login after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
}

