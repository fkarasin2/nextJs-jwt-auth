import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/auth/verifyJwt";
import { NextResponse } from "next/server";

export default async function POST(request: any) {
    const body = await request.json();

    if (body.username === "admin" && body.password === "admin") {
        const token = await new SignJWT({
            username: body.username,
            role: "admin",
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30s")
            .sign(getJwtSecretKey());

        console.log(token);
    }

    return NextResponse.json({ success: false });
}