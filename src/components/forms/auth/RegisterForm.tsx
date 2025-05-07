'use client';

import AppLogo from "@/components/basics/AppLogo";
import Button from "@/components/basics/buttons/Button";
import TextField from "@/components/basics/forms/TextField";
import { useFields } from "@/lib/hooks";
import { httpService } from "@/lib/utilities";
import { useUserState } from "@/states/userState";
import { UserModel } from "@/types/models";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { isNumeric } from "validator";
import isEmail from "validator/lib/isEmail";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  onLoginClick?: () => void;
};

function RegisterForm({
  className,
  onLoginClick,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();

  const input = useFields({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirm: '',
  });

  // States
  const [isSaving, setIsSaving] = useState(false);
    const [{ isFinished, user }, setDetail] = useState({
      user: null as UserModel | null,
      isFinished: false,
    });

  // Effects
  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        router.push('/account', {
          
        });
      }, 1000);
    }
  }, [isFinished, router]);

  // Vars
  const handleSubmit = () => {
    if (!input.fields.name) {
      return input.handleErrorShow('name', `Mohon masukkan nama kamu`);
    } else if (!input.fields.email) {
      return input.handleErrorShow('email', `Mohon masukkan email kamu`);
    } else if (!isEmail(input.fields.email)) {
      return input.handleErrorShow('email', `Masukkan email yang valid`);
    } else if (!input.fields.phone) {
      return input.handleErrorShow('phone', `Mohon masukkan No. Telp/WhatsApp kamu`);
    } else if (!isNumeric(input.fields.phone, { no_symbols: true })) {
      return input.handleErrorShow('phone', `Masukkan No. Telp/WhatsApp yang valid`);
    } else if (!input.fields.password) {
      return input.handleErrorShow('password', `Masukkan password kamu`);
    } else if (!input.fields.password_confirm) {
      return input.handleErrorShow('password', `Mohon konfirmasi password kamu`);
    } else if (input.fields.password !== input.fields.password_confirm) {
      return input.handleErrorShow('password', `Kedua password harus sama`);
    }

    setIsSaving(true);

    return httpService.self('/auth/register', {
      method: 'POST',
      data: input.fields,
    }).then((data) => {
      if (data?.data) {
        const user = data.data;

        useUserState.getState().setUser(user);

        return setDetail(state => ({ ...state, isFinished: true, user }));
      }

      throw data;
    }).catch((err) => {
      const message = err?.message || err?.data?.message || `Unexpected error.`;

      return input.handleErrorShow([], message);
    }).finally(() => {
      setIsSaving(false);
    });
  };

  return isFinished ? (
    <div className={clsx(['py-2', className])}>
      <h3 className="text-xl font-bold uppercase text-center">
        {`Successfully logged in`}
      </h3>

      <p className="mt-4 md:text-lg text-center">
        {`Welcome back`}
        {' '}<strong>{`"${user?.name || "User"}"`}</strong>
      </p>
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
      <AppLogo
        className="mx-auto"
        width={200}
        height={56}
      />

      <h1 className="text-2xl font-bold text-center mt-4">
        {`Mendaftar Akun`}
      </h1>

      <p className="mt-1 text-center text-dark-900">
        {`Sudah memiliki akun?`}
        {' '}
        <Link
          href={'/auth/login'}
          className="text-primary hover:underline"
          onClick={(e) => {
            if (onLoginClick) {
              e.preventDefault();

              return onLoginClick();
            }
          }}
        >{`Login`}</Link>
      </p>

      <div className="mt-4">
        {[{
          label: `Nama Lengkap`,
          field: 'name' as keyof typeof input.fields,
        }, {
          label: `Email`,
          field: 'email' as keyof typeof input.fields,
          type: 'email',
        }, {
          label: `No. Telepon/WhatsApp`,
          field: 'phone' as keyof typeof input.fields,
          type: 'tel',
          left: (
            <div className="pl-4 pr-1 !pointer-events-none">
              <span>+62</span>
            </div>
          ),
        }].map((item, index) => {
          return (
            <TextField
              key={item.field}
              className={!index ? '' : "mt-2"}
              label={item.label}
              placeholder={item.label}
              type={item.type || 'text'}
              value={input.fields[item.field]}
              onChange={(e) => input.handleFieldChange(item.field, e.target.value)}
              left={item.left}
              error={input.isFieldError(item.field)}
              message={input.error.message}
            />
          );
        })}
      </div>

      <div className="pt-2 flex flex-wrap -mx-2 -my-1">
        {[{
          label: `Password`,
          field: 'password' as keyof typeof input.fields,
          type: 'password',
        }, {
          label: `Konfirmasi Password`,
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

      {input.isFieldError() && (
        <p className="text-sm text-red-500 mt-2">{input.error.message}</p>
      )}

      <Button
        type="submit"
        className="w-full mt-4 !rounded-lg"
        color="primary"
        loading={isSaving}
      >
        {`Register`}
      </Button>
    </form>
  );
};

export default RegisterForm;
