import { FC, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { ethers } from 'ethers';

// Fix typescript errors for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

interface MetamaskSignInButtonProps {
  children: ReactNode;
}

// This function requests a nonce then signs it, proving that
//  the user owns the public address they are using
async function loginWithMetamask() {
  try {
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.');
      return;
    }

    // Get the wallet provider, the signer and address
    //  see: https://docs.ethers.org/v6/getting-started/#starting-signing
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const publicAddress = await signer.getAddress();

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
    const responseData = await response.json();
    // Sign the received nonce
    const signedNonce = await signer.signMessage(responseData.nonce);
    // Use NextAuth to sign in with our address and the nonce
    await signIn('crypto', {
      publicAddress,
      signedNonce,
      callbackUrl: '/admin',
    });
  } catch {
    window.alert('Error with signing, please try again.');
  }
}

const MetamaskSignInButton: FC<MetamaskSignInButtonProps> = ({ children }) => {
  return (
    <main>
      <Button onClick={loginWithMetamask} className="w-full py-2">
        <Image src="/metamask.svg" width={24} height={24} alt="Metamask" />
        {children}
      </Button>
    </main>
  );
};
export default MetamaskSignInButton;
