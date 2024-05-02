import dataDisplay from "../../../src/service/backend/dataDisplayService";

export async function POST(req) {
    const rule = await req.json();
    const data = await dataDisplay(rule).catch(console.error);
    return Response.json(data);
}