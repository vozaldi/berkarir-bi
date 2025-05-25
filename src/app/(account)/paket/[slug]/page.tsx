import Error404 from "@/components/pages/errors/Error404";
import { httpServer } from "@/server/httpServer";
import { PaketModel, QuestionMainCategory, QuestionModel } from "@/types/models";
import clsx from "clsx";
import Image from "next/image";
import PaketBukaButton from "../(client)/(navigations)/PaketBukaButton";

export default async function PaketDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const paket = await httpServer(`/v1/quizzes/${slug}`)
    .then((data): PaketModel => {
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

        return models;
      }

      throw data;
    }).catch((): QuestionModel[] => []);

  if (!paket) {
    return (
      <Error404 className="my-8" />
    );
  }

  const categories = questions.reduce<QuestionMainCategory[]>((a, b) => {
    const category = b.main_category;

    if (category && !a.find(({ id }) => id === category.id)) {
      return [...a, { ...category, questions: [b] }];
    }

    return a.map((item) => {
      if (item.id === category?.id) {
        return { ...item, questions: [...(item.questions || []), b] };
      }

      return item;
    });
  }, []);

  return (
    <>
      <div className="container mx-auto py-6 px-4 grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col">
          <h1 className="text-xl font-bold">{paket.name}</h1>

          <p className="text-sm text-dark-500">
            {`Berisi total ${questions.length} soal`}
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((item) => (
              <span key={item.id} className={clsx([
                'px-2 py-0.5 rounded-md text-white text-xs',
                [
                  'bg-yellow-700', 'bg-blue-500', 'bg-green-500',
                  'bg-pink-700', 'bg-cyan-500', 'bg-purple-500',
                  'bg-orange-700', 'bg-lime-500', 'bg-amber-500',
                ][(item.id || 0) % 9],
              ])}>
                {item.name}
              </span>
            ))}
          </div>

          <PaketBukaButton className="flex pt-4" paket={paket} />

          <div className="mt-8 bg-card rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold">{`Detail Paket`}</h3>

            <table className="mt-2 table">
              <thead>
                <tr>
                  <th className="text-left font-bold">{`Pelajaran`}</th>
                  <th className="font-bold">{`Skor`}</th>
                  <th className="font-bold">{`Nilai Akhir`}</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item) => (
                  <tr key={item.id} className="odd:bg-dark-200">
                    <td>{item.name}</td>
                    <td className="text-center">{item.questions?.length}</td>
                    <td className="text-end">{0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-1">
          <Image
            // src={`/assets/images/products/product-1.jpg`}
            src={`https://picsum.photos/seed/${paket.name}/512/256`}
            alt={paket.name || `Image`}
            className="w-full h-auto rounded-lg shadow-md"
            width={400}
            height={200}
          />
        </div>
      </div>
    </>
  );
};
