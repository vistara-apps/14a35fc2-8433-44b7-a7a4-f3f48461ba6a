import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlantPal - Your Plants Personal SMS Caretaker',
  description: 'Personalized, personality-driven SMS plant care reminders for urban plant parents.',
  keywords: ['plants', 'care', 'SMS', 'reminders', 'gardening', 'base', 'miniapp'],
  authors: [{ name: 'PlantPal Team' }],
  openGraph: {
    title: 'PlantPal - Your Plants Personal SMS Caretaker',
    description: 'Never kill a plant again with personality-driven SMS care reminders.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <div className="min-h-screen bg-bg">
              {children}
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
