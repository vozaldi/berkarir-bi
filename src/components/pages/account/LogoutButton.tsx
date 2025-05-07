'use client';

import Button, { ButtonProps } from "@/components/basics/buttons/Button";
import Modal from "@/components/basics/Modal";
import ToastMessage from "@/components/basics/ToastMessage";
import { httpService } from "@/lib/utilities";
import { useUserState } from "@/states/userState";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = ButtonProps & {

};

function LogoutButton({
  className,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();

  // States
  const [isSaving, setIsSaving] = useState(false);
  const [options, setOptions] = useState({
    logoutModalOpen: false,
  });

  // Handlers
  const handleLogout = (force = false) => {
    if (!force) {
      return setOptions({ logoutModalOpen: true });
    }

    setIsSaving(true);

    return httpService.self('/auth/logout', {
      method: 'POST',
    }).then(() => {
      useUserState.getState().setUser(null);

      return router.push('/');
    }).catch((err) => {
      const message = err?.message || err?.data?.message || `Unexpected error.`;

      return ToastMessage.toast(message, { type: 'error' });
    }).finally(() => {
      setIsSaving(false);
    });
  };

  return (
    <>
      <Button
        className={clsx(['text-red-500 hover:bg-red-500/10', className])}
        onClick={() => handleLogout()}
        {...props}
      >
        {`Logout`}
      </Button>

      <Modal
        isVisible={options.logoutModalOpen}
        onHide={() => setOptions({ logoutModalOpen: false })}
      >
        <Modal.ModalCard
          className="w-[400px] text-center"
        >
          <h3 className="text-xl font-bold">Logout Akun</h3>

          <p className="mt-2">{`Apakah kamu yakin logout?`}</p>

          <div className="mt-6 flex justify-center gap-x-4">
            <Button
              outline="primary"
              onClick={() => setOptions({ logoutModalOpen: false })}
            >
              {`Batal`}
            </Button>

            <Button
              color="danger"
              loading={isSaving}
              onClick={() => handleLogout(true)}
            >
              {`Logout`}
            </Button>
          </div>
        </Modal.ModalCard>
      </Modal>
    </>
  );
}

export default LogoutButton;
