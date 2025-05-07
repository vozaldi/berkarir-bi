import clsx from "clsx";
import Link from "next/link";
import '@/styles/scss/button.scss';

type HTMLButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonBaseProps = 
  | ({ type: 'link' } & React.ComponentProps<typeof Link>)
  | ({ type?: HTMLButtonProps['type'] } & Partial<HTMLButtonProps>);

type Props = ButtonBaseProps & {
  color?: 'transparent' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
  outline?: Props['color'];
  size?: 'default' | 'sm' | 'xs' | number;
  border?: boolean;
  noPadding?: boolean;
  loading?: boolean;
};

function Button(props: Props) {
  // Props
  const {
    className = '',
    color = 'transparent', outline = 'transparent', size = 'default',
    border = false, loading = false, noPadding = false,
    ...rest
  } = props;

  // Vars
  const classNames = clsx([
    `btn font-bold`,
    className.indexOf('cursor-') <= 0 && 'cursor-pointer',
    color === 'primary' && 'bg-primary text-white hover:bg-primary/80',
    color === 'secondary' && 'bg-secondary text-white hover:bg-secondary/50',
    color === 'danger' && 'bg-red-500 text-white hover:bg-red-600',
    color === 'warning' && 'bg-yellow-500 text-white hover:bg-yellow-600',
    color === 'success' && 'bg-green-500 text-white hover:bg-green-600',
    outline === 'primary' && 'border border-primary text-primary hover:bg-primary/10',
    outline === 'secondary' && 'border border-secondary text-secondary hover:bg-secondary/10',
    outline === 'danger' && 'border border-red-500 text-red-500 hover:bg-red-500/10',
    outline === 'warning' && 'border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10',
    outline === 'success' && 'border border-green-500 text-green-500 hover:bg-green-500/10',
    ...(noPadding ? [] : [
      size === 'default' && 'py-2 px-4',
      size === 'sm' && 'py-1 px-2 text-sm',
      size === 'xs' && 'py-0.5 px-2 text-xs',
    ]),
    !!border && 'ring-2 ring-primary border-2 border-white',
    loading && 'relative pointer-events-none opacity-50',
  ]);

  return rest.type === 'link' ? (
    <Link
      {...rest}
      className={clsx([classNames, className])}
      {...('number' !== typeof size ? {} : {
        style: { width: size, height: size, ...rest.style },
      })}
    />
  ) : (
    <button
      type={rest.type || 'button'}
      {...rest}
      className={clsx([classNames, className])}
      {...('number' !== typeof size ? {} : {
        style: { width: size, height: size, ...rest.style },
      })}
    />
  );
};

export type ButtonProps = Props;

export default Button;
