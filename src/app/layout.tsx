import type {Metadata} from 'next';
import './globals.css';
import {Header} from '@/components/header';
import {Footer} from '@/components/footer';
import {Toaster} from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'Alumbra - AI-Powered Conversation Analysis',
    template: '%s | Alumbra',
  },
  description:
    'Gain insights and improve your communication with Alumbra. Analyze conversation risk, understand topics, and get actionable recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background font-body text-foreground antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
