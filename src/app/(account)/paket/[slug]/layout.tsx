import { httpServer } from "@/server/httpServer";
import { PaketModel, QuizModel } from "@/types/models";
import Error404 from "@/components/pages/errors/Error404";
import PaketProvider from "../(client)/(providers)/PaketProvider";

export default async function PaketDetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  const paket = await httpServer(`/v1/quizzes/${slug}`)
    .then((data): PaketModel => {
      if (data.data) {
        return data.data;
      }

      throw data;
    }).catch((err) => null);

  if (!paket) {
    return <Error404 />;
  }

  return (
    <PaketProvider paket={paket}>
      {children}
    </PaketProvider>
  );
};
