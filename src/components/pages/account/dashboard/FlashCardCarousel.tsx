'use client';

import clsx from "clsx";
import NextImage, { ImageProps } from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper/modules';
import { useEffect, useState } from "react";
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { LayoutObject } from "@/types/utilities";

type CarouselImageProp = Omit<ImageProps, 'width' | 'height' | 'src'> & {
  src: string;
};

type Props = React.HTMLAttributes<HTMLDivElement> & {
  images: CarouselImageProp[];
};

function FlashCardCarousel({
  id = 'flashcard-carousel',
  className,
  images = [],
  ...props
}: Props) {
  // States
  const [image, setImage] = useState<LayoutObject>({});
  
  // Eeffects
  useEffect(() => {
    images.forEach(({ src }) => {
      const img = new Image();

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        setImage(state => ({
          ...state,
          [src]: { width, height },
        }));
      }

      img.src = src;
    });

    let lightbox = new PhotoSwipeLightbox({
      gallery: `#${id}`,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [images]);

  return (
    <div id={id} className={clsx(['relative !-m-3', className])} {...props}>
      <Swiper
        className="w-full"
        slidesPerView={1}
        autoplay={{ delay: 3000, reverseDirection: true }}
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
              <a
                className="relative flex justify-center items-center rounded-2xl overflow-hidden shadow-md"
                data-pswp-width={image[src]?.width || 256}
                data-pswp-height={image[src]?.height || 256}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NextImage
                  className="w-full h-auto object-contain"
                  src={src}
                  alt={alt}
                  width={910}
                  height={512}
                  {...imgProps}
                />
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FlashCardCarousel;
