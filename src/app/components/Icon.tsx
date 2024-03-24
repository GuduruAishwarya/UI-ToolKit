'use client';
import dynamic from 'next/dynamic';
import type {SVGProps} from 'react';
import {createContext, useContext} from 'react';
import Skeleton from './Skeleton';
import Spinner from './Spinner';
export enum IconVariants {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  NONE = '',
}

export enum LoaderVariants {
  SKELETON = 'skeleton',
  SPINNER = 'spinner',
  NONE = 'none',
}

// export interface IconProps extends LoaderValueType, SVGProps<SVGSVGElement> {
//   name: string;
//   alt?: string;
// }
type LoaderValueType = {
  width?: number | string;
  height?: number | string;
  variant?: IconVariants;
  spinnerStyles?: string;
  loaderVariant?: LoaderVariants;
};
const LoaderValueContext = createContext({} as LoaderValueType);

export function Loader() {
  const {loaderVariant, spinnerStyles, width, height, variant} = useContext(LoaderValueContext);
  return loaderVariant === LoaderVariants.SKELETON ? (
    <Skeleton width={Number(width) || 16} height={Number(height) || 16} variant={variant} />
  ) : loaderVariant === LoaderVariants.SPINNER ? (
    <Spinner variant="xs" spinnerStyles={spinnerStyles} />
  ) : (
    <></>
  );
}

// const LoadSVG = dynamic(() => import('./SvgLoader'), {
//   ssr: false,
//   loading: () => <Loader />,
// });

// export default function Icon({name, loaderVariant = LoaderVariants.SKELETON, spinnerStyles, ...rest}: IconProps) {
//   if (!name) {
//     return <></>;
//   }
//   return (
//     <>
//       <LoaderValueContext.Provider value={{loaderVariant, spinnerStyles, width: rest.width, height: rest.height, variant: rest.variant}}>
//         <LoadSVG name={name} {...rest} />
//       </LoaderValueContext.Provider>
//     </>
//   );
// }

import DeleteIcon from '@/public/delete.svg';
import ExclamationCircle from '@/public/exclamation-circle.svg';
import InfoCircle from '@/public/info-circle.svg';
import PasswordEyeClose from '@/public/password-eye-close.svg';
import PasswordEyeOpen from '@/public/password-eye-open.svg';
import Search from '@/public/search.svg';
import Check from '@/public/check.svg';
import ChevronLeft from '@/public/chevron-left.svg';
import ChevronRight from '@/public/chevron-right.svg';
import ChevronUp from '@/public/chevron-up.svg';
import ClipboardCopy from '@/public/clipboard-copy.svg';
import Collapse from '@/public/collapse.svg';
import CrossNoCircle from '@/public/cross-no-circle.svg';

export type IconProps = {
  name: IconNames;
} & React.SVGProps<SVGSVGElement>;

export type IconNames =
   | 'delete'
   | 'clipboard-copy'
   | 'chevron-up'
   | 'search'
   | 'collapse'
   | 'expand'
   | 'chevron-left'
   | 'chevron-right'
   | 'check'
   | 'cross-no-circle'
   | 'info-circle'
   | 'password-eye-open'
   | 'password-eye-close'
   | 'exclamation-circle'

const icons: {[key: string]: any} = {

  'delete':DeleteIcon,
  'clipboard-copy':ClipboardCopy,
  'chevron-up':ChevronUp,
  'chevron-left':ChevronLeft,
  'chevron-right':ChevronRight,
  'search':Search,
  'collapse':Collapse,
  'check': Check,
  'cross-no-circle':CrossNoCircle,
  'info-circle':InfoCircle,
  'password-eye-open':PasswordEyeOpen,
  'password-eye-close':PasswordEyeClose,
  'exclamation-circle':ExclamationCircle
 
};
const Icon = ({name, ...rest}: IconProps) => {
  if (!name) return <></>;
  if (!icons[name]) {
    return <></>;
  }
  const Component = icons[name];
  return <Component {...rest} />;
};
export default Icon;
