import clsx from "clsx";
import AvatarProfile from "../avatar/AvatarProfile";
import PolarRoleStatistic from "@/components/charts/dashboard/PolarRoleStatistic";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

function RoleStatistic({
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(['flex flex-col gap-4', className])} {...props}>
      <div className="h-[176px] flex">
        <PolarRoleStatistic className="flex-1" statistic={{}} />
      </div>

      <div className="h-[176px] flex">
        <AvatarProfile className="px-4" />
      </div>
    </div>
  );
};

export default RoleStatistic;
