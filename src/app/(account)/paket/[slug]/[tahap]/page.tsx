import DashboardMenu from "@/components/pages/account/dashboard/DashboardMenu";
import PaketDetail from "../../(client)/PaketDetail";
import PaketBreadcrumbs from "../../(client)/(navigations)/PaketBreadcrumbs";

export default async function PaketTahapPage() {
  return (
    <section className="container px-4 mx-auto pt-6 pb-8 grid grid-cols-12 gap-6">
      <div className="lg:col-span-3 col-span-12">
        <DashboardMenu className="sticky top-24" />
      </div>

      <div className="lg:col-span-9 col-span-12 flex flex-col gap-y-8">
        <PaketBreadcrumbs />

        <PaketDetail />
      </div>
    </section>
  );
};
