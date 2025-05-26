import type { Metadata } from "next";
import "../styles/globals.css";
import '../lib/utilities/numeral';
import { appConfig } from "@/lib/config";
import React from "react";
import ToastMessage from "@/components/basics/ToastMessage";
import { Lato } from "next/font/google";
import clsx from "clsx";
import { RootStoreProvider } from "@/states/providers/RootStoreProvider";
import { cookies } from "next/headers";
import { UserModel } from "@/types/models";
import { httpServer } from "@/server/httpServer";

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
  const user = cookie.get('user');
  let currentUser: UserModel | null = null;

  if (user?.value) {
    currentUser = await httpServer('/profile').then<UserModel | null>((data) => {
      const token = JSON.parse(user?.value || '{}')?.token;

      return { ...data.data, token };
    }).catch(() => null);
  }

  return (
    <html lang="en" className={clsx([theme?.value === 'dark' && 'dark'])}>
      <body
        className={clsx([
          `text-dark-text font-sans antialiased bg-background flex flex-col min-h-screen`,
          LatoSans.variable,
          LatoSans.variable,
        ])}
      >
        <RootStoreProvider
          theme={theme?.value === 'dark' ? 'dark' : 'light'}
          user={currentUser}
        >
          {children}

          <ToastMessage />
          
          {/* Base UI Portal */}
          <div id="app-portal" />
        </RootStoreProvider>
      </body>
    </html>
  );
}
