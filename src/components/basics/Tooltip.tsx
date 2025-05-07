import { Popover } from "@base-ui-components/react/popover";
import styles from "@/styles/css/tooltip.module.css";
import { IoTriangle } from "react-icons/io5";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  TooltipComponent?: React.ReactNode;
  tooltipClassName?: HTMLDivElement['className'];
  arrowClassName?: HTMLDivElement['className'];
  PopoverProps?: Partial<React.ComponentProps<typeof Popover.Root>>;
};

function Tooltip({
  className,
  children,
  TooltipComponent,
  tooltipClassName,
  arrowClassName,
  PopoverProps,
}: Props) {
  return (
    <Popover.Root openOnHover delay={0} {...PopoverProps}>
      <Popover.Trigger className={clsx([className])}>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="top" sideOffset={8}>
          <Popover.Popup className={clsx([styles.Popup, tooltipClassName])}>
            <Popover.Arrow className={clsx([styles.Arrow, arrowClassName])}>
              <IoTriangle />
            </Popover.Arrow>

            {TooltipComponent}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Tooltip;
