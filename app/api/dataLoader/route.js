import dataDepot from '../../../src/service/backend/dataDepotService'

export async function POST(req) {
    try {
        const data = await req.json();
        await dataDepot(data).catch(console.error);
    } catch (error) {
        console.error(error)
        throw new Error(error)
    }

    return new Response('Ok');
}