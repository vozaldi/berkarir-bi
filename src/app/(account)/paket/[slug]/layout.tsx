import { httpServer } from "@/server/httpServer";
import { QuizModel } from "@/types/models";
import PaketProvider from "./(client)/PaketProvider";
import Error404 from "@/components/pages/errors/Error404";

export default async function PaketDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  const quiz = await httpServer(`/v1/quizzes/${slug}`)
    .then((data): QuizModel => {
      if (data.data) {
        return data.data;
      }

      throw data;
    }).catch((err) => null);

  if (!quiz) {
    return <Error404 />;
  }

  return (
    <PaketProvider quiz={quiz}>
      {children}
    </PaketProvider>
  );
};
