import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () =>
    signIn('google', {
      callbackUrl:
        'https://template-next-auth-google-credentials.vercel.app/admin',
    });

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
