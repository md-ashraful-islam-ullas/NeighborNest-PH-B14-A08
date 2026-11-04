import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("NeighborNest");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoLogin: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [jwt({
     sessionCookieCache: true,
  }),],
  session: {
    cookieCache: {
      strategy: "jwt",
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    }
  }
});
