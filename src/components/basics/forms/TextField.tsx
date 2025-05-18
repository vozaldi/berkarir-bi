'use client';

import clsx from "clsx";
import React, { forwardRef, JSX, useEffect } from "react";

type InputAttribute = Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;
type BaseProps = {
  label?: string;
  className?: React.HTMLAttributes<HTMLDivElement>["className"];
  containerProps?: Omit<React.HTMLAttributes<HTMLDivElement>, "className">;
  labelClassName?: React.HTMLAttributes<HTMLLabelElement>["className"];
  inputClassName?: React.HTMLAttributes<HTMLInputElement>["className"];
  InputComponent?: JSX.Element;
  left?: React.ReactNode;
  leftProps?: React.HTMLAttributes<HTMLDivElement>;
  right?: React.ReactNode;
  rightProps?: React.HTMLAttributes<HTMLDivElement>;
  error?: boolean;
  message?: string;
  caption?: React.ReactNode;
};

type Props = InputAttribute & BaseProps;

const TextField = forwardRef<HTMLInputElement, Props>(({
  className,
  labelClassName,
  inputClassName,
  containerProps,
  label,
  left,
  right,
  InputComponent,
  error = false,
  ...props
}: Props, ref) => {
  // Hooks
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  // States
  const [paddingLeft, setPaddingLeft] = React.useState<number | null>(null);
  const [paddingRight, setPaddingRight] = React.useState<number | null>(null);

  // Effects
  useEffect(() => {
    if (leftRef.current) {
      setPaddingLeft(leftRef.current.clientWidth);
    }

    if (rightRef.current) {
      setPaddingRight(rightRef.current.clientWidth);
    }
  }, [leftRef, rightRef]);

  return (
    <div className={clsx("form-group", className)} {...containerProps}>
      {!!label && (
        <label
          className={clsx("form-label text-sm mb-0.5", labelClassName)}
          {...(!props.id ? null : { htmlFor: props.id })}
        >
          {label}
        </label>
      )}

      <div className={clsx("input-text-group", error && "is-invalid")}>
        {!!InputComponent ? InputComponent : (
          <input
            ref={ref}
            className={clsx("form-control py-2 px-4 border-2 border-primary/50 rounded-lg focus:border-primary outline-none", error && "is-invalid", inputClassName)}
            style={{
              ...(paddingLeft === null ? {} : { paddingLeft }),
              ...(paddingRight === null ? {} : {
                paddingRight,
                ...(!error ? {} : {
                  backgroundPosition: `calc(100% - ${paddingRight}px - 1rem) center`,
                }),
              }),
            }}
            {...props}
          />
        )}

        {!!left && (
          <div
            ref={leftRef}
            {...props.leftProps}
            className={clsx("input-group-float left-0", props.leftProps?.className, !paddingLeft && "opacity-0")}
          >{left}</div>
        )}

        {!!right && (
          <div
            ref={rightRef}
            {...props.leftProps}
            className={clsx("input-group-float right-0", props.leftProps?.className, !paddingRight && "opacity-0")}
          >{right}</div>
        )}
      </div>

      {!!error && (
        <div className="invalid-feedback text-red-500 text-sm mt-0.5">{props.message}</div>
      )}

      {!!props.caption && (
        <div className="text-muted text-sm mt-0.5">{props.caption}</div>
      )}
    </div>
  );
});

export type TextFieldBaseProps = BaseProps;
export type TextFieldProps = Props;

export default TextField;
