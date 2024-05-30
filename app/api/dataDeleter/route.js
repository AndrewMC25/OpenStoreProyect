import dataDelete from "../../../src/service/backend/dataDeleteService";

export async function POST(req) {
    const data = await req.json();
    console.log('ESTA ES LA DATA:', data);
    await dataDelete(data).catch(console.error);

    return new Response('Ok');
}