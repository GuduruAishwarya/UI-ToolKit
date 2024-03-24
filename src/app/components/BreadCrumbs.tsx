import {observer} from 'mobx-react';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';
import Button from './Button';
export type BreadCrumbType = {
  title: string;
  url?: string;
  onClick?: () => void;
};
type BreadCrumbsProps = {
  separator: string;
  breadCrumbs: BreadCrumbType[];
  setBreadCrumbs?: (value: BreadCrumbType[]) => void;
  className?: string;
};
function BreadCrumbs({separator, breadCrumbs, setBreadCrumbs, className}: BreadCrumbsProps) {
  const removeBreadCrumbs = (index: number) => {
    const sliced = breadCrumbs.slice(0, index + 1);
    setBreadCrumbs?.(sliced);
  };
  return (
    <div className={twMerge('text-sm flex items-center gap-2 bg-base-color', className)}>
      {breadCrumbs.map(({title, url, onClick}, i) => {
        if (url)
          return (
            <div className="flex gap-2" key={title + i}>
              <Link
                href={url}
                className={`${i === breadCrumbs.length - 1 ? 'text-base-900' : 'text-base-500 cursor-pointer'}`}
                onClick={() => removeBreadCrumbs(i)}>
                {title}
              </Link>
              {breadCrumbs.length > 1 && i < breadCrumbs.length - 1 && <span className="text-base-500">{separator}</span>}
            </div>
          );
        return (
          <div className="flex gap-2" key={title + i}>
            <Button
              variant="none"
              onClick={() => {
                onClick?.();
                removeBreadCrumbs(i);
              }}
              className={`${
                i === breadCrumbs.length - 1 ? 'text-base-900' : 'text-base-500 cursor-pointer'
              } min-w-[unset] p-0 enabled:hover:bg-inherit font-normal text-sm`}>
              {title}
            </Button>
            {breadCrumbs.length > 1 && i < breadCrumbs.length - 1 && <span className="text-base-500">{separator}</span>}
          </div>
        );
      })}
    </div>
  );
}

export default observer(BreadCrumbs);
