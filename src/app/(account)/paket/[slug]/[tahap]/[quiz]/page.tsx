import { Suspense } from "react";
import LoadingQuizReading from "../../../(loading)/LoadingQuizReading";
import LoadingQuizDefault from "../../../(loading)/LoadingQuizDefault";
import ServerQuizPage from "../../../(server)/ServerQuizPage";

export default async function PaketDetailSubtestPage({
  params,
}: {
  params: Promise<{ slug: string, tahap: string; quiz: string; }>
}) {
  const { slug, tahap, quiz } = await params;

  return (
    <Suspense fallback={['tbi-reading'].includes(quiz) ? (
      <LoadingQuizReading />
    ) : (
      <LoadingQuizDefault />
    )}>
      <ServerQuizPage
        slug={slug}
        tahap={tahap}
        quiz={quiz}
      />
    </Suspense>
  );
};
