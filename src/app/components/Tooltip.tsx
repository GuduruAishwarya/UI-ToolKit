'use client';
import {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';

import Card from '@/components/Card';
import type {GlobalTooltipProps} from '@/utils/index';
import {defaultGlobalContext} from '@/utils/index';
import {useGlobalBaseComponentContext} from '@/utils/hooks/useGlobalBaseComponentContext';

export type TooltipProps = {
  content: string | JSX.Element | (() => JSX.Element);
  className?: string;
  styles?: {
    contentWrapperClass?: string;
    topArrow?: string;
    bottomArrow?: string;
  };
  fromRoot?: boolean;
  toLeft?: boolean;
  atElement?: React.MutableRefObject<HTMLDivElement | null> | null;
  renderAt?: 'top' | 'bottom';
} & PropsWithChildren;

const Tooltip = ({
  content,
  children,
  fromRoot,
  toLeft,
  atElement,
  className,
  styles: {contentWrapperClass, topArrow, bottomArrow} = {},
  renderAt,
}: TooltipProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const {globalBaseComponentContext, setGlobalBaseComponentContext} = useGlobalBaseComponentContext();
  const tooltipRef = useRef<HTMLDivElement>(null);
  const left = useRef<number | undefined>(undefined);
  const top = useRef<number | undefined>(undefined);
  const [isAligned, setIsAligned] = useState(false);
  const [renderPosition, setRenderPosition] = useState(renderAt);

  useEffect(() => {
    if (atElement?.current && tooltipRef.current && fromRoot) {
      const elementPositions = atElement.current.getBoundingClientRect();

      left.current =
        elementPositions.left + atElement.current.clientWidth + atElement.current.clientWidth / 2 - (tooltipRef.current?.clientWidth || 0);

      if (renderAt === 'top') {
        top.current = elementPositions.top - tooltipRef.current.clientHeight;
      } else {
        if (window.innerHeight - (elementPositions.top + atElement.current.clientHeight) < tooltipRef.current.clientHeight) {
          top.current = elementPositions.top - tooltipRef.current.clientHeight;
          setRenderPosition('top');
        } else {
          top.current = elementPositions.top + atElement.current.clientHeight;
        }
      }
      setIsAligned(true);
    }
  }, [atElement, fromRoot, renderAt]);

  const activateTooltip = () => {
    setGlobalBaseComponentContext({
      ...globalBaseComponentContext,
      tooltip: {
        isOpen: true,
        atElement: elementRef,
        className,
        content,
        renderAt,
        toLeft,
        styles: {contentWrapperClass, topArrow, bottomArrow},
      },
    });
  };

  const deactivateTooltip = () => {
    setGlobalBaseComponentContext({
      ...globalBaseComponentContext,
      tooltip: {
        ...(defaultGlobalContext.tooltip as GlobalTooltipProps),
      },
    });
  };
  return (
    <div className={twMerge(!fromRoot && 'relative')}>
      {!fromRoot && (
        <div ref={elementRef} onMouseEnter={activateTooltip} onMouseLeave={deactivateTooltip} className="text-ellipsis overflow-hidden">
          {children}
        </div>
      )}
      {fromRoot && (
        <div
          className={twMerge('fixed flex flex-col justify-end z-50 ', !isAligned && 'invisible')}
          style={{
            left: left.current,
            top: top.current,
          }}
          ref={tooltipRef}>
          {(!renderPosition || renderPosition === 'bottom') && (
            <div
              className={twMerge(
                `w-0 h-0 border-b-[12px] border-b-white border-x-[12px] border-x-transparent   ${
                  !toLeft ? 'self-end mr-3' : 'self-start ml-3'
                } filter drop-shadow-[0_-2px_1px_#dbdcdd]`,
                bottomArrow,
              )}></div>
          )}
          <Card className={twMerge('bg-white', contentWrapperClass)}>{typeof content === 'function' ? content() : content}</Card>
          {renderPosition === 'top' && (
            <div
              className={twMerge(
                `w-0 h-0 border-t-[12px] border-t-white border-x-[12px] border-x-transparent self-end mr-3 filter drop-shadow-[0_3px_2px_#dbdcdd]  ${
                  !toLeft ? 'self-end mr-3' : 'self-start ml-3'
                }`,
                topArrow,
              )}></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
