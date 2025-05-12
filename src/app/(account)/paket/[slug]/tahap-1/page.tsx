import DashboardMenu from "@/components/pages/account/dashboard/DashboardMenu";
import { httpServer } from "@/server/httpServer";
import { Suspense } from "react";
import ServerTahap1Navigation from "./(server)/ServerTahap1Navigation";
import Tahap1NavigationLoading from "./(loading)/Tahap1NavigationLoading";

export default async function PaketDetailCAT({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  await httpServer(`/v1/quizzes/${slug}/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (
    <section className="container px-4 mx-auto pt-6 pb-8 grid grid-cols-12 gap-6">
      <div className="lg:col-span-3 col-span-12">
        <DashboardMenu className="sticky top-24" />
      </div>

      <div className="lg:col-span-9 col-span-12 flex flex-col gap-y-4">
        <Suspense fallback={<Tahap1NavigationLoading />}>
          <ServerTahap1Navigation
            className="flex-1"
            slug={slug}
          />
        </Suspense>
      </div>
    </section>
  );
};
