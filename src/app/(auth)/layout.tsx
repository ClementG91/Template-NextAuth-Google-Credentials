import { FC, ReactNode } from 'react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <h2>Vous êtes déjà authentifié.</h2>;
  }
  return <div className="bg-slate-200 p-10 rounded-md">{children}</div>;
};

export default AuthLayout;
