import { QuestionModel } from "@/types/models"
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  question?: QuestionModel;
};

function QuestionWrittenExpression({
  question,
  className,
  ...props
}: Props) {
  // Vars
  const words = question?.question_text?.split(' ') || [];
  const qMarks = words.reduce<number[]>((a, b, currentIndex) => {
    if (b !== '?') return a;

    return [...a, currentIndex];
  }, []);

  return (
    <>
      <div className={clsx(['flex flex-wrap gap-x-2 gap-y-0', className])} {...props}>
        {words.map((item, index) => {
          const qMarkIndex = qMarks.indexOf(index);

          if (qMarkIndex >= 0) {
            const i = qMarks[qMarkIndex];

            return (
              <div key={index} className="flex flex-col items-center">
                <strong className="underline">
                  {question?.answers?.[qMarkIndex]?.answer_text}
                </strong>
                <strong>{["A", "B", "C", "D", "E"][qMarkIndex] || "?"}</strong>
              </div>
            );
          };

          return <span key={index}>{item}</span>;
        })}
      </div>
    </>
  );
};

export default QuestionWrittenExpression;
