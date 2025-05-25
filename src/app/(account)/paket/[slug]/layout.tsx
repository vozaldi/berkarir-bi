import { httpServer } from "@/server/httpServer";
import { PaketCategory, PaketModel, QuizModel } from "@/types/models";
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
        const model: PaketModel = { ...data.data };

        const tahap1: PaketCategory = {
          id: 1,
          title: `Tahap 1`,
          name: `Kognitif Test`
        };
        const tahap2: PaketCategory = {
          id: 2,
          title: `Tahap 2`,
          name: `Kebanksentralan`
        };

        tahap1.quizes = [
          { id: 1, name: `Verbal` },
          { id: 2, name: `Numeric` },
          { id: 3, name: `Figural` },
        ];

        tahap2.quizes = [
          { id: 1, name: `Pengetahuan Umum` },
          { id: 2, name: `Kebanksentralan` },
          { id: 3, name: `TBI Structure` },
          { id: 4, name: `TBI Written Expression` },
          { id: 5, name: `TBI Reading` },
        ];

        model.categories = [tahap1, tahap2];

        return model;
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
