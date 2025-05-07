'use client';

import clsx from "clsx";
import Dropdown from "../Dropdown";
import { IoCheckmarkSharp, IoText } from "react-icons/io5";
import Button from "./Button";
import { useUiShallow, useUiState } from "@/states/uiState";
import { useEffect, useState } from "react";
import '@/styles/scss/preference-dropdown.css';
import TextField from "../forms/TextField";
import { useFields } from "@/lib/hooks";

type Props = React.HtmlHTMLAttributes<HTMLDivElement> & {
  // 
};

function PreferenceDropdown({
  className,
  ...props
}: Props) {
  // Hooks
  const typography = useUiShallow((state) => state.typography);

  const input = useFields({
    color: '',
  });

  // States
  const [primaryColor, setPrimaryColor] = useState('primary-bi');
  
  // Effects
  useEffect(() => {
    const removeClasses = Array.from(document.documentElement.classList).reduce((a, b) => {
      if (b.indexOf('primary-') === 0) {
        return [...a, b];
      }

      return a;
    }, [] as string[]);

    document.documentElement.classList.remove(...removeClasses);
    document.documentElement.classList.add(primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    const removeClasses = Array.from(document.documentElement.classList).reduce((a, b) => {
      if (b.indexOf('typography-') === 0) {
        return [...a, b];
      }

      return a;
    }, [] as string[]);

    document.documentElement.classList.remove(...removeClasses);
    document.documentElement.classList.add(`typography-${typography.size}`);
  }, [typography.size]);

  // Handlers
  const handleCustomColor = (custom?: string | null) => {
    const color = custom?.replace('#', '');

    if (color) {
      const style = document.createElement('style');
  
      style.textContent = `.primary-${color}:root { --app-primary: #${color}; }`;

      document.head.appendChild(style);
    }

    setPrimaryColor(!custom ? 'primary-blue' : `primary-${color}`);
  };

  return (
    <div className={clsx([className])} {...props}>
      <Dropdown
        label={(
          <IoText size={18} />
        )}
        className={(state) => clsx([
          !state.open && "bg-card hover:bg-dark-text/10",
          state.open && "bg-dark-text/20 hover:bg-dark-text/30",
        ])}
      >
        <div className="px-4 pt-2 pb-4">
          <h5 className="font-semibold">
            {`Ukuran Teks`}
          </h5>

          <div className="flex items-end gap-2 mt-1">
            {[{
              label: `Kecil`,
              className: 'text-sm',
              size: 'sm' as typeof typography.size,
            }, {
              label: `Normal`,
              className: 'text-base',
              size: 'base' as typeof typography.size,
            }, {
              label: `Besar`,
              className: 'text-lg',
              size: 'lg' as typeof typography.size,
            }, {
              label: `XL`,
              className: 'text-xl',
              size: 'xl' as typeof typography.size,
            }].map((item) => {
              const isActive = typography.size === item.size;

              return (
                <Button
                  key={item.label}
                  className={clsx([
                    "border border-dark-300",
                    !isActive && "border-dark-300 bg-card hover:bg-dark-text/10",
                    isActive && "border-transparent bg-primary hover:bg-primary/80 text-white",
                  ])}
                  size="xs"
                  onClick={() => useUiState.getState().setTypographySize(item.size)}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Primary Colors */}
          <h5 className="font-semibold mt-4">
            {`Primary Color`}
          </h5>

          <div className="flex flex-wrap items-end gap-1 mt-1 max-w-[300px]">
            {[{
              label: `Biru`,
              value: 'primary-blue',
              color: '#0a82d8',
            }, {
              label: `Hijau`,
              value: 'primary-green',
              color: '#2cb44a',
            }, {
              label: `Orange`,
              value: 'primary-orange',
              color: '#eda32d',
            }, {
              label: `Ungu`,
              value: 'primary-purple',
              color: '#8b5cf6',
            }, {
              label: `BerkarirBI`,
              value: 'primary-bi',
              color: '#275592',
            }, {
              label: `Viracun`,
              value: 'primary-viracun',
              color: '#ff006c',
            }, {
              label: `Al Faiz`,
              value: 'primary-alfaiz',
              color: '#930012',
            }, {
              label: `Jadi ASN`,
              value: 'primary-jadiasn',
              color: '#356692',
            }].map((item) => (
              <Button
                key={item.label}
                style={{ backgroundColor: item.color }}
                className="px-4 py-2 text-white hover:-top-0.5 shadow-none hover:shadow-md active:shadow-sm active:top-0 relative"
                onClick={() => setPrimaryColor(item.value)}
                size="xs"
              >
                {item.label}
              </Button>
            ))}

            <div className="w-[144px]">
              <TextField
                inputClassName="!py-1 !pl-2"
                placeholder={`Paste a color`}
                type="text"
                value={input.fields.color}
                onChange={(e) => input.handleFieldChange('color', e.target.value)}
                right={(
                  <Button
                    className="mr-2 text-primary border border-primary/50 hover:bg-primary/10"
                    type="button"
                    size={28}
                    onClick={() => handleCustomColor(input.fields.color)}
                  >
                    <IoCheckmarkSharp size={18} />
                  </Button>
                )}
              />
            </div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default PreferenceDropdown;
