import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { FirebaseError } from "firebase/app";

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.username,
            credentials.password
          );
          if (userCredential.user) {
            return {
              id: userCredential.user.uid,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
              image: userCredential.user.photoURL,
            };
          }
        } catch (error) {
          throw new Error(
            error instanceof FirebaseError
              ? error.message
              : "Something went wrong"
          );
        }
        return null;
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET as string,
};

export default NextAuth(authOptions);
