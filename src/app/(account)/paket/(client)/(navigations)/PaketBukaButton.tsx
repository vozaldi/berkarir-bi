'use client';

import Button from "@/components/basics/buttons/Button";
import { PaketModel } from "@/types/models";
import clsx from "clsx";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import PaketDisclaimerModal from "../PaketDisclaimerModal";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  paket: PaketModel;
};

function PaketBukaButton({
  className,
  paket,
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
    
      <PaketDisclaimerModal
        isVisible={disclaimer}
        onHide={() => setDisclaimer(false)}
        paket={paket}
      />
    </>
  );
};

export default PaketBukaButton;
