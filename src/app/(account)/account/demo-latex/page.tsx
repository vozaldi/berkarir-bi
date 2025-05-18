import DashboardMenu from "@/components/pages/account/dashboard/DashboardMenu";
import LatexEditor from "./(client)/LatexEditor";

export default function AccountDemoLatex() {
  return (
    <section className="container px-4 mx-auto pt-6 pb-8 grid grid-cols-12 gap-6">
      <div className="lg:col-span-3 col-span-12 xl:block hidden">
        <DashboardMenu className="sticky top-24" />
      </div>

      <div className="xl:col-span-9 col-span-12 flex flex-col gap-y-4">
        <LatexEditor />
      </div>
    </section>
  );
};
