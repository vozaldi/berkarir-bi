'use client';

import { QuizModel } from "@/types/models";
import clsx from "clsx";
import * as lottie_verbal from "@/assets/lotties/paket/paket-verbal.json";
import * as lottie_numeric from "@/assets/lotties/paket/paket-numeric.json";
import * as lottie_figural from "@/assets/lotties/paket/paket-figural.json";
import Tahap1SubtestItem from "./Tahap1SubtestItem";
import { useState } from "react";
import Tahap1Disclaimer from "./Tahap1Disclaimer";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  quiz: QuizModel;
};

export default function Tahap1SubtestList({
  className,
  quiz,
  ...props
}: Props) {
  // States
  const [subtest, setSubtest] = useState<string | null>(null);

  return (
    <div className={clsx(["grid grid-cols-12 gap-6", className])} {...props}>
      {[
        {
          category: "verbal",
          name: "Verbal",
          title: "Subtes 1",
          question: 10,
          minute: 12,
          lottie: lottie_verbal,
        }, {
          category: "numeric",
          name: "Numeric",
          title: "Subtes 2",
          question: 10,
          minute: 10,
          lottieClassName: "h-[220px]",
          lottie: lottie_numeric,
          lottieBackground: true,
        }, {
          category: "figural",
          name: "Figural",
          title: "Subtes 3",
          question: 10,
          minute: 10,
          lottie: lottie_figural,
          lottieClassName: "h-[144px] max-h-full",
        }
      ].map((item) => (
        <div key={item.category} className="col-span-4">
          <Tahap1SubtestItem
            subtest={item}
            onMulaiClick={(subtest) => setSubtest(subtest.category || null)}
          />
        </div>
      ))}

      <Tahap1Disclaimer
        isVisible={!!subtest}
        onHide={() => setSubtest(null)}
        quiz={quiz}
        subtest={subtest || undefined}
      />
    </div>
  );
};
