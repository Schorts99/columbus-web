import React, { ReactNode } from 'react';
import { TFunction } from 'react-i18next';

type BannerProps = {
  children: ReactNode,
  t: TFunction<string[]>,
  image: {
    src: string,
    alt: string,
  }
};

export default function Banner({ children, t, image }: BannerProps) {
  return (
    <div className="grid grid-cols-12 md:min-h-screen items-center md:gap-10">
      <div className="py-10 md:py-0 md:mt-0 col-span-10 col-start-2 md:col-start-2 md:col-span-6 lg:col-start-2 lg:col-span-5">
        <p className="mb-3 font-bold text-xl">
          {t('common:brand')}
        </p>
        {children}
      </div>
      <img
        src={`${process.env.PUBLIC_URL}${image.src}`}
        alt={image.alt}
        className="col-span-12 w-full mb-10 md:mb-0 md:col-span-5 lg:col-span-6"
      />
    </div>
  );
}
