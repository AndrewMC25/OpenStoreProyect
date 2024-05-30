import verify from '../../../src/service/backend/tokenVerifierService'
import { cookies } from 'next/headers';

export async function POST(req) {
    const body = await req.json();
    const { token } = body;
    const jwToken = await verify(token).catch(console.error);
    cookies().set('access-token', jwToken, { maxAge: 1296000000 });

    return Response.json('login succesfully');
}