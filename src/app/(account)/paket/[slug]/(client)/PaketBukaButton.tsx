'use client';

import Button from "@/components/basics/buttons/Button";
import CATDisclaimerModal from "@/components/pages/account/cat/CATDisclaimerModal";
import { QuizModel } from "@/types/models";
import clsx from "clsx";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  quiz: QuizModel;
};

function PaketBukaButton({
  className,
  quiz,
  ...props
}: Props) {
  // States
  const [disclaimer, setDisclaimer] = useState(false);

  return (
    <>
      <div className={clsx(["button", className])} {...props}>
        <Button
          className="!rounded-full !px-4"
          color="primary"
          onClick={() => setDisclaimer(true)}
        >
          <span>{`Buka Paket`}</span>
          <IoArrowForward className="ml-2" />
        </Button>
      </div>
    
      <CATDisclaimerModal
        isVisible={disclaimer}
        onHide={() => setDisclaimer(false)}
        quiz={quiz}
        tahap={0}
      />
    </>
  );
};

export default PaketBukaButton;
