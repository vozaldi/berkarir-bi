import Button from "@/components/basics/buttons/Button";
import DashboardMenu from "@/components/pages/account/dashboard/DashboardMenu";
import { numeral } from "@/lib/utilities";
import clsx from "clsx";
import Image from "next/image";

export default function PremiumPage() {
  return (
    <section className="container px-4 mx-auto pt-6 pb-8 grid grid-cols-12 gap-6">
      <div className="sm:block hidden col-span-3">
        <DashboardMenu className="sticky top-24" />
      </div>

      <div className="lg:col-span-9 col-span-12">
        <div className="w-11/12 mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              {`Upgrade Premium`}
            </h1>

            <p className="mt-2 opacity-75">
              {`Pilih paket premium sesuai kebutuhanmu`}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-4">
            {[{
              label: `Free`,
              caption: "Buat kamu yang mau uji coba kemampuanmu cuma-cuma",
              features: ['tryout', 'avatar'],
              price: 0,
            }, {
              label: `Ksatria ASN`,
              caption: "Buat kamu para ksatria ASN",
              features: ['tryout', 'avatar_pro', 'latsol', 'ranking', 'analisa_pro', 'aktif_6bulan', 'evaluasi', 'garansi', 'video', 'live_zoom'],
              price: 200000,
              isMain: true,
            }, {
              label: `Pejuang ASN`,
              caption: "Buat kamu para pejuang ASN",
              features: ['tryout', 'avatar_pro', 'latsol', 'ranking', 'analisa_basic'],
              price: 20000,
            }].map((item, index) => {
              return (
                <div key={index} className="col-span-4">
                  <div className={clsx([
                    "min-h-full flex flex-col bg-card rounded-2xl p-2 hover:scale-105 transition-all duration-200",
                    !item.isMain && "shadow-sm hover:shadow-lg scale-100",
                    item.isMain && "shadow-md hover:shadow-xl scale-[102.5%] shadow-amber-500/40",
                  ])}>
                    <Image
                      src={'/assets/images/products/product-1.jpg'}
                      alt={`Gambar ${item.label}`}
                      className={clsx([
                        "w-full h-40 object-cover rounded-lg",
                      ])}
                      width={240}
                      height={160}
                    />

                    <div className="mt-4 px-2 flex-1">
                      <h3 className="text-lg font-bold">{item.label}</h3>
                      <p className="text-sm text-dark-900">{item.caption}</p>

                      <div className="article-content !text-sm text-dark-700 mt-4">
                        <p className="!mb-1">
                          <strong>{`Fitur`}</strong>
                        </p>
                        <ul className="!pb-0">
                          {item.features.map((feature, index) => (
                            <li key={index}>
                              {({
                                tryout: `Tryout`,
                                latsol: `Latihan Soal`,
                                avatar: `Avatar Ksatria`,
                                avatar_pro: `Leveling Ksatria`,
                                analisa_basic: `Analisa Soal Basic`,
                                analisa_pro: `Analisa Soal Pro`,
                                ranking: `Ranking Try Out Nasional`,
                                evaluasi: `Evaluasi Performa`,
                                garansi: `Garansi Lolos Tes SKD`,
                                video: `Video Rekaman Materi`,
                                live_zoom: `Live Zoom Class`,
                                aktif_6bulan: `Masa Aktif 6 Bulan`,
                              })[feature]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 pb-3 px-2 mt-auto">
                      <p className="text-lg font-bold text-center">
                        {!item.price ? "Gratis" : numeral(item.price).format('$0,0')}
                      </p>

                      {!item.price ? (
                        <Button
                          className="w-full mt-4 bg-dark-200 pointer-events-none"
                        >
                          {`Sudah Aktif`}
                        </Button>
                      ) : (
                        <Button
                          className={clsx([
                            "w-full mt-4",
                            item.isMain && "text-white bg-amber-500 hover:bg-amber-400",
                            !item.isMain && "text-amber-500 bg-amber-500/20 hover:bg-amber-500/30",
                          ])}
                        >
                          {`Beli Sekarang`}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
