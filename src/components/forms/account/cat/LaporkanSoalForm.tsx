'use client';

import Button from "@/components/basics/buttons/Button";
import TextField from "@/components/basics/forms/TextField";
import { useFields } from "@/lib/hooks";
import { httpService } from "@/lib/utilities";
import { QuestionModel, QuizModel } from "@/types/models";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  quiz: QuizModel;
  question: QuestionModel;
  onCancel?: () => void;
  onSubmitted?: () => void;
};

function LaporkanSoalForm({
  className,
  onCancel,
  onSubmitted,
  quiz,
  question,
  ...props
}: Props) {
  // Hooks
  const input = useFields({
    report_reason: '',
  });

  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Effects
  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        onSubmitted?.();
      }, 2000);
    }
  }, [isFinished, onSubmitted]);

  useEffect(() => {
    setIsFinished(false);
  }, [quiz.id]);

  // Vars
  const handleSubmit = () => {
    if (!input.fields.report_reason) {
      return input.handleErrorShow('report_reason', `Mohon tulis alasan mengapa kamu melaporkan soal ini`);
    }

    setIsSaving(true);

    return httpService(`/v1/quizzes/${quiz.id}/questions/${question.id}/report`, {
      method: "POST",
      data: {
        report_reason: input.fields.report_reason,
      },
    }).then(() => {
      setIsFinished(true);
      input.reset();
    }).catch((err) => {
      const message = err?.message || err?.data?.message || `Unexpected error.`;

      return input.handleErrorShow([], message);
    }).finally(() => {
      setIsSaving(false);
    });
  };

  return isFinished ? (
    <div className={clsx(['text-center py-4', className])}>
      <h3 className="text-xl font-bold mb-2">
        {`Laporan Dikirim`}
      </h3>

      <p>{`Terima kasih! Laporan kamu sangat berarti bagi kami.`}</p>
    </div>
  ) : (
    <form
      className={clsx(['text-left', className])}
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
      autoComplete="off"
      {...props}
    >
      <h3 className="text-2xl text-center">
        <strong>{`Laporkan Soal`}</strong>
      </h3>

      <p className="mt-4">{`Mengapa kamu melaporkan soal ini?`}</p>

      <div className="mt-2">
        <TextField
          value={input.fields.report_reason}
          InputComponent={(
            <textarea
              className={clsx("form-control py-2 px-4 border-2 border-primary/50 rounded-lg focus:border-primary outline-none", input.isFieldError('report_reason') && "is-invalid")}
              value={input.fields.report_reason}
              placeholder={`Tulis alasan...`}
              rows={3}
              onChange={(e) => input.handleFieldChange('report_reason', e.target.value)}
            />
          )}
          error={input.isFieldError('report_reason')}
          message={input.error.message}
        />
      </div>

      {input.isFieldError() && (
        <p className="text-sm text-red-500 mt-2">{input.error.message}</p>
      )}

      <div className="flex justify-end gap-x-4 mt-6">
        <Button
          outline="primary"
          loading={isSaving}
          onClick={() => onCancel?.()}
        >
          {`Batal`}
        </Button>
  
        <Button
          type="submit"
          color="primary"
          loading={isSaving}
        >
          {`Kirim Laporan`}
        </Button>
      </div>
    </form>
  );
};

export default LaporkanSoalForm;
