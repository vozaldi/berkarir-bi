import React from "react";
import HeaderNavPublic from "@/components/layouts/public/HeaderNavPublic";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderNavPublic className="sticky top-0 !bg-card hover:bg-white/25 hover:backdrop-blur-sm shadow-md z-[300]" />

      <main className="grow flex flex-col">{children}</main>
    </>
  );
}
