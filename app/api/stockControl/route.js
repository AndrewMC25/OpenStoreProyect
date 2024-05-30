import UpdateAmountSold from '../../../src/service/backend/stockUpdateService'

export async function POST(req) {
    const data = await req.json();
    await UpdateAmountSold(data).catch(console.error);

    return new Response('Ok');
}