import { jwtVerify } from 'jose'

export const getJwtSecretKey = () => {
    const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

    if (!secretKey) {
        throw new Error('JWT_SECRET_KEY not found');
    } else {
        return new TextEncoder().encode(secretKey);
    }
}

export async function verifyJwtToken(token: any) {

    try {
        const { payload } = await jwtVerify(token, getJwtSecretKey());
        return payload;
    } catch (error) {
        return null;
    }

}