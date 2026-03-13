'use state'

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import LoadSpinner from "@/components/loadSpinner"

export default function withAuth (WrappedComponent: any){
    return function authWrapped(props: any){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      const checkUser = async () => {
        const { data: {session} } = await supabase.auth.getSession();

        if (!session) {router.push("/login")}
        else {
          setUser(session.user)
        }
        setLoading(false);
      };

      checkUser();
    }, [router]);

    if (loading){
      return <LoadSpinner text="Logging in..." color="green-700" size="lg" />
    }
    return <WrappedComponent {...props} user={user}/>;
  };
}
