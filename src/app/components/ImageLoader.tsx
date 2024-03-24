'use client';
import type {ImageProps, StaticImageData} from 'next/image';
import Image from 'next/image';
import Skeleton from './Skeleton';
import {useState} from 'react';
import {twMerge} from 'tailwind-merge';
import {LoaderVariants} from '@/components/Icon';
import type {SpinnerProps} from './Spinner';
import Spinner from './Spinner';
import fallbackImage from '@/public/favicon.png';

interface IImageProps extends ImageProps {
  className?: string;
  hFull?: boolean;
  wFull?: boolean;
  loaderVariant?: LoaderVariants;
  spinnerProps?: SpinnerProps;
  fallback?: string | StaticImageData;
}

const ImageLoader = ({
  src,
  alt,
  width,
  height,
  className,
  hFull = false,
  wFull = false,
  loaderVariant = LoaderVariants.SKELETON,
  spinnerProps,
  fallback = fallbackImage,
  ...rest
}: IImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | StaticImageData>(`${process.env.NEXT_PUBLIC_ASSETS_CDN}images/${src}`);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`${!loaded ? '' : 'relative'}`} style={{height: hFull ? '100%' : height, width: wFull ? '100%' : width}}>
      {!loaded && loaderVariant === LoaderVariants.SKELETON && (
        <Skeleton className={twMerge('absolute', className)} width={Number(width)} height={hFull ? '100%' : height} />
      )}
      {!loaded && loaderVariant === LoaderVariants.SPINNER && (
        <Spinner variant="xs" {...spinnerProps} className={twMerge('absolute', spinnerProps?.className)} />
      )}
      <Image
        className={twMerge(className, `${!loaded ? 'opacity-0' : 'opacity-100'}}`)}
        src={imageUrl}
        alt={alt}
        width={Number(width)}
        height={!isNaN(Number(height)) ? Number(height) : '800'}
        {...rest}
        onLoadingComplete={() => setLoaded(true)}
        onError={() => setImageUrl(fallback)}
      />
    </div>
  );
};

export default ImageLoader;
