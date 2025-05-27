"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { PaketCategory } from "@/types/models";
import PaketCategories from "./PaketCategories";
import PaketCategoryTabs from "./PaketCategoryTabs";
import { usePathname, useRouter } from "next/navigation";
import { usePaketShallow } from "./(providers)/PaketProvider";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  categorySlug?: number | string;
};

export default function PaketDetail({
  className,
  categorySlug,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();

  const paket = usePaketShallow((state) => state.paket);

  const initialCategory = paket.categories?.find((item) => item.id === Number(categorySlug)) || null;

  // States
  const [category, setCategory] = useState<PaketCategory | null>(initialCategory);

  // Effects
  useEffect(() => {
    const category = paket.categories?.find((item) => item.id === Number(categorySlug)) || null;

    setCategory(category);
  }, [categorySlug]);

  return (
    <div className={clsx(["bg-card rounded-lg shadow-lg pt-4 pb-8 px-6", className])} {...props}>
      {!category && (
        <PaketCategories
          onCategoryChange={({ id }) => router.push(`/paket/${paket.id}/${id}`)}
        />
      )}

      {!!category && (
        <PaketCategoryTabs
          category={category}
          onBackPress={() => router.push(`/paket/${paket.id}/pilih-tahap`)}
        />
      )}
    </div>
  );
};
