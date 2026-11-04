import { authClient } from "./auth-client";

export default async function getTokenFromClient() {
    const {data} = await authClient.token();
    const token = data?.token;
    return token;
}