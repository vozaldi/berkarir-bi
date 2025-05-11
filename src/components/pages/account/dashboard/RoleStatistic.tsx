'use client';

import clsx from "clsx";
import AvatarProfile from "../avatar/AvatarProfile";
import PolarTahap2Statistic from "@/components/charts/dashboard/PolarTahap2Statistic";
import PolarTahap1Statistic from "@/components/charts/dashboard/PolarTahap1Statistic";
import { useState } from "react";
import Tabs from "@/components/basics/Tabs";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

function RoleStatistic({
  className,
  ...props
}: Props) {
  // States
  const tabs = ['tahap-1', 'tahap-2'];
  const [tabActive, setTabActive] = useState(tabs[0]);

  return (
    <div className={clsx(['flex flex-col gap-2', className])} {...props}>
      <h3 className="text-lg font-bold text-center">{`Performa Ksatria`}</h3>

      <Tabs
        className="rounded-xl mx-2 bg-background"
        tabsClassName="!p-1 bg-primary/20 rounded-lg"
        tabItemClassName={(_, index) => clsx([
          "basis-1/3 rounded-lg !py-1",
          tabs.indexOf(tabActive) === index && "!text-white hover:bg-white/10",
          tabs.indexOf(tabActive) !== index && "!text-primary hover:bg-primary/10",
        ])}
        indicatorClassName="!bg-primary !h-[1.75rem]"
        initialTab={"tahap-1"}
        onValueChange={(value) => setTabActive(value)}
        tabs={[{
          tab: tabs[0],
          label: (
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{`Tahap 1`}</span>
            </div>
          ),
          props: {
            style: { flexBasis: `50%` },
          },
        }, {
          tab: tabs[1],
          label: (
            <div className="flex items-center gap-2">
              <span className="font-semibold">{`Tahap 2`}</span>
            </div>
          ),
          props: {
            style: { flexBasis: `50%` },
          },
        }]}
      />

      <div className="relative h-[176px]">
        <div className={clsx(["absolute inset-0 flex transition-opacity ease-in-out duration-300", tabActive !== 'tahap-1' && 'opacity-0 pointer-events-none'])}>
          <PolarTahap1Statistic className="flex-1" statistic={{}} />
        </div>

        <div className={clsx(["absolute inset-0 flex transition-opacity ease-in-out duration-300", tabActive !== 'tahap-2' && 'opacity-0 pointer-events-none'])}>
          <PolarTahap2Statistic className="flex-1" statistic={{}} />
        </div>
      </div>

      <div className="h-[176px] flex mt-4">
        <AvatarProfile className="px-4" />
      </div>
    </div>
  );
};

export default RoleStatistic;
