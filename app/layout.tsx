import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs';
import ConvexClientProvider from "@/components/ConvexClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ChatFun — Modern Messaging Platform',
  description: 'ChatFun is a modern messaging platform with real-time chat, HD video calls, channels, and group conversations.',
  icons: {
    icon: '/71c607ae-be83-407c-af29-a74ecbaa9e1f.png',
  },
  openGraph: {
    title: 'ChatFun — Modern Messaging Platform',
    description: 'Real-time chat, HD video calls, channels & group conversations.',
    images: ['/71c607ae-be83-407c-af29-a74ecbaa9e1f.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          signInFallbackRedirectUrl='/dashboard'
          signUpFallbackRedirectUrl='/dashboard'
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
