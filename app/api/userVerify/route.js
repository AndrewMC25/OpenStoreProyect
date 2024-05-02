import verify from '../../../src/service/backend/tokenVerifierService'

export async function POST(req) {
    const body = await req.json();
    const { token } = body;
    
    await verify(token).catch(console.error);

    return Response.json({token});
}