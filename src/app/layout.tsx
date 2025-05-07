import type { Metadata } from "next";
import "../styles/globals.css";
import '../lib/utilities/numeral';
import { appConfig } from "@/lib/config";
import React from "react";
import ToastMessage from "@/components/basics/ToastMessage";
import { Lato } from "next/font/google";
import clsx from "clsx";
import { RootStoreProvider } from "@/states/providers/storeProvider";
import { cookies } from "next/headers";

const LatoSans = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-app-sans",
  fallback: ['sans-serif'],
});

export const metadata: Metadata = {
  title: appConfig('company'),
  description: "Lorem ipsum dolor sit amet",
  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const theme = cookie.get('theme');

  return (
    <html lang="en" className={clsx([theme?.value === 'dark' && 'dark'])}>
      <body
        className={clsx([
          `text-dark-text font-sans antialiased bg-background flex flex-col min-h-screen`,
          LatoSans.variable,
          LatoSans.variable,
        ])}
      >
        <RootStoreProvider theme={theme?.value === 'dark' ? 'dark' : 'light'}>
          {children}

          <ToastMessage />
          
          {/* Base UI Portal */}
          <div id="app-portal" />
        </RootStoreProvider>
      </body>
    </html>
  );
}
