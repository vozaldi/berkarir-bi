'use client';

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import Button from "./Button";
import { useUiShallow } from "@/states/uiState";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { httpService } from "@/lib/utilities";
import { useDebounce } from "@/lib/hooks";

function ThemeToggle() {
  // Hooks
  const theme = useUiShallow((state) => state.theme);
  const setTheme = useUiShallow((state) => state.setTheme);

  // States
  const changedTheme = useDebounce(theme, 500);

  // Effects
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  useEffect(() => {
    httpService.self('/setting/theme', {
      method: 'POST',
      data: { theme: changedTheme },
    }).catch(() => null);
  }, [changedTheme]);

  // Handlers
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(nextTheme);
  };

  return (
    <Button
      type="button"
      className="relative bg-dark-500/30 hover:bg-dark-500/40 !p-0.5 !rounded-full group/toggle"
      onClick={() => handleToggleTheme()}
    >
      <div className={clsx([
        "absolute left-0.5 top-0.5 bottom-0.5 aspect-square rounded-full bg-white dark:bg-black transition-transform duration-200 ease-in-out",
        theme === 'light' && "translate-x-0 ml-0",
        theme === 'dark' && "translate-x-full ml-1",
      ])} />

      <div className="relative flex items-center gap-x-1">
        <div className="px-2 py-2">
          <IoSunnyOutline size={20} />
        </div>

        <div className="px-2 py-2">
          <IoMoonOutline size={20} />
        </div>
      </div>
    </Button>
  );
};

export default ThemeToggle;
