import LoginForm from "@/components/forms/auth/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="grow lg:p-8 p-4 flex flex-col items-center justify-center">
      <div className="w-[480px] max-w-full bg-card border border-dark-200 rounded-2xl py-8 lg:px-8 px-6 shadow-lg">
        <LoginForm className="max-w-[400px] mx-auto" />
      </div>

      <div className="mt-8 text-center">
        <Link href={'/'} className="text-primary text-sm underline">
          {`Back to Home`}
        </Link>
      </div>
    </div>
  );
};
