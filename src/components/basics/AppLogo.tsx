'use client';

import { appConfig } from "@/lib/config";
import { useUiShallow } from "@/states/uiState";
import Image from "next/image";
import { ImageProps } from "next/image";

type Props = Omit<ImageProps, 'src' | 'alt'> & {
  alt?: string;
};

function AppLogo({
  className,
  alt,
  ...props
}: Props) {
  // Hooks
  const theme = useUiShallow((state) => state.theme);

  return theme === 'dark' ? (
    <Image
      className={className}
      src={'/assets/images/app-logo-white.png'}
      alt={alt || appConfig('company')}
      width={144}
      height={52}
      {...props}
    />
  ) : (
    <Image
      className={className}
      src={'/assets/images/app-logo.png'}
      alt={alt || appConfig('company')}
      width={144}
      height={52}
      {...props}
    />
  );
}

export default AppLogo;
