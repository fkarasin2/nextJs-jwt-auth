import { NextApiRequest, NextApiResponse } from "next";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/auth/verifyJwt";
import { NextResponse } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
        const payload = { id: '1' }
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = await new SignJWT({
            username: username,
            role: "admin",
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30s")
            .sign(getJwtSecretKey());

        res.setHeader("Set-Cookie", `token=${token}; Path=/; SameSite=Strict`);

        return res.status(200).json({ success: true, token: token });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}