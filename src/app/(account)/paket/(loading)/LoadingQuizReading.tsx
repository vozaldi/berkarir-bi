'use client';

import BoxLoading from "@/components/basics/BoxLoading";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

export default function LoadingQuizReading({
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
      <div className="grid xl:grid-cols-10 2xl:grid-cols-12 grid-cols-12 xl:gap-6 gap-4">
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
        </div>

        <div className="2xl:col-span-3 xl:col-span-3 lg:col-span-4 col-span-12 lg:flex flex-col gap-4 xl:gap-6 hidden">
          <div className="bg-card rounded-xl shadow-md p-4">
            <BoxLoading width="100%" height="4.75rem" rounded={8} />
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-6 bg-card rounded-xl shadow-md p-4">
        <div className="col-span-7">
          <div className="text-lg border-dark-300 bg-dark-100 dark:bg-dark-300/50 rounded-xl p-4 inset-shadow-sm inset-shadow-black/25">
            <BoxLoading width={[200, 280]} asText className="text-xl" />

            {[1, 2, 3].map((item) => (
              <div key={item} className="mt-4">
                <BoxLoading width={["99%", "100%"]} asText className="text-lg mt-4" />
                <BoxLoading width={["92%", "100%"]} asText className="text-lg mt-1" />
                <BoxLoading width={["96%", "100%"]} asText className="text-lg mt-1" />
                <BoxLoading width={["50%", "60%"]} asText className="text-lg mt-1" />
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 flex flex-col gap-4">
          {[1, 2].map((item) => (
            <div key={item} className="rounded-2xl border border-dark-300 dark:bg-black/10 p-4">
              <BoxLoading width={[160, 240]} asText className="text-lg" />

              <div className="mt-4">
                <BoxLoading width="100%" asText className="text-lg" />
                <BoxLoading width="100%" asText className="text-lg mt-1" />
                <BoxLoading width={[200, 280]} asText className="text-lg mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
