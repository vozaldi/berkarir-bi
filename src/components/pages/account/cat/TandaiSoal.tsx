'use client';

import Button from "@/components/basics/buttons/Button";
import clsx from "clsx";
import Tooltip from "@/components/basics/Tooltip";
import { IoInformationCircleOutline } from "react-icons/io5";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  onChange?: () => void;
  isMarked?: boolean;
};

function TandaiSoal({
  className,
  onChange,
  isMarked,
  ...props
}: Props) {
  return (
    <div className={clsx(['flex flex-col items-end', className])} {...props}>
      <Tooltip
        className="flex items-center gap-x-1"
        TooltipComponent={(
          <p className="text-sm">
            {`Kamu dapat memberi tanda pada soal yang sulit.`}
          </p>
        )}
      >
        <p className="text-sm font-bold">{`Tandai Soal Ini`}</p>

        <IoInformationCircleOutline size={18} className="-my-4" />
      </Tooltip>

      <div className="flex items-center gap-2 mt-1">
        <Button
          type="button"
          className={clsx([
            "text-xs px-2 py-0.5 rounded-full",
            !isMarked && 'text-orange-500 bg-orange-500/20 hover:bg-orange-500/30',
            isMarked && "!text-white !bg-orange-500",
          ])}
          noPadding
          onClick={() => onChange?.()}
        >
          {isMarked ? `Soal Ditandai` : `Tandai Soal`}
        </Button>
      </div>
    </div>
  );
};

export default TandaiSoal;
