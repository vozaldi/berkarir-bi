'use client';

import Button from "@/components/basics/buttons/Button";
import Image from "next/image";
import { IoBonfireOutline, IoCalculatorOutline, IoDocumentTextOutline, IoFileTrayFullOutline, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import LogoutButton from "../LogoutButton";
import clsx from "clsx";
import { useUserShallow } from "@/states/userState";

type Props = React.HTMLAttributes<HTMLDivElement>;

function DashboardMenu({
  className,
  ...props
}: Props) {
  // Hooks
  const user = useUserShallow((state) => state.user);

  return (
    <div className={clsx(["p-5 rounded-lg bg-card shadow-md", className])} {...props}>
      <Image
        src={'/assets/images/pictures/avatar-256.jpeg'}
        alt="User Avatar"
        className="w-36 h-36 rounded-full shadow-md mx-auto"
        width={200}
        height={200}
      />

      <center className="text-center">
        <h3 className="mt-4 text-xl font-bold">
          {user?.name || `Guest`}
        </h3>

        <p className="text-sm text-dark-500">{`Free User`}</p>
      </center>

      <nav className="mt-4">
        <h3 className="text-sm font-bold">{`Akun Saya`}</h3>

        <ul className="flex flex-col gap-y-1 mt-2">
          {[{
            Icon: IoHomeOutline,
            label: `Dashboard`,
            href: '/dashboard',
          }, {
            Icon: IoDocumentTextOutline,
            label: `Latihan Soal`,
            href: '/account/latihan-soal',
          }, {
            Icon: IoFileTrayFullOutline,
            label: `Tryout`,
            href: '/account/try-out',
          }].map((item, index) => (
            <li key={index}>
              <Button
                className="w-full !justify-start bg-dark-200 dark:bg-white/10 hover:bg-dark-300"
                type="link"
                href={item.href}
              >
                <item.Icon size={18} className="mr-2" />

                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="mt-4">
        <h3 className="text-sm font-bold">{`Akun Saya`}</h3>

        <ul className="flex flex-col gap-y-1 mt-2">
          <li>
            <Button
              className="w-full !justify-start bg-dark-200 dark:bg-white/10 hover:bg-dark-300"
              type="link"
              href={'/account/avatar'}
            >
              <IoPersonOutline size={18} className="mr-2" />

              {`Avatar`}
            </Button>
          </li>
        </ul>
      </nav>

      <nav className="mt-4">
        <h3 className="text-sm font-bold">{`Dev. Menu`}</h3>

        <ul className="flex flex-col gap-y-1 mt-2">
          <li>
            <Button
              className="w-full !justify-start bg-dark-200 dark:bg-white/10 hover:bg-dark-300"
              type="link"
              href={'/account/demo-latex'}
            >
              <IoCalculatorOutline size={18} className="mr-2" />

              {`Convert LaTeX`}
            </Button>
          </li>
        </ul>
      </nav>

      <nav className="mt-6">
        <ul className="flex flex-col gap-y-1 mt-2">
          <li>
            <LogoutButton className="!justify-start w-full" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardMenu;
