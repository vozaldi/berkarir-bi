'use client';

import { useIsMounted } from "@/lib/hooks";
import clsx from "clsx";
import { AnimatePresence, motion, MotionProps } from "motion/react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import "@/styles/scss/app-modal.scss";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  isVisible?: boolean;
  onHide?: () => void;
  className?: HTMLDivElement['className'];
  ModalClassName?: HTMLDivElement['className'];
  OverlayClassName?: HTMLDivElement['className'];
};

function Modal({
  className,
  isVisible,
  onHide,
  ModalClassName,
  OverlayClassName,
  ...props
}: Props) {
  // Hooks
  const isMounted = useIsMounted();

  // Effects
  useEffect(() => {
    document.body.classList.remove("overflow-hidden", "overflow-auto");
    document.body.classList.add(isVisible ? "overflow-hidden" : "overflow-auto");

    return () => {
      document.body.classList.remove("overflow-hidden", "overflow-auto");
    };
  }, [isVisible]);

  return isMounted && createPortal((
    <AnimatePresence>
      <motion.div
        key={isVisible ? "open" : "close"}
        className={clsx(["app-modal", !isVisible && "hidden", ModalClassName])}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transitionDuration: '144ms' }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={clsx(["app-modal-overlay", OverlayClassName])}
          onClick={() => onHide?.()}
        />

        <div className={clsx(["app-modal-content", className])} {...props} />
      </motion.div>
    </AnimatePresence>
  ), document.body);
};

function ModalCard({
  className,
  ...props
}: MotionProps & { className?: HTMLDivElement['className'] }) {
  return (
    <motion.div
      className={clsx(["app-modal-card", className])}
      initial={{ translateY: 50, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      {...props}
    />
  );
};

Modal.ModalCard = ModalCard;

export type ModalProps = Props;

export default Modal;
