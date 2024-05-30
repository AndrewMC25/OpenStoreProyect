import { cookies } from "next/headers";
import getUserData from "../../../src/service/backend/getUserDataService";

export async function GET() {
    const token = cookies().get('access-token');
    const data = getUserData(token.value)
    return Response.json(data);
};