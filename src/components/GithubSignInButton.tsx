import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { BsGithub } from 'react-icons/bs';

interface GithubSignInButtonProps {
  children: ReactNode;
}
const GithubSignInButton: FC<GithubSignInButtonProps> = ({ children }) => {
  const loginWithGithub = () =>
    signIn('github', {
      callbackUrl: `${window.location.origin}/admin`,
    });

  return (
    <Button onClick={loginWithGithub} className="w-full py-2">
      <BsGithub className="text-xl mx-1" />
      {children}
    </Button>
  );
};

export default GithubSignInButton;
