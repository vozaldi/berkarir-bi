import Button from "@/components/basics/buttons/Button";
import { QuestionDiscussion, QuestionModel } from "@/types/models";
import clsx from "clsx";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  questions: QuestionModel[];
  answers?: {
    [key: number]: number;
  };
  correctAnswers?: {
    [key: number]: number;
  };
  markedQuestionIds?: number[];
  isDiscussion?: boolean;

  onPageChange?: (page: number) => void;
};

export type CATQuestionListRef = {
  goToPage: (index: number) => void;
};

const CATQuestionList = forwardRef<CATQuestionListRef, Props>(({
  questions,
  answers = {},
  correctAnswers = {},
  markedQuestionIds = [],
  isDiscussion = false,
  onPageChange,
  className,
  ...props
}: Props, ref) => {
  // States
  const [active, setActive] = useState(0);

  // Effects
  useEffect(() => {
    onPageChange?.(active);
  }, [active]);

  // Refs
  useImperativeHandle(ref, () => ({
    goToPage: (index: number) => setActive(index),
  }), []);

  return (
    <div
      className={clsx([
        "flex flex-col bg-card rounded-xl shadow-md p-4",
        className,
      ])}
      {...props}
    >
      <h3 className="text-lg font-bold">
        {`Daftar Soal`}
      </h3>

      <div className="flex gap-2 mt-1">
        {[{
          label: `Belum Dijawab`,
          hoverClassName: 'hover:bg-primary/10',
          boxClassName: 'border-primary',
        }, {
          label: `Dijawab`,
          hoverClassName: 'hover:bg-green-500/10',
          boxClassName: 'bg-green-500 border-green-500',
          show: !isDiscussion,
        }, {
          label: `Ditandai`,
          hoverClassName: 'hover:bg-orange-500/10',
          boxClassName: 'bg-orange-500 border-orange-500',
          show: !isDiscussion,
        }, {
          label: `Benar`,
          hoverClassName: 'hover:bg-green-500/10',
          boxClassName: 'bg-green-500 border-green-500',
          show: !!isDiscussion,
        }, {
          label: `Salah`,
          hoverClassName: 'hover:bg-red-500/10',
          boxClassName: 'bg-red-500 border-red-500',
          show: !!isDiscussion,
        }].filter(({ show }) => show !== false).map((item, index) => (
          <div
            key={index}
            className={clsx([
              "flex gap-1 items-center p-1 rounded-xl bg-dark-200  text-dark-900 text-xs",
              "cursor-default",
              item.hoverClassName,
            ])}
          >
            <div className={clsx(["w-4 h-4 rounded-full border", item.boxClassName])} />

            <p className="pr-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="max-h-[50vh] mt-2 grid grid-cols-5 gap-2 pr-2 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-dark-100 [&::-webkit-scrollbar-thumb]:bg-dark-400">
        {Array.from(Array(questions.length)).map((_, index) => {
          const isActive = active === index;
          const isAnswered = answers[index] !== undefined;
          const isCorrect = correctAnswers[index] === answers[index];
          const isMarked = markedQuestionIds.includes(index);

          return (
            <div key={index} className="col-span-1">
              <Button
                className={clsx([
                  "relative w-full flex items-center justify-center lg:aspect-square p-2 rounded-md border border-primary text-lg",
                  isActive && "bg-primary text-white hover:bg-primary/80 hover:text-white",
                  (!isActive && !isDiscussion) && (
                    !isAnswered ? (
                      isMarked ? (
                        "bg-orange-500 text-white hover:bg-orange-500/80 hover:text-white !border-orange-500"
                      ) : (
                        "bg-card text-primary hover:bg-primary/10 hover:text-primary"
                      )
                    ) : (
                      "bg-green-500 text-white hover:bg-green-500/80 hover:text-white !border-green-500"
                    )
                  ),
                  (!isActive && isDiscussion) && (
                    !isAnswered ? (
                      "bg-card text-primary hover:bg-primary/10 hover:text-primary"
                    ) : (
                      isCorrect ? (
                        "bg-green-500 text-white hover:bg-green-500/80 hover:text-white !border-green-500"
                      ) : (
                        "bg-red-500 text-white hover:bg-red-500/80 hover:text-white !border-red-500"
                      )
                    )
                  ),
                ])}
                noPadding
                onClick={() => setActive(index)}
              >
                {index + 1}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CATQuestionList;
