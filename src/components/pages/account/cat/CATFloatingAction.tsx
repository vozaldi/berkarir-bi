'use client';

import Button from "@/components/basics/buttons/Button";
import { QuestionModel } from "@/types/models";
import clsx from "clsx";
import { IoBookmarkOutline, IoBookOutline, IoChevronBack, IoChevronForward, IoExitOutline, IoFlagOutline } from "react-icons/io5";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  questions?: QuestionModel[];
  activeIndex?: number;
  activeQuestion?: QuestionModel | null;
  isMarked?: boolean;
  isEnded?: boolean;
  onNavigateClick?: (index: number | 'next' | 'prev') => void;
  onLaporkanClick?: () => void;
  onTandaiClick?: () => void;
  onFinishClick?: () => void;
};

function CATFloatingAction({
  className,
  questions = [],
  isMarked,
  isEnded,
  activeIndex = 0,
  activeQuestion,
  onNavigateClick,
  onLaporkanClick,
  onTandaiClick,
  onFinishClick,
  ...props
}: Props) {
  return (
    <div className={clsx(["flex flex-col items-center pointer-events-none", className])} {...props}>
      <div className="container mx-auto px-4 flex items-center gap-6">
        <div className="flex-1 flex justify-between gap-2">
          <div className="bg-card p-1.5 flex gap-2 items-center rounded-2xl border border-dark-300 dark:border-dark-500/30 pointer-events-auto shadow-sm">
            {!isEnded && (
              <Button
                className={clsx([
                  "!py-1.5 !px-3 -my-2 !rounded-xl flex gap-1",
                  isMarked && "bg-orange-500 text-white hover:bg-orange-500/80 hover:text-white",
                  !isMarked && "bg-orange-500/15 hover:bg-orange-500/30 text-orange-500 ",
                ])}
                onClick={onTandaiClick}
              >
                <IoBookmarkOutline />

                <span>{isMarked ? `Soal Ditandai` : `Tandai Soal`}</span>
              </Button>
            )}

            <Button
              className="bg-red-500/15 hover:bg-red-500/30 text-red-500 flex gap-1 !py-1.5 !rounded-xl"
              onClick={onLaporkanClick}
            >
              <IoFlagOutline />

              <span>{`Laporkan Soal`}</span>
            </Button>
          </div>

          <div className="bg-card p-1.5 flex gap-6 items-center rounded-2xl border border-dark-300 dark:border-dark-500/30 pointer-events-auto shadow-sm">
            <Button
              className="flex gap-1 !py-1.5 !rounded-xl"
              color="primary"
              onClick={() => onNavigateClick?.('prev')}
            >
              <IoChevronBack className="-ml-1" />
              <span>{`Sebelumnya`}</span>
            </Button>

            <div className="flex items-center gap-2">
              <IoBookOutline />

              <span>{`${activeIndex + 1} dari ${questions.length} Soal`}</span>
            </div>

            <Button
              className="flex gap-1 !py-1.5 !rounded-xl"
              color="primary"
              onClick={() => onNavigateClick?.('next')}
            >
              <span>{`Selanjutnya`}</span>
              <IoChevronForward className="-mr-1" />
            </Button>
          </div>
        </div>

        <div className="w-3/12 pointer-events-auto">
          {!isEnded && (
            <Button
              className="w-full bg-orange-500/15 hover:bg-orange-500/30 text-orange-500 flex gap-1 !rounded-xl"
              onClick={onFinishClick}
            >
              <IoExitOutline />

              <span>{`Akhiri Ujian`}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CATFloatingAction;
