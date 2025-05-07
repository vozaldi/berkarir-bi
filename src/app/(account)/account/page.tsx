import Badge from "@/components/basics/Badge";
import DashboardCarousel from "@/components/pages/account/dashboard/DashboardCarousel";
import DashboardMenu from "@/components/pages/account/dashboard/DashboardMenu";
import DashboardQuizTabs from "@/components/pages/account/dashboard/DashboardQuizTabs";
import RoleStatistic from "@/components/pages/account/dashboard/RoleStatistic";
import { httpServer } from "@/server/httpServer";
import { QuizModel, UserModel } from "@/types/models";
import Link from "next/link";
import { IoArrowForward, IoBulb, IoDocumentTextOutline, IoFitness, IoListOutline, IoLockClosed } from "react-icons/io5";

export default async function Account() {
  const user = await httpServer('/profile').then<UserModel | null>((data) => data.data);
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
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {`Selamat Datang, ${user?.name || "User"}`}
            </h2>
            <p className="text-sm text-dark-700">
              {`Kamu sudah siap untuk memulai perjalananmu?`}
            </p>
          </div>

          <div className="">
            <div className="flex gap-1">
              <Badge className="rounded-md" color="danger" size="xs">
                {`Terbaru!`}
              </Badge>

              <Badge className="rounded-md !bg-cyan-500" color="info" size="xs">
                {`Tryout`}
              </Badge>
            </div>

            <Link
              href={`/`}
              className="flex items-center gap-1 text-dark-900 hover:text-primary"
            >
              <h5 className="text-base font-bold underline">
                {`CPNS Tryout 2025 - Full Test`}
              </h5>

              <IoArrowForward />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <DashboardQuizTabs quizzes={quizzes} />
          </div>

          <div className="col-span-1 flex flex-col gap-4">
            <DashboardCarousel
              images={[{
                src: `/assets/images/banners/Slideshow-short-1.png`,
                alt: "Banner 1",
                className: '!rounded-xl',
              }, {
                src: `/assets/images/banners/Slideshow-short-2.png`,
                alt: "Banner 2",
                className: '!rounded-xl',
              }]}
            />

            <RoleStatistic className="bg-card rounded-2xl shadow-md py-4" />

            <div className="bg-card rounded-lg shadow-md px-3 pt-2 pb-4 flex flex-col">
              <h3 className="text-lg font-bold">
                {`Statistik Akun`}
              </h3>

              <div className="grid grid-cols-2 gap-x-1 gap-y-3 mt-2">
                {[{
                  label: `Paket Saya`,
                  value: 4,
                  Icon: IoDocumentTextOutline,
                  background: 'yellowgreen',
                }, {
                  label: `Paket Tersedia`,
                  value: 41,
                  Icon: IoListOutline,
                  background: 'hotpink',
                }, {
                  label: `Progres Misi`,
                  value: (
                    <>
                      <span>{5}</span>
                      <span className="opacity-50">{` / 24 Tersedia`}</span>
                    </>
                  ),
                  Icon: IoFitness,
                  background: 'skyblue',
                }, {
                  label: `Level Saya`,
                  value: 4,
                  Icon: IoBulb,
                  background: 'purple',
                }].map((item) => (
                  <div key={item.label} className="col-span-1 flex gap-1">
                    <div
                      className="w-8 h-8 flex items-center justify-center rounded-full text-white"
                      style={{ backgroundColor: item.background }}
                    >
                      <item.Icon size={24} />
                    </div>

                    <div className="flex-1">
                      <h6 className="text-xs/tight font-semibold">{item.label}</h6>
                      <p className="text-sm/tight text-dark-900">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-bold mt-4">
                {`Fitur Premium`}
              </h3>

              <div className="mt-1 flex">
                <Link href={'/account/premium'} className="flex gap-1 items-center text-sm underline text-secondary hover:opacity-90">
                  <IoLockClosed />

                  <span>{`Upgrade Sekarang`}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
