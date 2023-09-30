import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = () =>
    signIn('google', {
      callbackUrl: `${window.location.origin}/admin`,
    });

  return (
    <Button onClick={loginWithGoogle} className="w-full py-2">
      <FcGoogle className="text-xl mx-1" />
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
