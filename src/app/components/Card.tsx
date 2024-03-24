import type {PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';

export type CardProps = {
  className?: string;
} & PropsWithChildren;

const Card = ({className, children}: CardProps) => {
  return <div className={twMerge('flex flex-col bg-base-color rounded-lg p-4 overflow-hidden shadow-md', className)}>{children}</div>;
};

export default Card;
