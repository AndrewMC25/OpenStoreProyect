import dataDepot from '../../../src/service/backend/dataDepotService'

export async function POST(req) {
    const data = await req.json();
    await dataDepot(data).catch(console.error);

    return new Response('Ok');
}