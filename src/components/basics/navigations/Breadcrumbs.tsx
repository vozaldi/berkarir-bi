"use client";

import { appConfig } from "@/lib/config";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

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
          <Link href="/" className="text-primary font-bold hover:underline">
            <span>{`Dashboard`}</span>
          </Link>

          {!!pages.length && (
            <span className="opacity-50">/</span>
          )}
        </>
      )}

      {pages.map((page, index) => {
        if (typeof page === 'string' || !page.url) {
          const label = typeof page === "string" ? page : page.label;

          return <span key={index}>{label}</span>;
        }

        return (
          <Fragment key={index}>
            <Link
              key={index}
              className="text-primary font-bold hover:underline"
              href={page.url}
              target={page.target}
            >
              <span>{page.label}</span>
            </Link>

            {(index < pages.length - 1) && (
              <span className="opacity-50">/</span>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export type BreadcrumbsProps = Props;

export default Breadcrumbs;
