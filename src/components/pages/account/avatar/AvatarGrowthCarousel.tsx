'use client';

import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative, Controller } from 'swiper/modules';
import { useState } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  images: Omit<ImageProps, 'width' | 'height'>[];
};

function AvatarGrowthCarousel({
  className,
  images = [],
  ...props
}: Props) {
  // States
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [thumbSwiper, setThumbSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className={clsx(['relative', className])} {...props}>
      <Swiper
        className="w-full"
        slidesPerView={1}
        centeredSlides
        onSwiper={setMainSwiper}
        effect="creative"
        modules={[EffectCreative, Controller]}
        controller={{ control: thumbSwiper }}
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ['-120%', 0, -500],
          },
          next: {
            shadow: false,
            translate: ['120%', 0, -500],
          },
        }}
      >
        {images.map((item, index) => {
          const { src, alt, ...imgProps } = item;

          return (
            <SwiperSlide key={index}>
              <div className="relative flex justify-center items-center">
                <Image
                  className="w-[240px] h-auto object-contain"
                  src={src}
                  alt={alt}
                  width={240}
                  height={240}
                  {...imgProps}
                />

                <div className={clsx([
                  "absolute bottom-6 left-1/2 px-2 py-1 rounded-lg shadow-md",
                  index === 0 && 'bg-slate-500',
                  index === 1 && 'bg-teal-500',
                  index === 2 && 'bg-orange-500',
                  index === 3 && 'bg-pink-600',
                  index === 4 && 'bg-purple-600',
                ])}>
                  <p className="text-sm text-white font-bold">{alt}</p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <Swiper
        className="mt-4"
        slidesPerView={"auto"}
        slidesOffsetBefore={24}
        slidesOffsetAfter={24}
        onSwiper={setThumbSwiper}
      >
        {images.map((item, index) => {
          const { src, alt, ...imgProps } = item;

          return (
            <SwiperSlide key={index} className="!w-[80px]">
              <button
                className="rounded-xl hover:bg-dark-200 p-2"
                onClick={() => {
                  mainSwiper?.slideTo(index);
                }}
              >
                <Image
                  className="w-full h-full object-contain"
                  src={src}
                  alt={alt}
                  width={72}
                  height={72}
                  {...imgProps}
                />
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default AvatarGrowthCarousel;
