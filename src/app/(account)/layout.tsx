import React from "react";
import HeaderNavPublic from "@/components/layouts/public/HeaderNavPublic";
import FooterPublic from "@/components/layouts/public/FooterPublic";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderNavPublic className="sticky top-0 bg-card shadow-md z-[300]" isLoggedIn />

      <main className="grow flex flex-col bg-background">{children}</main>

      <FooterPublic className="mt-16" />
    </>
  );
}
