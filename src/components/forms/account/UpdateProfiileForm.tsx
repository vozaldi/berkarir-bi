'use client';

import Button from "@/components/basics/buttons/Button";
import TextField from "@/components/basics/forms/TextField";
import { useFields } from "@/lib/hooks";
import clsx from "clsx";
import { useEffect, useState } from "react";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  onSubmitted?: () => void;
};

function UpdateProfileForm({
  className,
  onSubmitted,
  ...props
}: Props) {
  // Hooks
  const input = useFields({
    name: 'Delta Gamma',
    phone: '08123456789',
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
    if (!input.fields.name) {
      return input.handleErrorShow('name', `Please enter your name`);
    } else if (!input.fields.phone) {
      return input.handleErrorShow('phone', `Please enter your phone number`);
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
        {`Profile successfully updated`}
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
        {`Update Profile`}
      </h3>

      <div className="mt-4">
        {[{
          label: `Name`,
          field: 'name' as keyof typeof input.fields,
        }, {
          label: `Phone`,
          field: 'phone' as keyof typeof input.fields,
        }].map((item, index) => {
          return (
            <TextField
              key={item.field}
              className={!index ? '' : "mt-2"}
              label={item.label}
              placeholder={item.label}
              value={input.fields[item.field]}
              onChange={(e) => input.handleFieldChange(item.field, e.target.value)}
              error={input.isFieldError(item.field)}
              message={input.error.message}
            />
          );
        })}
      </div>

      <Button
        type="submit"
        className="w-full mt-4 !rounded-lg"
        color="secondary"
        loading={isSaving}
      >
        {`Update Profile`}
      </Button>
    </form>
  );
};

export default UpdateProfileForm;
