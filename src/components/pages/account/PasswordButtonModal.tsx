'use client';

import Button, { ButtonProps } from "@/components/basics/buttons/Button";
import ChangePasswordForm from "@/components/forms/account/ChagePasswordForm";
import clsx from "clsx";
import { useState } from "react";
import { createPortal } from "react-dom";

type Props = ButtonProps & {};

function PasswordButtonModal({
  className,
  ...props
}: Props) {
  // States
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={clsx(["!rounded-lg", className])}
        color="primary"
        onClick={() => setIsOpen(true)}
        {...props}
      >
        {`Change Password`}
      </Button>

      {'undefined' !== typeof window && createPortal((
        <div className={clsx([
          "fixed inset-0 p-4 z-[700] flex items-center justify-center",
          !isOpen && "opacity-0 [visibility:hidden]",
        ])}>
          <div
            className={clsx([
              "absolute inset-0 bg-black/30",
              "transition-opacity duration-300 opacity-0",
              isOpen && "!opacity-100"
            ])}
            onClick={() => setIsOpen(false)}
          />

          <div className={clsx([
            "relative w-[560px] max-w-full bg-white/70 backdrop-blur-lg border border-white shadow-lg rounded-2xl py-8 px-8",
            "transition-all duration-300 opacity-0 translate-y-[10vh]",
            isOpen && "!translate-y-0 !opacity-100",
          ])}>
            <ChangePasswordForm onSubmitted={() => setIsOpen(false)} />
          </div>
        </div>
      ), document.body)}
    </>
  );
};

export default PasswordButtonModal;
