'use client';

import TextField from "@/components/basics/forms/TextField";
import { useDebounce } from "@/lib/hooks";
import { UiTypographySize, useUiShallow } from "@/states/uiState";
import { QuestionModel } from "@/types/models";
import clsx from "clsx";
import numeral from "numeral";
import { useEffect, useRef, useState } from "react";

type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  question: QuestionModel;
  initialValue?: number;
  onChange?: (value: string) => void;
};

function NumericTable({
  question,
  onChange,
  initialValue,
  className,
  ...props
}: Props) {
  // Hooks
  const uiSize = useUiShallow(state => state.typography.size);

  const inputRef = useRef<HTMLInputElement>(null);

  // States
  const [input, setInput] = useState(initialValue === undefined ? '' : String(initialValue));

  const value = useDebounce(input, 500);

  // Effects
  useEffect(() => {
    onChange?.(value);
  }, [value]);

  // Vars
  const boxSize = ({
    sm: 42,
    base: 56,
    lg: 72,
    xl: 96,
  } as { [key in UiTypographySize]: number })[uiSize];
  const tableWidth = boxSize * 3;

  return !question.options?.length ? null : (
    <div className={clsx('numeric-table', className)} {...props}>
      <div
        className="flex flex-wrap w-36 border border-primary"
        style={{ width: `${tableWidth}px` }}
      >
        {question.options.map((item, index) => {
          const isNull = item === null;
          const basis = 100 / Math.min(3, question.options?.length || 1);

          return (
            <div
              key={`${question.id}-${index}`}
              className={clsx([
                `aspect-square border border-primary`,
                isNull && "cursor-pointer hover:bg-primary/30",
                (!!input && isNull) && "bg-primary/20",
              ])}
              style={{ flexBasis: `${basis}%` }}
              onClick={() => isNull && inputRef.current?.focus()}
            >
              <div className="flex items-center justify-center h-full text-lg">
                {'number' === typeof item && item}

                {isNull && (
                  !input ? (
                    <span className="text-red-500 font-bold">?</span>
                  ) : (
                    <span className="text-primary font-bold">{input}</span>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TextField
        ref={inputRef}
        className="mt-2"
        containerProps={{ style: { width: `${tableWidth}px` } }}
        label={`Jawaban Kamu:`}
        labelClassName="!font-bold !text-base"
        type="tel"
        placeholder="Tulis di sini..."
        value={input}
        onChange={(e) => {
          const value = numeral(e.target.value).format('0,0');

          setInput(e.target.value === '' ? '' : value);
        }}
      />
    </div>
  );
};

export default NumericTable;
