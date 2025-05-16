'use client';

import clsx from "clsx";
import dayjs from "dayjs";
import Lottie from "lottie-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as countdown_flame from '@/assets/lotties/countdown-flame.json';
import { LayoutObject } from "@/types/utilities";
import numeral from "numeral";

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
  const containerRef = useRef<HTMLDivElement>(null);

  // States
  const [duration, setDuration] = useState(0);
  const [tick, setTick] = useState(0);
  const [layout, setLayout] = useState<LayoutObject>({});
  
  // Effects
  useEffect(() => {
    containerRef.current && setLayout(state => ({
      ...state,
      container: containerRef.current?.getBoundingClientRect(),
    }));
  }, []);

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
  }, [params]);

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

  const containerHeight = layout.container?.height || 0;
  const containerWidth = layout.container?.width || 0;
  const minuteTrigger = 60;
  const secondTrigger = 11;
  const secondPingTrigger = 6;
  const flameTrigger = 150;
  let flameY = 0;

  if (containerHeight > 0 && containerWidth > 0) {
    const flameInitial = containerWidth / 2;
    const timerRatio = timer / flameTrigger;

    flameY = timerRatio > 1 ? flameInitial : (
      (flameInitial * timerRatio)
    );
  }

  return timer < 0 ? (
    <div className={clsx([className])}>
      <p className="text-red-500">Waktu Habis</p>
    </div>
  ) : (
    <div
      ref={containerRef}
      className={clsx(['bg-primary rounded-lg relative', className])}
      {...props}
    >
      <div className="flex relative z-50 text-shadow-lg/30 text-shadow-primary">
        {[{
          name: `Jam`,
          value: Math.abs(hour || 0).toString().padStart(2, '0'),
        }, {
          name: `Menit`,
          value: Math.abs(minute || 0).toString().padStart(2, '0'),
          numberClassName: (timer && timer < minuteTrigger) ? '!text-red-500' : '',
        }, {
          name: `Detik`,
          value: Math.abs(second || 0).toString().padStart(2, '0'),
          numberClassName: clsx([
            (timer && timer < secondTrigger) && '!text-red-500',
            (timer && timer < secondPingTrigger) && 'animate-ping',
          ]),
          colonClassName: (timer && timer < minuteTrigger) ? '!text-red-500' : '',
        }].map((item, index) => (
          <div key={item.name} className={clsx([
            "relative p-2 flex-1 min-w-12 flex items-center justify-center",
          ])}>
            <div className="py-1 px-2 -mt-1 bg-primary/50 rounded-xl backdrop-blur-lg backdrop-opacity-50 text-center">
              <p
                className={clsx([
                  "relative text-3xl text-white font-bold",
                  item.numberClassName,
                ])}
              >{item.value}</p>

              <div className="text-center -mt-1 -mb-1 text-sm text-white/80">
                {item.name}
              </div>
            </div>

            {!!index && (
              <div className={clsx(["absolute left-0 top-0 h-full flex items-center -mt-1", item.colonClassName])}>
                <p className="text-3xl text-white">:</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isEnded && (
        <div className="absolute inset-0 rounded-lg overflow-hidden z-40">
          {'undefined' !== typeof window?.document && (
            <Lottie
              className={clsx([
                "absolute bottom-0 inset-x-0 transition-transform duration-150 ease-in-out",
                (!timer || timer > flameTrigger) && "opacity-0",
              ])}
              style={{ transform: `translateY(${flameY}px)` }}
              animationData={countdown_flame}
              loop={true}
              autoplay={true}
            />
          )}
        </div>
      )}

      {(!!timer && timer < flameTrigger) && (
        <div className={clsx([
          "absolute inset-0 rounded-lg bg-primary transition-shadow duration-200 ease-in shadow-red-500/75 z-30 animate-pulse",
          (timer >= 120) && "shadow-none",
          (timer >= 60 && timer < 120) && "shadow-sm",
          (timer >= 30 && timer < 60) && "shadow-md",
          (timer >= 10 && timer < 30) && "shadow-lg",
          (timer < 10) && "shadow-xl",
        ])} />
      )}

      <div className="absolute top-full right-0 py-2 flex justify-end gap-4 translate-y-3">
        <button
          className="text-nowrap text-primary-dark text-xs underline active:text-primary/70 cursor-pointer"
          onClick={() => setTick(state => state - 180)}
        >{`+3 minute`}</button>

        <button
          className="text-nowrap text-primary-dark text-xs underline active:text-primary/70 cursor-pointer"
          onClick={() => setTick(state => state + 180)}
        >{`-3 minute`}</button>

        {timer > 123 && (
          <button
            className="text-nowrap text-primary-dark text-xs underline active:text-primary/70 cursor-pointer"
            onClick={() => setTick(duration - 123)}
          >{`>> 2 m 🔥`}</button>
        )}

        {timer <= 123 && (
          <button
            className="text-nowrap text-primary-dark text-xs underline active:text-primary/70 cursor-pointer"
            onClick={() => setTick(duration - 63)}
          >{`>> 1 m 🔥`}</button>
        )}

        <button
          className="text-nowrap text-primary-dark text-xs underline active:text-primary/70 cursor-pointer"
          onClick={() => setTick(duration - 12)}
        >{`>> 10 detik ⏰`}</button>
      </div>
    </div>
  );
};

export default TimerCAT;
