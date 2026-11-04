import { headers } from "next/headers";
import { auth } from "./auth";

export default async function getTokenFromServer() {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  return token;
}