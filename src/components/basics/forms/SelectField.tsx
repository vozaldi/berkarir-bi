import clsx from "clsx";
import React, { useEffect } from "react";
import { TextFieldBaseProps } from "./TextField";

type InputAttribute = Omit<React.InputHTMLAttributes<HTMLSelectElement>, "className">;
type OptionProps = React.OptionHTMLAttributes<HTMLOptionElement> & {
  label: string;
};

type Props = InputAttribute & TextFieldBaseProps & {
  options?: Array<OptionProps>;
};

function SelectField({
  className,
  labelClassName,
  inputClassName,
  containerProps,
  label,
  left,
  right,
  InputComponent,
  error = false,
  options = [],
  ...props
}: Props) {
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
          <select
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
          >
            {!options.length ? props.children : options.map((item, index) => (
              <option
                key={index}
                {...item}
              >
                {item.label || item.children}
              </option>
            ))}
          </select>
        )}

        {!!left && (
          <div
            ref={leftRef}
            {...props.leftProps}
            className={clsx("input-group-float left-0", props.leftProps?.className)}
          >{left}</div>
        )}

        {!!right && (
          <div
            ref={rightRef}
            {...props.leftProps}
            className={clsx("input-group-float right-0", props.leftProps?.className)}
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
};

export type SelectFieldOption = OptionProps;
export type SelectFieldProps = Props;

export default SelectField;
