'use client';

import BoxLoading from "@/components/basics/BoxLoading";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

export default function Tahap1NavigationLoading({
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(["bg-card rounded-lg shadow-lg pt-4 pb-8 px-6", className])} {...props}>
      <div className="flex flex-col items-center text-center">
        <BoxLoading width={[80, 100]} height={"1.25em"} className="text-sm" />
        <BoxLoading width={[140, 180]} height={"1.25em"} className="text-2xl mt-1" />
        <BoxLoading width={[120, 140]} height={"1.25em"} className="text-base mt-4" />
        <BoxLoading width={[200, 240]} height={"1.25em"} className="text-base mt-1" />
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="col-span-4">
            <BoxLoading width={'100%'} height={360} rounded={16} />
          </div>
        ))}
      </div>
    </div>
  );
};