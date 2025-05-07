import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLDivElement> & {

};

function Error404({
  className,
  ...props
}: Props) {
  return (
    <div className={clsx(['container mx-auto flex flex-col items-center', className])} {...props}>
      <h1 className="text-xl font-bold">Error 404</h1>

      <p className="mt-4">{`Halaman yang kamu tuju tidak dapat ditemukan.`}</p>
    </div>
  );
};

export default Error404;
