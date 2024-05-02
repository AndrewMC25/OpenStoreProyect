import dataUpdate from "../../../src/service/backend/dataUpdateService";

export async function POST(req) {
    const data = await req.json();
    await dataUpdate(data).catch(console.error);

    return new Response('Ok');
}