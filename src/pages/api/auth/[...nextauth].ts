import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import i18n from "@/i18n";

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
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials?.username ?? "",
          credentials?.password ?? ""
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            return {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              image: user.photoURL,
            };
          })
          .catch((error) => {
            if (
              error instanceof FirebaseError &&
              error.code.startsWith("auth/")
            ) {
              const { code, message } = error;

              const translatedMessage = i18n.t(`errorMessages.${code}`);
              throw new Error(translatedMessage);
            }
            throw error;
          });

        return userCredential;
      },
    }),
  ],
  adapter: FirestoreAdapter(),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user!.email = token.email;
      }
      return session;
    },
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET as string,
};

export default NextAuth(authOptions);
