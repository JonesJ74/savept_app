'use state'

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function withAuth (Component){
    return function authWrapped(props){
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data } = await supabase.auth.getSession();
        if (!data.session) router.push("/login");
        else setLoading(false);
      };
      checkUser();
    }, [router]);

    if (loading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}
