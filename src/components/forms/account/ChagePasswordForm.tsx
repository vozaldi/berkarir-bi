'use client';

import Button from "@/components/basics/buttons/Button";
import TextField from "@/components/basics/forms/TextField";
import { useFields } from "@/lib/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  onSubmitted?: () => void;
};

function ChangePasswordForm({
  className,
  onSubmitted,
  ...props
}: Props) {
  // Hooks
  const input = useFields({
    password_old: '',
    password: '',
    password_confirm: '',
  });

  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Effects
  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        setIsFinished(false);

        onSubmitted?.();
      }, 2000);
    }
  }, [isFinished, onSubmitted]);

  // Vars
  const handleSubmit = () => {
    if (!input.fields.password_old) {
      return input.handleErrorShow('password_old', `Please enter your password`);
    } else if (!input.fields.password) {
      return input.handleErrorShow('password', `Please enter your new password`);
    } else if (!input.fields.password_confirm) {
      return input.handleErrorShow('password_confirm', `Please confirm your new password`);
    }

    console.log("Inputs", input.fields);

    setIsSaving(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, 500);
    }).then(() => {
      setIsFinished(true);
    }).finally(() => {
      setIsSaving(false);
    });
  };

  return isFinished ? (
    <div className={clsx([className])}>
      <h3 className="text-lg font-bold text-center">
        {`Password successfully updated`}
      </h3>
    </div>
  ) : (
    <form
      className={clsx([className])}
      onSubmit={(e) => {
        e.preventDefault();

        handleSubmit();
      }}
      autoComplete="off"
      {...props}
    >
      <h3 className="text-xl text-center">
        {`Change Password`}
      </h3>

      <div className="mt-4">
        <TextField
          type="password"
          label={`Current Password`}
          placeholder={`Current Password`}
          value={input.fields.password_old}
          onChange={(e) => input.handleFieldChange('password_old', e.target.value)}
          error={input.isFieldError('password_old')}
          message={input.error.message}
        />
      </div>

      <div className="pt-2 flex flex-wrap -mx-2 -my-1">
        {[{
          label: `New Password`,
          field: 'password' as keyof typeof input.fields,
          type: 'password',
        }, {
          label: `Password Confirmation`,
          field: 'password_confirm' as keyof typeof input.fields,
          type: 'password',
        }].map((item) => {
          return (
            <div key={item.field} className="basis-1/2 px-2 py-1">
              <TextField
                className="w-full"
                label={item.label}
                placeholder={item.label}
                type={item.type}
                value={input.fields[item.field]}
                onChange={(e) => input.handleFieldChange(item.field, e.target.value)}
                error={input.isFieldError(item.field)}
                message={input.error.message}
              />
            </div>
          );
        })}
      </div>

      <Button
        type="submit"
        className="w-full mt-4 !rounded-lg"
        color="secondary"
        loading={isSaving}
      >
        {`Change Password`}
      </Button>
    </form>
  );
};

export default ChangePasswordForm;
