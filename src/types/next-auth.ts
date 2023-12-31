import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    name?: string | null;
    publicAddress?: string | null;
    signedNonce?: string | null;
  }
  interface Session {
    user: User & {
      name: string;
    };
    token: {
      name: string;
    };
  }
}
