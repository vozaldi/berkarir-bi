import { AnswerModel, QuestionModel } from "@/types/models";
import clsx from "clsx";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  question: QuestionModel;
  value?: AnswerModel['id'];
  isCorrectCallback?: (answer: AnswerModel) => boolean;
  onChange?: (answer: AnswerModel) => void;
};

function CATAnswer({
  question,
  value,
  isCorrectCallback,
  className,
  onChange,
  ...props
}: Props) {
  return (
    <div className={clsx(["table max-w-full", className])} {...props}>
      {(question.answers || []).map((item, index) => {
        const isSelected = value === item.id;
        const isCorrect = isCorrectCallback?.(item);

        return (
          <label
            key={item.id}
            className={clsx([
              "flex items-center px-3 py-1 rounded-lg gap-2 cursor-pointer min-w-[144px] border",
              !!index && "mt-2",
              isSelected && "border-primary bg-primary/75 hover:bg-primary/60 text-white",
              !isSelected && "border-dark-400 hover:bg-dark-200",
              isCorrect && "!border-green-500 shadow-lg shadow-green-500/50",
              (isCorrect && !isSelected) && "bg-green-500 text-white",
            ])}
            onChange={() => onChange?.(item)}
          >
            <input key={item.id} type="radio" value={index} name="answer" className="w-4 h-4 hidden" />

            <p className="font-bold self-start">{['A', 'B', 'C', 'D', 'E'][index]}.</p>
            <p className={clsx([isCorrect && 'flex-1'])}>{item.answer_text}</p>

            {isCorrect && (
              <IoCheckmarkCircleOutline size={24} className="self-start" />
            )}
          </label>
        );
      })}
    </div>
  );
};

export default CATAnswer;
