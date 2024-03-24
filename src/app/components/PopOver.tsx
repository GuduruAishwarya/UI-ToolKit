'use client';
import {useCallback, useEffect, useId, useRef, useState} from 'react';
import type {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

import {useGlobalBaseComponentContext} from '@/utils/hooks/useGlobalBaseComponentContext';
import {useCloseOnNodeOutsideClick} from '@/utils/hooks/useCloseOnNodeOutside';

export type PopOverProps = {
  isPopOverOpen: boolean;
  atElement: React.MutableRefObject<HTMLElement | null> | null;
  onClose?: () => void;
  fromRoot?: boolean;
  shouldCloseOnOutsideClick?: boolean;
  className?: string;
  popupStyle?: string;
  moveLeftBy?: number;
  children: ReactNode;
  overrideMaxWidth?: boolean;
};

const PopOver = ({
  isPopOverOpen,
  atElement,
  children,
  fromRoot,
  onClose,
  shouldCloseOnOutsideClick = true,
  className,
  popupStyle,
  moveLeftBy,
  overrideMaxWidth,
}: PopOverProps) => {
  const {globalBaseComponentContext, setGlobalBaseComponentContext} = useGlobalBaseComponentContext();
  const ref = useRef<HTMLDivElement>(null);
  const left = useRef<number>();
  const top = useRef<number>();
  const [isAligned, setIsAligned] = useState(false);
  const [adjustmentsDoneIfNeeded, setAdjustmentsDoneIfNeeded] = useState(false);
  const isTopAligned = useRef(false);

  const currentPopOverId = useId();

  const resetGlobalPopup = useCallback(() => {
    setGlobalBaseComponentContext({
      ...globalBaseComponentContext,
      popOver: {
        isPopOverOpen: false,
        atElement: null,
        children: <></>,
        onClose: undefined,
        shouldCloseOnOutsideClick: undefined,
        className: undefined,
        popupStyle: undefined,
        moveLeftBy: 0,
        id: '',
        overrideMaxWidth: undefined,
      },
    });
  }, [globalBaseComponentContext, setGlobalBaseComponentContext]);

  const closePopOver = useCallback(() => {
    if (shouldCloseOnOutsideClick) {
      if (currentPopOverId === globalBaseComponentContext?.popOver?.id) {
        resetGlobalPopup();
      }
      onClose?.();
    }
  }, [currentPopOverId, globalBaseComponentContext?.popOver?.id, onClose, resetGlobalPopup, shouldCloseOnOutsideClick]);

  useCloseOnNodeOutsideClick(ref, closePopOver, isPopOverOpen);

  useEffect(() => {
    return () => {
      if (!fromRoot && currentPopOverId === globalBaseComponentContext?.popOver?.id) {
        resetGlobalPopup();
        onClose?.();
      }
    };
  }, [globalBaseComponentContext?.popOver?.id]);

  useEffect(() => {
    if (
      !fromRoot &&
      isPopOverOpen &&
      (!globalBaseComponentContext?.popOver?.id || globalBaseComponentContext?.popOver.id === currentPopOverId)
    ) {
      setGlobalBaseComponentContext({
        ...globalBaseComponentContext,
        popOver: {
          isPopOverOpen,
          children,
          atElement,
          shouldCloseOnOutsideClick,
          onClose,
          className,
          popupStyle,
          moveLeftBy,
          id: currentPopOverId,
          overrideMaxWidth,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopOverOpen, children]);

  useEffect(() => {
    if (!isPopOverOpen && currentPopOverId === globalBaseComponentContext?.popOver?.id) {
      resetGlobalPopup();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopOverOpen]);

  useEffect(() => {
    if (fromRoot) {
      window.addEventListener('resize', closePopOver);
    }

    return () => {
      window.removeEventListener('resize', closePopOver);
    };
  }, [closePopOver, fromRoot]);

  useEffect(() => {
    if (globalBaseComponentContext?.popOver?.isPopOverOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [globalBaseComponentContext?.popOver?.isPopOverOpen]);

  useEffect(() => {
    if (atElement?.current && fromRoot) {
      const elementPositions = atElement?.current?.getBoundingClientRect();
      left.current = elementPositions?.left;

      top.current = elementPositions?.top + atElement?.current?.clientHeight + 6;
      if (ref.current) {
        ref.current.style.left = left.current + 'px';
        ref.current.style.top = top.current + 'px';
      }
      setIsAligned(true);
    }
  }, [atElement, fromRoot, moveLeftBy]);

  useEffect(() => {
    if (fromRoot && adjustmentsDoneIfNeeded && isTopAligned.current) {
      const resizeObserver = new ResizeObserver(() => {
        const element = ref.current?.firstChild as HTMLElement;
        const elementPositions = atElement?.current?.getBoundingClientRect();
        if (top.current) {
          top.current = (elementPositions?.top as number) - element?.offsetHeight - 6;
        }
        if (ref.current) {
          ref.current.style.top = top.current + 'px';
        }
      });

      if (ref.current) {
        resizeObserver.observe(ref.current.firstChild as Element);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [fromRoot, adjustmentsDoneIfNeeded, atElement]);

  useEffect(() => {
    if (isAligned && !adjustmentsDoneIfNeeded && ref.current) {
      const element = ref.current.firstChild as HTMLElement;
      const availableWidthFromElement = window.innerWidth - (left.current || 0);
      if (availableWidthFromElement < element.offsetWidth && left.current) {
        left.current = left.current - (element.offsetWidth - availableWidthFromElement) + (moveLeftBy || 0);
      }
      if (top.current) {
        const availableHeightFromElement = window.innerHeight - top.current;
        if (availableHeightFromElement < element.offsetHeight) {
          isTopAligned.current = true;
          top.current = top.current - (atElement?.current?.clientHeight || 0) - element.offsetHeight - 12; //Reduce 6 from first addition and again reduce 6 to have some gap
        }
      }
      if (ref.current) {
        ref.current.style.left = left.current + 'px';
        ref.current.style.top = top.current + 'px';
      }
      setAdjustmentsDoneIfNeeded(true);
    }
  }, [adjustmentsDoneIfNeeded, atElement, isAligned]);

  if ((fromRoot && !isAligned) || !globalBaseComponentContext?.popOver?.isPopOverOpen) {
    return <></>;
  }

  if (!fromRoot && isPopOverOpen && currentPopOverId !== globalBaseComponentContext?.popOver?.id) {
    return <div ref={ref}>{children}</div>;
  }

  return fromRoot ? (
    <div className={twMerge('fixed top-0 bottom-0 left-0 right-0 z-[35]', className)}>
      <div
        className={twMerge(!adjustmentsDoneIfNeeded && 'invisible', popupStyle)}
        style={{
          position: 'relative',
          maxWidth: !overrideMaxWidth ? atElement?.current?.clientWidth : undefined,
        }}
        ref={ref}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PopOver;
