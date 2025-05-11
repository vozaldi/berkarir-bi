import clsx from "clsx";
import AvatarProfile from "../avatar/AvatarProfile";
import PolarRoleStatistic from "@/components/charts/dashboard/PolarRoleStatistic";
import PolarTahap1Statistic from "@/components/charts/dashboard/PolarTahap1Statistic";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

function RoleStatistic({
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(['flex flex-col gap-2', className])} {...props}>
      <div className="h-[176px] flex">
        <PolarTahap1Statistic className="flex-1" statistic={{}} />
      </div>

      <div className="h-[176px] flex">
        <PolarRoleStatistic className="flex-1" statistic={{}} />
      </div>

      <div className="h-[176px] flex mt-4">
        <AvatarProfile className="px-4" />
      </div>
    </div>
  );
};

export default RoleStatistic;
