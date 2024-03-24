'use client';
import {twMerge} from 'tailwind-merge';
import Lottie from 'lottie-react';

import loaderJson from '@/public/loader.json';

type LoaderProps = {
  className?: string;
  loaderWrapper?: string;
};
const Loader = ({className, loaderWrapper}: LoaderProps) => {
  return (
    <div
      className={twMerge(
        'flex fixed justify-center items-center left-0 right-0 top-0 bottom-0 z-[45] backdrop-blur-[6.5px] bg-loader-background',
        loaderWrapper,
      )}>
      <Lottie className={twMerge('w-[500px] h-[500px]', className)} animationData={loaderJson} loop autoPlay />
    </div>
  );
};

export default Loader;
