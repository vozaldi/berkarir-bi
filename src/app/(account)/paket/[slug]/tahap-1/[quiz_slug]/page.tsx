import CATPage from "@/components/pages/account/cat/CATPage";
import { httpServer } from "@/server/httpServer";
import { QuestionModel, QuizModel } from "@/types/models";
import clsx from "clsx";
import { Suspense } from "react";

export default async function PaketDetailCAT({
  params,
}: {
  params: Promise<{ quiz_slug: string }>
}) {
  const { quiz_slug } = await params;
  const quiz = await httpServer(`/v1/quizzes/${quiz_slug}`)
    .then((data): QuizModel => {
      if (data.data) {
        return data.data;
      }

      throw data;
    }).catch((err) => null);
  const questions = await httpServer(`/v1/quizzes/${quiz_slug}/questions`)
    .then((data) => {
      if (data.data) {
        const items: any[] = data.data;
        const models: QuestionModel[] = items.map((item): QuestionModel => {
          return { ...item };
        });
  
        return models;
      }

      throw data;
    }).catch((): QuestionModel[] => []);

  await httpServer(`/v1/quizzes/${quiz_slug}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (
    <section
      className={clsx([
        "container px-4 mx-auto pt-6 pb-8 flex-1 min-h-[90vh]",
        !!quiz && "flex flex-col gap-6",
        !quiz && "flex-col items-center justify-center gap-6",
      ])}
    >
      {!quiz ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold">{`Error 404`}</h3>
          <p className="mt-4">{`Kuis tidak ditemukan`}</p>
        </div>
      ) : (
        <Suspense>
          <CATPage quiz={{ ...quiz, questions }} />
        </Suspense>
      )}
    </section>
  );
};
