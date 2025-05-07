'use client';

import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  color?: 'transparent' | 'primary' | 'secondary' | 'info' | 'danger' | 'warning' | 'success';
  outline?: Props['color'];
  size?: 'default' | 'sm' | 'xs' | number;
  border?: boolean;
  noPadding?: boolean;
  loading?: boolean;
};

function Badge(props: Props) {
  // Props
  const {
    className,
    color = 'transparent', outline = 'transparent', size = 'default',
    border = false, loading = false, noPadding = false,
    ...rest
  } = props;
  
  // Vars
  const classNames = clsx([
    `badge cursor-default`,
    color === 'primary' && 'bg-primary text-white',
    color === 'secondary' && 'bg-secondary text-white',
    color === 'danger' && 'bg-red-500 text-white',
    color === 'warning' && 'bg-yellow-500 text-white',
    color === 'success' && 'bg-green-500 text-white',
    color === 'info' && 'bg-blue-500 text-white',
    outline === 'primary' && 'border border-primary text-primary',
    outline === 'secondary' && 'border border-secondary text-secondary',
    outline === 'danger' && 'border border-red-500 text-red-500',
    outline === 'warning' && 'border border-yellow-500 text-yellow-500',
    outline === 'success' && 'border border-green-500 text-green-500',
    ...(noPadding ? [] : [
      size === 'default' && 'py-1 px-3',
      size === 'sm' && 'py-1 px-2 text-sm',
      size === 'xs' && 'py-0.5 px-1 text-xs',
    ]),
    !!border && 'ring-2 ring-primary border-2 border-white',
    loading && 'relative pointer-events-none opacity-50',
  ]);

  return (
    <div className={clsx([classNames, className])} {...rest} />
  );
};

export default Badge;
