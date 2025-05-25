'use client';

import { PaketCategory, QuizModel } from "@/types/models";
import clsx from "clsx";
import * as lottie_verbal from "@/assets/lotties/paket/paket-verbal.json";
import * as lottie_numeric from "@/assets/lotties/paket/paket-numeric.json";
import * as lottie_figural from "@/assets/lotties/paket/paket-figural.json";
import * as lottie_pengetahuan_umum from "@/assets/lotties/paket/subtest-tpu.json";
import * as lottie_kebanksentralan from "@/assets/lotties/paket/subtest-kebanksentralan.json";
import * as lottie_tbi_structure from "@/assets/lotties/paket/subtest-conversation.json";
import * as lottie_tbi_expression from "@/assets/lotties/paket/subtest-writing-paper.json";
import * as lottie_tbi_reading from "@/assets/lotties/paket/subtest-read-newspaper.json";
import { useState } from "react";
import PaketSubtestItem, { SubtestItem } from "./(cards)/PaketSubtestItem";
import PaketCATDisclaimerModal from "./(modals)/PaketCATDisclaimerModal";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  category: PaketCategory;
};

export default function PaketSubtestList({
  className,
  category,
  ...props
}: Props) {
  // States
  const [{ subtest, quiz }, setDetail] = useState({
    subtest: null as SubtestItem | null,
    quiz: null as QuizModel | null
  });
  
  // Vars
  const subtests = [
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
    }, {
      name: `Pengetahuan Umum`,
      lottie: lottie_pengetahuan_umum,
      question: 50,
      minute: 30,
      lottieClassName: "h-[180px] max-h-full",
    }, {
      name: `Kebanksentralan`,
      lottie: lottie_kebanksentralan,
      question: 70,
      minute: 40,
      lottieClassName: "h-[144px] max-h-full",
    }, {
      name: `TBI Structure`,
      lottie: lottie_tbi_structure,
      question: 20,
      minute: 12.5,
      lottieClassName: "h-[144px] max-h-full",
    }, {
      name: `TBI Written Expression`,
      lottie: lottie_tbi_expression,
      question: 50,
      minute: 30,
      lottieClassName: "h-[180px] max-h-full",
    }, {
      name: `TBI Reading`,
      lottie: lottie_tbi_reading,
      question: 20,
      minute: 20,
      lottieClassName: "h-[180px] max-h-full",
    },
  ];

  return (
    <div className={clsx(["grid grid-cols-12 gap-6", className])} {...props}>
      {category.quizes?.map((quiz, index) => {
        const item = subtests.find((item) => item.name === quiz.name) || quiz;

        return (
          <div key={quiz.id} className="col-span-4">
            <PaketSubtestItem
              subtest={item}
              onMulaiClick={() => setDetail({ subtest: item, quiz })}
            />
          </div>
        );
      })}

      <PaketCATDisclaimerModal
        isVisible={!!subtest}
        onHide={() => setDetail({ subtest: null, quiz: null })}
        quiz={quiz}
        subtest={subtest?.category}
        category={category || undefined}
      />
    </div>
  );
};
