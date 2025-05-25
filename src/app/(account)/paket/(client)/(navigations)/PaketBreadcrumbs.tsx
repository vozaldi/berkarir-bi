"use client";

import Breadcrumbs, { BreadcrubPage, BreadcrumbsProps } from "@/components/basics/navigations/Breadcrumbs";
import { QuizModel } from "@/types/models";
import clsx from "clsx";
import { usePaketShallow } from "../(providers)/PaketProvider";

type Props = Omit<BreadcrumbsProps, 'pages'> & {
  quiz?: QuizModel | null;
};

function PaketBreadcrumbs({
  className,
  ...props
}: Props) {
  // Hooks
  const paket = usePaketShallow((state) => state.paket);

  // Vars
  const pages: BreadcrubPage[] = [
    { label: "Paket", url: '/dashboard' },
    { label: paket.name },
  ];

  return (
    <Breadcrumbs
      className={clsx([className])}
      pages={pages}
      {...props}
    />
  );
};

export default PaketBreadcrumbs;
