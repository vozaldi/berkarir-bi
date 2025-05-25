'use client';

import Badge from "@/components/basics/Badge";
import Button from "@/components/basics/buttons/Button";
import { QuizModel } from "@/types/models";
import clsx from "clsx";
import { LottieRefCurrentProps } from "lottie-react";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { IoTimeOutline } from "react-icons/io5";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export type SubtestItem = QuizModel & {
  category?: string;
  title?: string;
  question?: number;
  minute?: number;
  lottie?: any;
  lottieClassName?: string;
  lottieBackground?: boolean;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  subtest: SubtestItem;
  onMulaiClick?: (subtest: SubtestItem) => void;
};

function PaketSubtestItem({
  className,
  subtest,
  onMulaiClick,
  ...props
}: Props) {
  // Hooks
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div
      className={clsx(["flex flex-col items-center w-full bg-card dark:bg-dark-500/20 rounded-2xl border border-dark-500/30 p-4 shadow-xs shadow-primary/15 hover:shadow-xl dark:hover:bg-dark-500/30 scale-100 hover:scale-105 transition-all duration-200 ease-in-out", className])}
      onMouseOver={() => lottieRef.current?.play()}
      onMouseOut={() => lottieRef.current?.pause()}
      {...props}
    >
      <h5 className="text-sm opacity-60">{subtest.title}</h5>

      <h3 className="text-xl font-bold text-center">
        {subtest.name}
      </h3>

      <div className="relative flex flex-column items-center justify-center h-[156px] overflow-hidden">
        {!!subtest.lottieBackground && (
          <div className="absolute w-[144px] aspect-square bg-white/75 rounded-4xl" />
        )}

        <Lottie
          animationData={subtest.lottie}
          loop={true}
          autoplay={false}
          lottieRef={lottieRef}
          className={clsx(["-my-12", subtest.lottieClassName])}
        />
      </div>

      <p className="mt-2 opacity-80">
        {`Berisi ${subtest.question} Soal`}
      </p>

      <Badge className="flex items-center text-sm gap-1 rounded-md mt-1 bg-primary/20 text-primary-dark">
        <IoTimeOutline className="text-lg" />

        <div className="flex flex-col">
          <span className="text-xs opacity-75">{`Waktu Pengerjaan`}</span>
          <strong className="-mt-1">{`${subtest.minute} menit`}</strong>
        </div>
      </Badge>

      <Button
        className="mt-4 w-full !rounded-full"
        color="primary"
        onClick={() => onMulaiClick?.(subtest)}
      >{`Mulai`}</Button>
    </div>
  );
};

export default PaketSubtestItem;
