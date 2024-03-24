import {twMerge} from 'tailwind-merge';
import type {PropsWithChildren} from 'react';
import {useState} from 'react';
import Icon from '@/components/Icon';
import Typography from '@/components/Typography';

export type CollapsibleProps = {
  className?: string;
  title?: string;
  titleStyles?: string;
  expandedStyles?: string;
} & PropsWithChildren;

export default function CollapsibleCard({className, title, children, titleStyles, expandedStyles}: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className={twMerge('flex flex-col gap-2 py-1.5 px-0 border-1 border-base-200 shadow-md rounded-lg', className)}>
      <div className="flex items-center justify-between px-6">
        {title && <Typography className={twMerge('pl-4 text-xl font-bold', titleStyles)}>{title}</Typography>}
        <div className="min-w-[30px] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <Icon name={'chevron-up'} className={!isExpanded ? 'rotate-180' : ''} />
        </div>
      </div>
      {isExpanded && (
        <>
          <div className="h-2 border-t border-base-200"></div>
          <div className={twMerge('flex flex-col ', expandedStyles)}>{children}</div>
        </>
      )}
    </div>
  );
}
