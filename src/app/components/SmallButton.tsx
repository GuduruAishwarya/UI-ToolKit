import type {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import Button from './Button';

export function SmallButton({
  children,
  className,
  onClick,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      variant="none"
      onClick={() => onClick?.()}
      className={twMerge('rounded-[4px] border border-base-300 px-2 py-1 bg-transparent min-w-0', className)}
      disabled={disabled}>
      {children}
    </Button>
  );
}
