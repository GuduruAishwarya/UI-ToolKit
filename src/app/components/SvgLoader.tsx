// import React, {useEffect, useState} from 'react';
// import type {IconProps} from './Icon';
// import {Loader} from './Icon';
// import {twMerge} from 'tailwind-merge';
// import {IconVariants} from '@/components/Icon';
// import Image from 'next/image';
// import fallback from '@/public/fallback.png';

// const SvgLoader = ({name, width, height, className, variant = width ? IconVariants.NONE : IconVariants.SMALL, ...rest}: IconProps) => {
//   const [iconDetails, setIconDetails] = useState<{
//     isLoading: boolean;
//     icon: any;
//   }>({
//     isLoading: true,
//     icon: null,
//   });

//   const iconUrl = `${process.env.NEXT_PUBLIC_ASSETS_CDN}icons/${name}.svg`;
//   useEffect(() => {
//     const abortController = new AbortController();
//     try {
//       fetch(iconUrl, {signal: abortController.signal})
//         .then((res) => {
//           if (res.status === 200) {
//             return res.text();
//           } else {
//             console.log('Error Loading Svg');
//             return '';
//           }
//         })

//         .then((data) => {
//           setIconDetails((val) => {
//             return {
//               isLoading: false,
//               icon: data,
//             };
//           });
//         })
//         .catch((err) => {
//           if (!(err instanceof DOMException)) {
//             setIconDetails((val) => ({
//               ...val,
//               isLoading: false,
//             }));
//           }
//         });
//     } catch (e) {
//       console.log('Error Loading Svg', e);
//     }

//     return () => {
//       try {
//         abortController.abort('icon changed');
//       } catch (e) {
//         console.log(e);
//       }
//     };
//   }, [iconUrl, name]);

//   if (iconDetails.isLoading) {
//     return <Loader />;
//   }

//   return iconDetails.icon ? (
//     <svg
//       width={variant === IconVariants.SMALL ? '16' : variant === IconVariants.MEDIUM ? '20' : variant === IconVariants.LARGE ? '24' : width}
//       height={
//         variant === IconVariants.SMALL ? '16' : variant === IconVariants.MEDIUM ? '20' : variant === IconVariants.LARGE ? '24' : height
//       }
//       className={twMerge('text-base-700', className)}
//       dangerouslySetInnerHTML={{__html: iconDetails.icon}}
//       {...rest}></svg>
//   ) : (
//     <Image
//       src={fallback}
//       alt=""
//       width={
//         variant === IconVariants.SMALL ? 16 : variant === IconVariants.MEDIUM ? 20 : variant === IconVariants.LARGE ? 24 : Number(width)
//       }
//       height={
//         variant === IconVariants.SMALL ? 16 : variant === IconVariants.MEDIUM ? 20 : variant === IconVariants.LARGE ? 24 : Number(height)
//       }
//     />
//   );
// };

// export default SvgLoader;
