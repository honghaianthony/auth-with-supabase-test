import { useEffect, useState } from "react";
import { Auth } from "@supabase/ui";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

function Login() {
    const { user, error } = useUser();

    if (!user)
        return (
            <>
                {error && <p>{error.message}</p>}
                <Auth
                    supabaseClient={supabaseClient}
                    providers={["google", "github"]}
                    socialLayout="horizontal"
                    socialButtonSize="medium"
                />
            </>
        );
    return <></>;
}

export default Login;
