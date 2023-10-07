import Navbar from '@/components/navbar/Navbar';
import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Provider from '@/components/Provider';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextAuth Template',
  description:
    'Template for Next.js App router, with NextAuth (Google, Github, Metamask)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Provider>
            <Navbar />
            <main className="flex flex-col justify-center items-center">
              {children}
            </main>
            <Toaster />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
