'use client';

import AppLogo from "@/components/basics/AppLogo";
import Button from "@/components/basics/buttons/Button";
import CheckboxField from "@/components/basics/forms/CheckboxtField";
import TextField from "@/components/basics/forms/TextField";
import { useFields } from "@/lib/hooks";
import httpService from "@/lib/utilities/httpService";
import { useUserState } from "@/states/userState";
import { UserModel } from "@/types/models";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline, IoKeyOutline, IoMailOutline } from "react-icons/io5";
import { isEmail } from "validator";

type Props = React.HTMLAttributes<HTMLFormElement> & {
  onRegisterClick?: () => void;
};

function LoginForm({
  className,
  onRegisterClick,
  ...props
}: Props) {
  // Hooks
  const router = useRouter();

  const input = useFields({
    username: '',
    email: '',
    password: '',
    remember: 0,
  });

  // States
  const [isSaving, setIsSaving] = useState(false);
  const [options, setOptions] = useState({
    showPassword: false,
  });
  const [{ isFinished, user }, setDetail] = useState({
    user: null as UserModel | null,
    isFinished: false,
  });

  // Effects
  useEffect(() => {
    if (isFinished) {
      setTimeout(() => {
        router.push('/account');
      }, 1000);
    }
  }, [isFinished, router]);

  // Vars
  const handleSubmit = async () => {
    if (!input.fields.email) {
      return input.handleErrorShow('email', `Alamat email harus diisi`);
    } else if (!isEmail(input.fields.email)) {
      return input.handleErrorShow('email', `Mohon masukkan email yang valid`);
    } else if (!input.fields.password) {
      return input.handleErrorShow('password', `Mohon masukkan password`);
    }

    setIsSaving(true);

    return httpService.self('/auth/login', {
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
        {`Berhasil Login`}
      </h3>

      <p className="mt-4 md:text-lg text-center">
        {`Selamat Datang`}
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
      {...props}
    >
      <AppLogo
        className="mx-auto"
        width={200}
        height={56}
      />

      <h1 className="text-2xl font-bold text-center mt-4">
        {`Login Akun`}
      </h1>

      <p className="mt-1 text-center text-dark-900">
        {`Belum memiliki akun?`}
        {' '}
        <Link
          href={'/auth/register'}
          className="text-primary hover:underline"
          onClick={(e) => {
            if (onRegisterClick) {
              e.preventDefault();

              return onRegisterClick();
            }
          }}
        >{`Mendaftar`}</Link>
      </p>

      <div className="mt-2">
        {[{
          label: `Email`,
          field: 'email' as keyof typeof input.fields,
          type: 'email',
          Icon: IoMailOutline,
        }, {
          label: `Password`,
          field: 'password' as keyof typeof input.fields,
          type: options.showPassword ? 'text' : 'password',
          Icon: IoKeyOutline,
          eye: true,
        }].map((item, index) => {
          return (
            <TextField
              key={item.field}
              className={!index ? '' : "mt-2"}
              label={item.label}
              placeholder={item.label}
              type={item.type}
              value={input.fields[item.field]}
              onChange={(e) => input.handleFieldChange(item.field, e.target.value)}
              error={input.isFieldError(item.field)}
              message={input.error.message}
              left={(
                <div className={clsx(["!pointer-events-none pl-4 pr-2", input.isFieldError(item.field) && 'text-red-500'])}>
                  <item.Icon size={20} />
                </div>
              )}
              right={item.eye && (
                <Button
                  className="mr-2 text-dark-700"
                  type="button"
                  size={32}
                  onClick={() => {
                    setOptions(state => ({ ...state, showPassword: !state.showPassword }));
                  }}
                >
                  {options.showPassword ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </Button>
              )}
            />
          );
        })}
      </div>

      <div className="flex items-center mt-2">
        <CheckboxField
          label={`Ingat saya`}
          name="remember"
          checked={!!input.fields.remember}
          onCheckedChange={(checked) => input.handleFieldChange('remember', checked ? 1 : 0)}
        />
      </div>

      {input.isFieldError() && (
        <p className="mt-2 text-sm text-red-500">
          {input.error.message}
        </p>
      )}

      <Button
        type="submit"
        className="w-full mt-4 !rounded-lg"
        color="primary"
        loading={isSaving}
      >
        {`Login`}
      </Button>

      <p className="mt-6 text-center text-dark-900">
        <Link
          href={'/auth/forgot-password'}
          className="text-primary hover:underline"
        >{`Lupa Password`}</Link>
      </p>
    </form>
  );
};

export default LoginForm;
