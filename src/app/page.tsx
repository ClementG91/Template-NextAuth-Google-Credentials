import User from '@/components/User';
import { buttonVariants } from '@/components/ui/button';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Link className={buttonVariants({ variant: 'outline' })} href={'/admin'}>
        Open My Admin
      </Link>
      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
}
