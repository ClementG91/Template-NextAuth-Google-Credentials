import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { ethers } from 'ethers';

interface MetamaskSignInButtonProps {
  children: ReactNode;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MetamaskSignInButton: FC<MetamaskSignInButtonProps> = ({ children }) => {
  const loginWithMetamask = async function () {
    try {
      console.log('Starting loginWithMetamask');

      if (!window.ethereum) {
        console.error('MetaMask is not installed.');
        window.alert('Please install MetaMask first.');
        return;
      }

      console.log('MetaMask is installed');

      // Get the wallet provider, the signer and address
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const publicAddress = await signer.getAddress();

      console.log('Public Address:', publicAddress);

      // Send the public address to generate a nonce associates with our account
      const response = await fetch('/api/auth/crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicAddress,
        }),
      });

      console.log('Nonce Response:', response);

      if (!response.ok) {
        throw new Error(`Failed to fetch nonce: ${response.statusText}`);
      }

      const responseData = await response.json();

      console.log('Nonce Response Data:', responseData);

      // Sign the received nonce
      const signedNonce = await signer.signMessage(responseData.nonce);

      console.log('Signed nonce:', signedNonce);

      // Use NextAuth to sign in with our address and the nonce
      await signIn('crypto', {
        publicAddress,
        signedNonce,
        callbackUrl: `${window.location.origin}/admin`,
      });

      console.log('Successfully signed in');
    } catch (error) {
      console.error('Error with signing:', error);
      window.alert('Error with signing, please try again.');
    }
  };

  return (
    <Button onClick={loginWithMetamask} className="w-full py-2">
      <Image
        src="/metamask.svg"
        width={24}
        height={24}
        alt="Metamask"
        className="mx-1"
      />
      {children}
    </Button>
  );
};

export default MetamaskSignInButton;
