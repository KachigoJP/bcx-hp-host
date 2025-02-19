import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "keycloak-client-credentials",
      name: "Keycloak",
      credentials: {}, // No user credentials are required for client credentials flow
      authorize: async () => {
        console.log("GO HEREEEE");
        try {
          // Request an access token from Keycloak
          const response = await axios.post(
            `${process.env.KEYCLOAK_ISSUER}/realms/bcx-dev/protocol/openid-connect/token`,
            new URLSearchParams({
              grant_type: "client_credentials",
              client_id: process.env.KEYCLOAK_CLIENT_ID!,
              client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const accessToken = response.data.access_token;

          // Return the token as the user object
          return {
            id: "service-account",
            name: "Service Account",
            accessToken,
          };
        } catch (error) {
          console.error("Error during Keycloak authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
