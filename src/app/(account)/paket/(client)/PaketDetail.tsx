"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { PaketCategory } from "@/types/models";
import PaketCategories from "./PaketCategories";
import PaketCategoryTabs from "./PaketCategoryTabs";
import { usePathname, useRouter } from "next/navigation";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  
};

export default function PaketDetail({
  className,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();
  const pathname = usePathname();

  // States
  const [category, setCategory] = useState<PaketCategory | null>(null);

  // Effects
  useEffect(() => {
    category && router.push(pathname, { scroll: false });
  }, [category]);

  return (
    <div className={clsx(["bg-card rounded-lg shadow-lg pt-4 pb-8 px-6", className])} {...props}>
      {!category && <PaketCategories onCategoryChange={setCategory} />}

      {!!category && (
        <PaketCategoryTabs
          category={category}
          onBackPress={() => setCategory(null)}
        />
      )}
    </div>
  );
};
