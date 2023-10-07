import { FC, ReactNode } from 'react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <Link href="/admin">
        <h2 className="text-2xl text-bold text-center">
          You are already logged in !<br />
          Welcome back:
          <br />
          {session?.user.name}
        </h2>
      </Link>
    );
  }
  return (
    <div className="bg-background border px-10 py-5 rounded-md shadow">
      {children}
    </div>
  );
};

export default AuthLayout;
