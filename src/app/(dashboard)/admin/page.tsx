import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <h2>Protected Page - welcome back: {session?.user.name}</h2>;
  }
  return (
    <h2 className="text-red text-2xl text-bold">
      Please login to access this page
    </h2>
  );
};

export default page;
