import Button from "@/components/basics/buttons/Button";
import PaketSaya from "@/components/pages/account/cat/PaketSaya";
import DashboardMenu from "@/components/pages/account/dashboard/DashboardMenu";
import LogoutButton from "@/components/pages/account/LogoutButton";
import { httpServer } from "@/server/httpServer";
import { QuizModel } from "@/types/models";
import Image from "next/image";
import { IoDocumentTextOutline, IoFileTrayFullOutline, IoHomeOutline, IoPersonOutline } from "react-icons/io5";

export default async function Account() {
  const quizzes = await httpServer('/v1/quizzes').then((data) => {
    if (data.data) {
      const items: any[] = data.data;
      const models: QuizModel[] = items.map((item) => {
        return { ...item };
      });

      return models;
    }

    throw data;
  }).catch((err): QuizModel[] => {
    return [];
  });

  return (
    <section className="container px-4 mx-auto pt-6 pb-8 grid grid-cols-12 gap-6">
      <div className="lg:col-span-3 col-span-12">
        <DashboardMenu className="sticky top-24" />
      </div>

      <div className="lg:col-span-9 col-span-12 flex flex-col gap-y-4">
        <div className="bg-card rounded-lg shadow-lg py-4 px-6">
          <h3 className="text-xl font-bold md:text-left text-center">
            {`Paket Saya`}
          </h3>

          <PaketSaya quizzes={quizzes.filter(({ quiz_type }) => quiz_type?.key === 'practice')} />
        </div>
      </div>
    </section>
  );
};
