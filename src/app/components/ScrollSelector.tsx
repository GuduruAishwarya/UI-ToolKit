import {useCallback, useEffect, useRef, useState} from 'react';
import Typography from './Typography';
import {twMerge} from 'tailwind-merge';

export type ScrollSelectorProps = {
  onFocus: (name: string, index: number) => void;
  scrollValues: number[] | string[];
  selectedIndex?: number;
  className?: string;
  selectorStyles?: string;
  name: string;
  disableFrom?: number;
  disableTo?: number;
};

const CELL_SCROLLBY_HEIGHT = 40;

const ScrollSelector = ({scrollValues, onFocus, selectedIndex, className, selectorStyles, name}: ScrollSelectorProps) => {
  const lastScroll = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const haltScroll = useRef<number>(0);
  const [selected, setSelected] = useState(selectedIndex);
  const disableScrollEventCall = useRef(false);

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if (selectedIndex !== undefined && scrollRef.current && selectedIndex * 40 !== scrollRef.current?.scrollTop) {
      disableScrollEventCall.current = true;
      scrollRef.current?.classList.add('scroll-smooth');
      const moveScroll = selectedIndex * 40;
      scrollRef.current.scrollTop = moveScroll;
      lastScroll.current = moveScroll;
      setSelected(selectedIndex);
      timeOut = setTimeout(() => {
        disableScrollEventCall.current = false;
        scrollRef.current?.classList.remove('scroll-smooth');
      }, 900);
    }

    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const handleScroll = useCallback(
    (event: Event) => {
      if (scrollRef.current && !disableScrollEventCall.current) {
        if (haltScroll.current === 0) {
          const element = event.currentTarget as HTMLDivElement;
          if (element.scrollTop < lastScroll.current) {
            scrollRef.current.scrollTop = lastScroll.current - CELL_SCROLLBY_HEIGHT;
            lastScroll.current -= CELL_SCROLLBY_HEIGHT;
          } else {
            scrollRef.current.scrollTop = lastScroll.current + CELL_SCROLLBY_HEIGHT;
            lastScroll.current += CELL_SCROLLBY_HEIGHT;
          }
          const selected = lastScroll.current / 40;
          setSelected(selected);
          onFocus?.(name, selected);
          haltScroll.current = 1;
        } else {
          scrollRef.current.scrollTop = lastScroll.current;
        }
      }
    },
    [name, onFocus],
  );

  useEffect(() => {
    const ref = scrollRef.current;
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    const timer = setInterval(() => {
      if (haltScroll.current > 0) {
        haltScroll.current = haltScroll.current - 1;
      }
    }, 400);

    return () => {
      ref?.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [handleScroll]);

  return (
    <>
      <div
        className={twMerge(
          'overflow-y-auto snap-y snap-mandatory min-h-[80px] max-h-[600px] h-full no-scrollbar [&::-webkit-scrollbar]:hidden',
          className,
        )}
        ref={scrollRef}>
        <div className={'min-h-[calc(50%-20px)]'} />
        {scrollValues.map((value, index) => {
          return (
            <Typography
              className={twMerge('p-2.5 h-10 text-center snap-center', selected === index && 'text-primary')}
              mode={selected === index ? 'bolder' : 'bold'}
              key={index}>
              {value}
            </Typography>
          );
        })}
        <div className={'min-h-[calc(50%-20px)]'} />
      </div>
      <div className={twMerge('h-10 w-full bg-primary absolute opacity-20 self-center pointer-events-none', selectorStyles)} />
    </>
  );
};

export default ScrollSelector;
