import RegisterForm from "@/components/forms/auth/RegisterForm";

export default function Register() {
  return (
    <div className="grow lg:p-8 p-4 flex items-center justify-center">
      <div className="w-[480px] max-w-full bg-card border border-dark-200 rounded-2xl py-8 lg:px-8 px-6 shadow-lg">
        <RegisterForm className="max-w-[400px] mx-auto" />
      </div>
    </div>
  );
};
