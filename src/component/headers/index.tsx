'use client'
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { UserModel } from "@/models/user.model";

export default function Headers() {
    const auth = useAuth();

    return (
        <>
            <Link href={"/login"}>Login</Link>
            <Link href={"/panel"}>Panel</Link>

            {auth && (
                <>
                    <span>{auth.username}</span>
                </>
            )}
        </>
    );
}
