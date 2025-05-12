import { httpServer } from "@/server/httpServer";
import { QuizModel } from "@/types/models";
import clsx from "clsx";
import dayjs from "dayjs";
import { IoCalendarOutline } from "react-icons/io5";
import Tahap1Subtest from "../(client)/Tahap1Subtest";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  slug: string;
};

export default async function ServerTahap1Navigation({
  className,
  slug,
  ...props
}: Props) {
  const quiz = await httpServer(`/v1/quizzes/${slug}`)
    .then((data): QuizModel => {
      if (data.data) {
        return data.data;
      }

      throw data;
    }).catch((err) => null);

  return !quiz ? (
    <div className={clsx([className])} {...props}>
      <div className="text-center">
        <h3 className="text-2xl font-bold">{`Error 404`}</h3>
        <p className="mt-4">{`Paket tidak ditemukan`}</p>
      </div>
    </div>
  ) : (
    <div className={clsx(["bg-card rounded-lg shadow-lg pt-4 pb-8 px-6", className])} {...props}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-sm font-bold opacity-75">
          {`Tahap 1`}
        </h1>

        <h3 className="text-2xl font-bold px-3 pb-4 border-b border-dark-300">
          {`Kognitif Test`}
        </h3>

        <p className="mt-4">
          <strong>{`Waktu Pengerjaan`}</strong>
        </p>

        <div className="flex gap-2 items-center">
          <IoCalendarOutline className="text-primary-dark" />

          <span>{dayjs().format('dddd, D MMM YYYY')}</span>
        </div>
      </div>

      <Tahap1Subtest className="mt-6" quiz={quiz} />
    </div>
  );
};
