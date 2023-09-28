import SignUpForm from '@/components/form/SignUpForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
const page = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return <h2>Vous êtes déjà authentifié.</h2>;
  }
  return (
    <div className="w-full">
      <SignUpForm />
    </div>
  );
};

export default page;
