'use client';

import Badge from "@/components/basics/Badge";
import Button from "@/components/basics/buttons/Button";
import { PaketCategory } from "@/types/models";
import clsx from "clsx";
import { LottieRefCurrentProps } from "lottie-react";
import dynamic from "next/dynamic";
import React, { useRef } from "react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type PaketCategoryItem = PaketCategory & {
  lottie?: any;
  lottieClassName?: string;
  lottieBackground?: boolean;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  category: PaketCategoryItem;
  onMulaiClick?: (category: PaketCategoryItem) => void;
};

function PaketCategoryCard({
  className,
  category: detail,
  onMulaiClick,
  ...props
}: Props) {
  // Hooks
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const subtestRef = useRef<HTMLDivElement>(null);

  // Vars
  const { quizes = [] } = detail;

  return (
    <div
      className={clsx(["flex flex-col items-center w-full bg-card dark:bg-dark-500/20 rounded-2xl border border-dark-500/30 p-4 shadow-xs shadow-primary/15 hover:shadow-xl dark:hover:bg-dark-500/30 scale-100 hover:scale-105 transition-all duration-200 ease-in-out", className])}
      onMouseOver={() => lottieRef.current?.play()}
      onMouseOut={() => lottieRef.current?.pause()}
      {...props}
    >
      <h5 className="text-sm opacity-60 font-semibold">{detail.title}</h5>

      <h3 className="text-xl font-bold text-center">
        {detail.name}
      </h3>

      <div className="relative flex flex-column items-center justify-center h-[156px] overflow-hidden">
        {!!detail.lottieBackground && (
          <div className="absolute w-[144px] aspect-square bg-white/75 rounded-4xl" />
        )}

        <Lottie
          animationData={detail.lottie}
          loop={true}
          autoplay={false}
          lottieRef={lottieRef}
          className={clsx(["-my-8", detail.lottieClassName])}
        />
      </div>

      <div
        className="flex flex-col gap-2 mt-2 self-stretch"
        onMouseMove={(e) => {
          const bound = e.currentTarget.getBoundingClientRect();
          const width = e.currentTarget.clientWidth;
          const x = e.clientX - bound.left;
          let currentLeft = subtestRef.current?.scrollLeft || 0;

          if (x > (width * 0.5)) {
            currentLeft += 72;
          } else {
            currentLeft -= 72;
          }

          subtestRef.current?.scrollTo({ left: currentLeft, behavior: "smooth" });
        }}
      >
        <p className="opacity-80 text-center">
          {`Berisi ${quizes.length} Subtest`}
        </p>

        <div
          ref={subtestRef}
          className={clsx([
            "-mx-4 overflow-hidden flex",
            quizes.length <= 3 && "justify-center",
            quizes.length > 3 && "justify-start",
          ])}
        >
          <div className="px-4 flex gap-1 items-center">
            {detail.quizes?.map((quiz, index) => (
              <Badge
                key={index}
                className="!rounded-full text-xs text-primary-dark bg-primary/20 py-0.5 px-2 text-nowrap hover:bg-primary hover:text-white"
              >{quiz.name}</Badge>
            ))}
          </div>
        </div>
      </div>

      <Button
        className="mt-4 w-full !rounded-full"
        color="primary"
        onClick={() => onMulaiClick?.(detail)}
      >{`Buka ${detail.title}`}</Button>
    </div>
  );
};

export default PaketCategoryCard;
