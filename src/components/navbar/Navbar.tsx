import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import UserAccountNav from './UserAccountNav';
import { ModeToggle } from '../ui/mode-toggle';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-background border-b py-4 sticky w-full z-10 top-0 shadow mb-4">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/">YOUR LOGO</Link>
        <div className="flex gap-4">
          {session?.user ? (
            <UserAccountNav />
          ) : (
            <Link className={buttonVariants()} href="/sign-in">
              Sign in
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
