import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const darkTheme = createTheme({
    type: "dark",
    theme: {},
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
                dark: darkTheme.className,
            }}
        >
            <NextUIProvider>
                <UserProvider supabaseClient={supabaseClient}>
                    <Component {...pageProps} />
                </UserProvider>
            </NextUIProvider>
        </NextThemesProvider>
    );
}

export default MyApp;
