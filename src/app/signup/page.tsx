'use client'

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter(); //redirect to login page

  //error handling
  const handleSignup = async (e) => {
    e.preventDefault(); //stops from refreshing page after info input
    const { data, error } = await supabase.auth.signUp({ email, password }); //creates new user via Supabase
    if (error) setErrorMsg(error.message);
    else router.push("/login");
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        {errorMsg && <p style={{color: "red"}}>{errorMsg}</p>}
      </form>
    </div>
  );
}