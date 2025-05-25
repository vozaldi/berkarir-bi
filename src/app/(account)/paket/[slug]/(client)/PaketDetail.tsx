"use client";

import clsx from "clsx";
import { IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import { usePaketShallow } from "./PaketProvider";
import Button from "@/components/basics/buttons/Button";
import Badge from "@/components/basics/Badge";
import { useState } from "react";
import CATDisclaimerModal from "@/components/pages/account/cat/CATDisclaimerModal";
import { moment } from "@/lib/utilities";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  
};

export default function PaketDetail({
  className,
  ...props
}: Props) {
  // 
  const quiz = usePaketShallow((state) => state.quiz);

  // States
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <div className={clsx(["bg-card rounded-lg shadow-lg pt-4 pb-8 px-6", className])} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold px-3 pb-4 border-b border-dark-300">
          {quiz.name}
        </h1>

        <p className="mt-4">
          <strong>{`Waktu Pengerjaan`}</strong>
        </p>

        <div className="flex gap-2 items-center">
          <IoCalendarOutline className="text-primary-dark" />

          <span>{moment().format('dddd, D MMM YYYY')}</span>
        </div>
      </div>

      <div className={clsx(["grid grid-cols-12 gap-6 mt-4 w-8/12 mx-auto"])}>
        {[
          {
            category: "verbal",
            name: "Tahap 1",
            title: "Kognitif Test",
            question: 10,
            minute: 12,
          }, {
            category: "numeric",
            name: "Tahap 2",
            title: "Kebanksentralan",
            question: 10,
            minute: 10,
            lottieClassName: "h-[220px]",
            lottieBackground: true,
          }
        ].map((item) => (
          <div key={item.category} className="col-span-6">
            <div
              className={clsx(["flex flex-col items-center w-full bg-card dark:bg-dark-500/20 rounded-2xl border border-dark-500/30 p-4 shadow-xs shadow-primary/15 hover:shadow-xl dark:hover:bg-dark-500/30 scale-100 hover:scale-105 transition-all duration-200 ease-in-out", className])}
            >
              <h5 className="text-sm opacity-60">{item.title}</h5>

              <h3 className="text-xl font-bold text-center">
                {item.name}
              </h3>

              <div className="relative flex flex-column items-center justify-center h-[156px] overflow-hidden">
                {!!item.lottieBackground && (
                  <div className="absolute w-[144px] aspect-square bg-white/75 rounded-4xl" />
                )}
              </div>

              <p className="mt-2 opacity-80">
                {`Berisi ${item.question} Soal`}
              </p>

              <Badge className="flex items-center text-sm gap-1 rounded-md mt-1 bg-primary/20 text-primary-dark">
                <IoTimeOutline className="text-lg" />

                <div className="flex flex-col">
                  <span className="text-xs opacity-75">{`Waktu Pengerjaan`}</span>
                  <strong className="-mt-1">{`${item.minute} menit`}</strong>
                </div>
              </Badge>

              <Button
                className="mt-4 w-full !rounded-full"
                color="primary"
                onClick={() => setShowDisclaimer(true)}
              >{`Mulai`}</Button>
            </div>
          </div>
        ))}

        <CATDisclaimerModal
          isVisible={showDisclaimer}
          onHide={() => setShowDisclaimer(false)}
          quiz={quiz}
          tahap={1}
        />
      </div>
    </div>
  );
};
