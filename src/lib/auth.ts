import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!existingUser) {
          return null;
        }
        if (existingUser.password) {
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password
          );
          if (!passwordMatch) {
            return null;
          }
        }
        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
        };
      },
    }),

    // crypto wallet
    CredentialsProvider({
      id: 'crypto',
      name: 'Crypto Wallet Auth',
      credentials: {
        publicAddress: { label: 'Public Address', type: 'text' },
        signedNonce: { label: 'Signed Nonce', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.publicAddress || !credentials?.signedNonce) {
          return null;
        }
        const existingUserByPublicAddress = await db.user.findUnique({
          where: {
            publicAddress: credentials.publicAddress,
            name: credentials.publicAddress,
          },
        });
        if (!existingUserByPublicAddress) {
          // Aucun utilisateur trouvé avec cette publicAddress, alors créez un nouvel utilisateur
          const newUser = await db.user.create({
            data: {
              publicAddress: credentials.publicAddress,
              name: credentials.publicAddress,
            },
          });
          return {
            id: newUser.id,
            name: newUser.publicAddress,
            email: newUser.email,
            publicAddress: newUser.publicAddress,
          };
        }
        return {
          id: existingUserByPublicAddress.id,
          name: existingUserByPublicAddress.name,
          email: existingUserByPublicAddress.email,
          publicAddress: existingUserByPublicAddress.publicAddress,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
        },
      };
    },
  },
};
