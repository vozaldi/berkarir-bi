"use client";

import { appConfig } from "@/lib/config";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export type BreadcrubPage = {
  label?: string;
  url?: string;
  target?: string;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  pages?: Array<BreadcrubPage | string>;
  hideDashboard?: boolean;
};

function Breadcrumbs({
  pages = [],
  hideDashboard = false,
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(["flex items-center gap-3", className])} {...props}>
      <Image
        src="/assets/images/app-logo-circle.png"
        alt={appConfig("company")}
        width={20}
        height={20}
      />

      {!hideDashboard && (
        <>
          <Link href="/" className="font-bold">
            <span className="text-primary">{`Dashboard`}</span>
          </Link>

          {!!pages.length && (
            <span className="opacity-50">/</span>
          )}
        </>
      )}

      {pages.map((page, index) => {
        if (typeof page === 'string') {
          return <span key={index}>{page}</span>;
        }

        return (
          <a
            key={index}
            href={page.url}
            target={page.target}
            rel="noopener noreferrer"
          >
            {page.label}
          </a>
        );
      })}
    </div>
  );
};

export type BreadcrumbsProps = Props;

export default Breadcrumbs;
