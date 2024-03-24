import type {ReactNode} from 'react';
import {useEffect, createRef} from 'react';
import {twMerge} from 'tailwind-merge';
import type {ButtonProps} from '@/components/Button';
import Button from '@/components/Button';
import Typography from '@/components/Typography';

type ModalCloseProps = {
  render: JSX.Element;
  className?: string;
};

export enum ModalVariants {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  DEFAULT = 'default',
}

export type ModalProps = {
  isOpen: boolean;
  actions?: ModalActions[];
  title?: ReactNode;
  onCloseClick?: () => void;
  className?: string;
  modalWrapperClass?: string;
  children: ReactNode;
  footer?: ReactNode;
  contentWrapperClass?: string;
  onOutSideClick?: () => void;
  actionWrapperClass?: string;
  closeProps?: ModalCloseProps;
  //Adding this for modal sizes
  variant?: ModalVariants;
};
export type ModalActions = {
  text: string | JSX.Element;
} & ButtonProps;

const getModalSize = (variant: ModalVariants) => {
  switch (variant) {
    case ModalVariants.SMALL:
      return 'max-w-[384px]';
    case ModalVariants.MEDIUM:
      return 'max-w-[511px]';
    case ModalVariants.LARGE:
      return 'max-w-[650px]';
    default:
      return 'max-w-[40%]';
  }
};

const Modal = ({
  className,
  actionWrapperClass,
  isOpen,
  actions,
  title,
  children,
  footer,
  modalWrapperClass,
  contentWrapperClass,
  onOutSideClick,
  variant = ModalVariants.SMALL,
  closeProps: {render: closeRender, className: closeClassName} = {} as ModalCloseProps,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const wrapperRef = createRef<HTMLDivElement>();

  return isOpen ? (
    <div
      ref={wrapperRef}
      onClick={(event) => {
        if (event.target === wrapperRef.current) {
          onOutSideClick?.();
        }
      }}
      className={twMerge(
        'h-full fixed bg-black/60 backdrop-blur-[6.5px] z-40 left-0 top-0 right-0 cursor-auto flex justify-center items-center var',
        className,
      )}>
      <div
        className={twMerge(
          `flex flex-col gap-4 bg-base-color  max-h-[65%] rounded-lg px-4 py-6 relative overflow-hidden ${getModalSize(variant)}`,
          modalWrapperClass,
        )}>
        <div className={twMerge('flex flex-col ', closeRender ? '' : 'gap-4')}>
          {closeRender && <div className={twMerge('flex justify-end', closeClassName)}>{closeRender}</div>}
          {title && (
            <Typography variant="h2" className={'flex flex-col items-center gap-2.5 font-bold text-xl text-base-700'}>
              {title}
            </Typography>
          )}
        </div>
        <div className={twMerge('overflow-auto text-center', contentWrapperClass)}>{children}</div>
        {actions && actions.length > 0 ? (
          <div className={twMerge('flex gap-4 text-lg flex-wrap items-center justify-center', actionWrapperClass)}>
            {actions?.map(({text, className, ...rest}, index) => (
              <Button className={twMerge('flex-grow', className)} {...rest} key={index}>
                {text}
              </Button>
            ))}
            {footer && <div className="text-sm leading-4 h-8 flex justify-center items-center">{footer}</div>}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
