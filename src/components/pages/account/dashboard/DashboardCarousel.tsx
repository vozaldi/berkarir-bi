'use client';

import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  images: Omit<ImageProps, 'width' | 'height'>[];
};

function DashboardCarousel({
  className,
  images = [],
  ...props
}: Props) {
  return (
    <div className={clsx(['relative !-m-3', className])} {...props}>
      <Swiper
        className="w-full"
        slidesPerView={1}
        centeredSlides
        loop
        effect="creative"
        modules={[EffectCreative]}
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
            <SwiperSlide key={index} className="p-3">
              <div className="relative flex justify-center items-center rounded-2xl overflow-hidden shadow-md">
                <Image
                  className="w-full h-auto object-contain"
                  src={src}
                  alt={alt}
                  width={943}
                  height={512}
                  {...imgProps}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DashboardCarousel;
