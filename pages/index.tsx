import type { NextPage } from "next";
import { Navbar, Button, Text, useTheme, Link } from "@nextui-org/react";
import { Layout } from "../components/Layout";
import { AcmeLogo } from "../components/AcmeLogo";
import { Auth } from "@supabase/ui";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const Home: NextPage = () => {
    const { isDark } = useTheme();
    const router = useRouter();

    const { user, error } = useUser();
    const [data, setData] = useState<any[] | null>([]);

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from("test").select("*");
            setData(data);
        }
        if (user) loadData();
    }, [user]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.push("/login");
    };

    return (
        <Layout>
            <Navbar isBordered={isDark} variant="sticky">
                <Navbar.Brand>
                    <AcmeLogo />
                    <Text b color="inherit" hideIn="xs">
                        ACME
                    </Text>
                </Navbar.Brand>
                <Navbar.Content
                    enableCursorHighlight
                    hideIn="xs"
                    variant="underline"
                >
                    <Navbar.Link href="#">Features</Navbar.Link>
                    <Navbar.Link isActive href="#">
                        Customers
                    </Navbar.Link>
                    <Navbar.Link href="#">Pricing</Navbar.Link>
                    <Navbar.Link href="#">Company</Navbar.Link>
                </Navbar.Content>
                {user ? (
                    <>
                        <Button
                            onClick={() => {
                                supabaseClient.auth.signOut();
                                handleSubmit;
                            }}
                        >
                            Sign out
                        </Button>
                    </>
                ) : (
                    <Navbar.Content>
                        <Navbar.Link color="inherit" href="/login">
                            Login
                        </Navbar.Link>
                        <Navbar.Item>
                            <Button auto flat as={Link} href="#">
                                Sign Up
                            </Button>
                        </Navbar.Item>
                    </Navbar.Content>
                )}
            </Navbar>
            {user ? (
                <>
                    <p>user:</p>
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                    <p>client-side data fetching with RLS</p>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </>
            ) : (
                <></>
            )}
        </Layout>
    );
};

export default Home;
