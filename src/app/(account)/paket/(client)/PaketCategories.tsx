"use client";

import clsx from "clsx";
import { usePaketShallow } from "./(providers)/PaketProvider";
import * as lottie_tahap_1 from "@/assets/lotties/paket/tahap-pen-strong.json";
import * as lottie_tahap_2 from "@/assets/lotties/paket/tahap-document.json";
import PaketCategoryCard from "./(cards)/PaketCategoryCard";
import { IoCalendarOutline } from "react-icons/io5";
import { moment } from "@/lib/utilities";
import { PaketCategory } from "@/types/models";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  onCategoryChange?: (category: PaketCategory) => void
};

function PaketCategories({
  className,
  onCategoryChange,
  ...props
}: Props) {
  // Hooks
  const paket = usePaketShallow((state) => state.paket);

  // Vars
  const { categories = [] } = paket;

  return (
    <div className={clsx(["paket-category", className])} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold px-3 pb-4 border-b border-dark-300">
          {paket.name}
        </h1>

        <p className="mt-4">
          <strong>{`Waktu Pengerjaan`}</strong>
        </p>

        <div className="flex gap-2 items-center">
          <IoCalendarOutline className="text-primary-dark" />

          <span>{moment().format('dddd, D MMM YYYY')}</span>
        </div>
      </div>

      <div className={clsx(["grid grid-cols-12 gap-6 mt-8 w-8/12 mx-auto"])}>
        {Array.from(Array(categories.length)).map((_, index) => {
          const item = categories[index];
          const lottie = item.title === "Tahap 1" ? lottie_tahap_1 : lottie_tahap_2;

          return (
            <div key={item.id} className="col-span-6">
              <PaketCategoryCard
                category={{
                  ...item,
                  lottie,
                  lottieClassName: 'max-w-[200px]'
                }}
                onMulaiClick={(item) => onCategoryChange?.(item)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaketCategories;
