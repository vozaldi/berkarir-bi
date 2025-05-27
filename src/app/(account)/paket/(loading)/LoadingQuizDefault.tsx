'use client';

import BoxLoading from "@/components/basics/BoxLoading";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

export default function LoadingQuizDefault({
  className,
  ...props
}: Props) {
  return (
    <section
      className={clsx([
        "container px-4 mx-auto pt-6 pb-8 flex-1 min-h-[90vh] flex flex-col gap-6",
        className,
      ])}
      {...props}
    >
      <div className="flex-1 grid xl:grid-cols-10 2xl:grid-cols-12 grid-cols-12 xl:gap-6 gap-4">
        <div className="2xl:col-span-9 xl:col-span-7 lg:col-span-8 col-span-12 flex flex-col">
          <div className="bg-card rounded-xl shadow-md p-4">
            <div className="flex lg:flex-row flex-col gap-x-4">
              <div className="flex-1">
                <BoxLoading width={[180, 240]} asText className="text-xl" />
                <BoxLoading width={[80, 120]} asText className="text-xs mt-1" />
                <BoxLoading width={[120, 140]} height={"1.5rem"} rounded={8} className="text-base mt-2" />
              </div>

              <div className="self-end flex flex-col items-end">
                <BoxLoading width={[80, 100]} asText className="text-xs" />
                <BoxLoading width={[120, 140]} asText className="text-xs mt-1" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-card rounded-xl shadow-md p-4 mt-4 xl:mt-6">
            <div className="flex gap-2">
              <BoxLoading width={[160, 240]} asText className="text-2xl" />
            </div>

            <hr className="mt-4 border-dark-300" />

            <div className="mt-4 gap-6">
              <BoxLoading width="100%" asText className="text-lg" />
              <BoxLoading width="100%" asText className="text-lg mt-1" />
              <BoxLoading width={[200, 280]} asText className="text-lg mt-1" />
            </div>
          </div>
        </div>

        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 col-span-12 lg:flex flex-col gap-4 xl:gap-6 hidden">
          <div className="bg-card rounded-xl shadow-md p-4">
            <BoxLoading width="100%" height="4.75rem" rounded={8} />
          </div>

          <div className="flex flex-col bg-card rounded-xl shadow-md p-4">
            <BoxLoading width={[120, 160]} asText className="text-lg" />

            <div className="flex gap-2 mt-1">
              {[1, 2, 3].map((item) => (
                <BoxLoading key={item} width={[80, 100]} height={"1.5rem"} rounded={12} />
              ))}
            </div>

            <div className="max-h-[50vh] mt-2 grid grid-cols-5 gap-2">
              {Array.from(Array(23)).map((_, index) => (
                <div key={index} className="col-span-1 aspect-square">
                  <BoxLoading width="100%" height="100%" rounded={8} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
