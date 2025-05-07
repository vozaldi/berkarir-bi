'use client';

import clsx from "clsx";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  onTimerEnd?: () => void;
  onDateChange?: (date: string) => void;
  isEnded?: boolean;
};

function TimerCAT({
  className,
  onTimerEnd,
  onDateChange,
  isEnded,
  ...props
}: Props) {
  // Hooks
  const params = useSearchParams();

  const tickRef = useRef<NodeJS.Timeout>(null);

  // States
  const [duration, setDuration] = useState(0);
  const [tick, setTick] = useState(0);
  
  // Effects
  useEffect(() => {
    setTick(0);

    tickRef.current && clearInterval(tickRef.current);
    tickRef.current = setInterval(() => {
      if (isEnded && tickRef.current) {
        return clearInterval(tickRef.current); 
      }

      setTick(state => state + 1);
    }, 1000);

    const today = dayjs();
    const endDate = params.get('end');
    const endAt = dayjs(endDate || null); 
    const remaining = endAt.diff(today, 'second');

    setDuration(remaining);

    onDateChange?.(endAt.format('YYYY-MM-DD HH:mm:ss'));

    return () => {
      if (tickRef.current) {
        setTick(0);

        clearInterval(tickRef.current);
      }
    };
  }, [params, onDateChange]);

  useEffect(() => {
    if (isEnded && tickRef.current) {
      clearInterval(tickRef.current);
    }
  }, [isEnded]);

  useEffect(() => {
    const timer = duration - tick;

    if (timer < 0) {
      onTimerEnd?.();

      if (tickRef.current) {
        clearInterval(tickRef.current);
      }
    }
  }, [tick, duration, onTimerEnd]);

  // Vars
  const timer = duration - tick;
  const hour = Math.floor(timer / 3600);
  const minute = Math.floor((timer % 3600) / 60);
  const second = timer % 60;

  return timer < 0 ? (
    <div className={clsx([className])}>
      <p className="text-red-500">Waktu Habis</p>
    </div>
  ) : (
    <div className={clsx(['flex bg-primary rounded-lg', className])} {...props}>
      {[{
        name: `Jam`,
        value: Math.abs(hour || 0).toString().padStart(2, '0'),
      }, {
        name: `Menit`,
        value: Math.abs(minute || 0).toString().padStart(2, '0'),
      }, {
        name: `Detik`,
        value: Math.abs(second || 0).toString().padStart(2, '0'),
      }].map((item, index) => (
        <div key={item.name} className={clsx([
          "relative p-3 flex-1 flex items-center justify-center min-w-12 text-center",
        ])}>
          <p className="text-3xl text-white font-bold -mt-1 mb-3">{item.value}</p>

          <span className="absolute text-center bottom-1 left-0 right-0 text-sm text-white/80">{item.name}</span>

          {!!index && (
            <div className="absolute left-0 h-full pt-0.5">
              <p className="text-3xl text-white">:</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimerCAT;
