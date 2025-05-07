import LoginForm from "@/components/forms/auth/LoginForm";
import HeaderNavPublic from "@/components/layouts/public/HeaderNavPublic";

export default function Home() {
  return (
    <>
      <HeaderNavPublic className="sticky top-0 bg-card" />

      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm className="bg-card border border-dark-200 rounded-2xl py-8 px-6 shadow-lg w-[480px] max-w-full" />
      </main>
    </>
  );
};
