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
    <div className={clsx(['grid grid-cols-4 gap-2', className])} {...props}>
      <div className="col-span-2 flex">
        <PolarRoleStatistic className="flex-1" statistic={{}} />
      </div>

      <div className="col-span-2 flex">
        <AvatarProfile className="px-4" />
      </div>
    </div>
  );
};

export default RoleStatistic;
