import CATPage from "@/components/pages/account/cat/CATPage";
import { httpServer } from "@/server/httpServer";
import { QuestionModel, QuizModel } from "@/types/models";
import clsx from "clsx";
import * as questions_tahap_1_numeric from "@/assets/questions/tahap-1-numeric.json";
import * as questions_tahap_1_numeric_table from "@/assets/questions/tahap-1-numeric-table.json";
import * as questions_tahap_2_we from "@/assets/questions/tahap-2-written-expression.json";
import * as questions_tahap_2_reading from "@/assets/questions/tahap-2-reading.json";
import PaketCATPage from "../(client)/(pages)/PaketCATPage";
import PaketCATReadingPage from "../(client)/(pages)/PaketCATReadingPage";

type Props = {
  slug: string;
  tahap: string;
  quiz: string;
};

export default async function ServerQuizPage({
  slug, tahap, quiz: subtest
}: Props) {
  const quiz = await httpServer(`/v1/quizzes/${slug}`)
    .then((data): QuizModel => {
      if (data.data) {
        return data.data;
      }

      throw data;
    }).catch((err) => null);
  const questions = await httpServer(`/v1/quizzes/${slug}/questions`)
    .then((data) => {
      if (data.data) {
        const items: any[] = data.data;
        const models: QuestionModel[] = items.map((item): QuestionModel => {
          return { ...item };
        });

        if (subtest === 'numeric') {
          Array.from(questions_tahap_1_numeric).reverse().forEach((item) => {
            models.unshift(item);
          });
        }

        if (subtest === 'numeric') {
          Array.from(questions_tahap_1_numeric_table).reverse().forEach((item) => {
            models.unshift(item);
          });
        }

        if (subtest === 'tbi-expression') {
          Array.from(questions_tahap_2_we).reverse().forEach((item) => {
            models.unshift(item);
          });
        }

        if (subtest === 'tbi-reading') {
          Array.from(questions_tahap_2_reading).reverse().forEach((item) => {
            models.unshift(item);
          });
        }

        return models;
      }

      throw data;
    }).catch((): QuestionModel[] => []);

  await httpServer(`/v1/quizzes/${slug}/start`, {
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
        ['tbi-reading'].includes(subtest) ? (
          <PaketCATReadingPage quiz={{ ...quiz, questions }} />
        ) : (
          <PaketCATPage quiz={{ ...quiz, questions }} />
        )
      )}
    </section>
  );
};
