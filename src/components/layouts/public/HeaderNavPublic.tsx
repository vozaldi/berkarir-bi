'use client';

import PreferenceDropdown from "@/components/basics/buttons/PreferenceDropdown";
import ThemeToggle from "@/components/basics/buttons/ThemeToggle";
import { appConfig } from "@/lib/config";
import { rootState } from "@/states/providers/RootStoreProvider";
import { useUiShallow, useUiState } from "@/states/uiState";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isLoggedIn?: boolean;
};

function HeaderNavPublic({
  className,
  isLoggedIn,
  ...props
}: Props) {
  // Hooks
  const uiState = useUiState();
  const theme = useUiShallow((state) => state.theme);

  const navRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    uiState.setState((state): typeof state => ({
      ...state,
      layouts: {
        ...state.layouts,
        header: {
          height: navRef.current?.clientHeight || 0,
          width: navRef.current?.clientWidth || 0,
        },
      },
    }));
  }, [navRef.current]);

  return (
    <nav
      ref={navRef}
      className={clsx("w-full z-[500]", className)}
      {...props}
    >
      <div className="container px-4 py-2 md:py-4 mx-auto flex justify-between items-center">
        <Link href={isLoggedIn ? '/dashboard' : "/"}>
          {theme === 'dark' ? (
            <Image
              src={'/assets/images/app-logo-white.png'}
              alt={appConfig('company')}
              width={144}
              height={52}
            />
          ) : (
            <Image
              src={'/assets/images/app-logo.png'}
              alt={appConfig('company')}
              width={144}
              height={52}
            />
          )}
        </Link>

        <ul className="flex gap-x-4 items-center">
          <li>
            <PreferenceDropdown />
          </li>

          <li>
            <ThemeToggle />
          </li>

          {isLoggedIn ? (
            <li>
              <Link
                href={'/dashboard'}
                className="flex text-lg items-center hover:text-primary px-2 py-2"
              >
                <IoPersonCircleOutline size={32} />
              </Link>
            </li>
          ) : (
            <li>
              <Link
                href={'/auth/login'}
                className="flex text-lg items-center hover:text-primary px-2 py-2"
              >
                <IoPersonCircleOutline size={32} />

                <span className="ml-2">{`Login`}</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderNavPublic;
