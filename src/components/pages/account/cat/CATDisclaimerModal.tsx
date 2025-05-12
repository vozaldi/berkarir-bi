'use client';

import Button from "@/components/basics/buttons/Button";
import Modal, { ModalProps } from "@/components/basics/Modal";
import { QuizModel } from "@/types/models";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

type Props = ModalProps & {
  quiz?: QuizModel | null;
};

function CATDisclaimerModal({
  quiz,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();

  // Handlers
  const handleSubmit = () => {
    const date = dayjs().add(90, 'minute').format('YYYY-MM-DD HH:mm:ss');

    if (quiz?.quiz_type?.key === 'practice') {
      return router.push(`/account/latihan-soal/${quiz?.id}?end=${date}`);
    }

    router.push(`/paket/${quiz?.id}/cat?end=${date}`);
  };

  return (
    <Modal {...props}>
      <Modal.ModalCard className="w-[640px]">
        <h3 className="text-xl font-bold text-center">
          {`PENTING!`}
          <br />{`Harap dibaca terlebih dahulu`}
        </h3>

        <div className="article-content text-left text-sm mt-4">
          <ol>
            {[
              `Pastikan kamu membuka website ini melalui browser (disarankan Chrome).`,
              `Ketika kamu memulai TO maka timer akan berjalan dan pengerjaan TO tidak bisa ditunda. Jadi siapkan waktu yang tepat untuk memulai TO`,
              `Ketika waktu habis secara otomatis jawaban kami akan terkirim.`,
              `Hasil TO bisa dilihat pada menu "Tryout"`,
              `Tryout hanya bisa dikerjakan pada device dan browser yang sama setiap 1x tryout`,
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>

        <div className="flex justify-center gap-x-4 mt-4">
          <Button
            className="text-primary border border-primary hover:bg-dark-500/10"
            onClick={() => props.onHide?.()}
          >{`Batal`}</Button>

          <Button
            className="min-w-[80px]"
            color="primary"
            onClick={handleSubmit}
          >{`Mulai Sekarang`}</Button>
        </div>
      </Modal.ModalCard>
    </Modal>
  );
};

export default CATDisclaimerModal;
