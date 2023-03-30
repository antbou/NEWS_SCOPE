import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import i18n from '@/locales/i18n';

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId || clientId.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_ID');
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error('Missing GOOGLE_CLIENT_SECRET');
  }

  return { clientId, clientSecret };
}

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: 'light',
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          credentials?.username ?? '',
          credentials?.password ?? ''
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
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
              error.code.startsWith('auth/')
            ) {
              const { code } = error;

              const translatedMessage = i18n.t(`errorMessages.${code}`);
              throw new Error(translatedMessage);
            }
            throw error;
          });

        return userCredential;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};
