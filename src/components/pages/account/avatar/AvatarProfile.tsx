'use client';

import Button from "@/components/basics/buttons/Button";
import { useUserShallow } from "@/states/userState";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoArrowForward } from "react-icons/io5";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

function AvatarProfile({
  className,
  ...props
}: Props) {
  // Hooks
  const user = useUserShallow((state) => state.user);

  return (
    <div className={clsx(['relative', className])} {...props}>
      <Image
        className="-mt-4 mb-4 pointer-events-none max-h-full object-contain"
        src={'/assets/images/avatars/female/female-2.png'}
        alt="Avatar Female"
        width={512}
        height={512}
      />

      <Button
        type="link"
        href={`/`}
        className="absolute top-4 right-4 text-primary bg-primary/10 hover:bg-primary/20 rounded-full"
        size="xs"
      >
        <span className="mr-1">{`Edit Profil`}</span>

        <IoArrowForward />
      </Button>

      <div className="absolute left-0 right-0 bottom-0 flex flex-col items-center">
        <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xs dark:backdrop-blur-md rounded-lg shadow-xs py-1 px-2 text-center scale-100 hover:scale-110 hover:bg-white/30 dark:hover:bg-black/50 hover:shadow-lg transition-all duration-200 ease-in-out cursor-default">
          <h3 className="text-sm font-bold">{user?.name}</h3>
          <p className="text-xs opacity-50 dark:opacity-75">{`Free User`}</p>
        </div>

        <div className="mt-1 w-full px-4">
          <div className="rounded-lg w-full h-2 bg-primary-dark">
            <div className="rounded-lg w-10/12 h-full bg-primary" />
          </div>

          <div className="mt-1 flex justify-between text-xs/tight">
            <p className="text-primary-dark dark:text-white">{`Level 1`}</p>
            <p>
              <Link href={`/account/premium`} className="text-secondary underline">Upgrade</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarProfile;
