import {useEffect, useMemo, useState} from 'react';
import Button, {ButtonProps} from '../../Button';
import Typography from '../../Typography';

import {convert24HoursTo12Hours, padZero, padZeroToMinutes, TimePickerModes} from '../helpers';

import {Time, TimePickerScroll} from '.';
import {twMerge} from 'tailwind-merge';
import {SideHelpers} from '../types';

export type TimePickerHelperProps = {
  timePickersIndex: TimePickerScroll;
  is12HrMode: boolean;
  setDisplayInputText: React.Dispatch<React.SetStateAction<Time>>;
  className?: string;
};

const TimePickerHelpers = ({timePickersIndex, is12HrMode, setDisplayInputText, className}: TimePickerHelperProps) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const dt = new Date();
    const min = dt.getMinutes();
    const hours = dt.getHours();

    if (is12HrMode) {
      const currHour = convert24HoursTo12Hours(hours);
      const mode = hours >= 12 ? 2 : 1;
      const {min: iMin, hour: iHour, timeMode: iMode} = timePickersIndex;

      if (min === iMin - 1 && (currHour === iHour - 1 || (currHour === 12 && iHour === 1)) && mode === iMode) {
        setSelected(1);
      } else if (
        (min === iMin - 1 && (currHour + 1 === iHour - 1 || (currHour === 12 && iHour === 2)) && iMode === mode) ||
        (currHour === 11 && iHour === 1 && iMode && iMode !== mode)
      ) {
        setSelected(2);
      } else if (min === iMin - 1 && (currHour === iHour - 1 || (currHour === 12 && iHour === 1)) && iMode && iMode !== mode) {
        setSelected(3);
      } else {
        setSelected(0);
      }
    } else {
      if (min === timePickersIndex.min - 1 && hours === timePickersIndex.hour - 1) {
        setSelected(1);
      } else if (min === timePickersIndex.min - 1 && hours + 1 === timePickersIndex.hour - 1) {
        setSelected(2);
      } else if (
        timePickersIndex.hour - 1 === (hours === 12 ? 0 : hours > 12 ? hours - 12 : hours + 12) &&
        min === timePickersIndex.min - 1
      ) {
        setSelected(3);
      } else {
        setSelected(0);
      }
    }
  }, [timePickersIndex, is12HrMode]);

  const timeHelpers: SideHelpers[] = useMemo(
    () => [
      {
        label: 'Now',
        identifier: 1,
        onClick: () => {
          const date = new Date();
          const currHour = date.getHours();
          const hour = is12HrMode ? convert24HoursTo12Hours(currHour) : currHour;
          const minutes = date.getMinutes();
          setSelected(1);

          setDisplayInputText({
            hour: hour === 0 ? '0' + hour.toString() : hour.toString(),
            min: ':' + padZeroToMinutes(minutes),
            timeMode: is12HrMode ? (currHour >= 12 ? TimePickerModes.PM : TimePickerModes.AM) : TimePickerModes.NONE,
          });
        },
      },
      {
        label: 'In 1 Hour',
        identifier: 2,
        onClick: () => {
          const date = new Date();
          const currHour = date.getHours();
          const hours = is12HrMode ? convert24HoursTo12Hours(currHour) : date.getHours();
          const minutes = date.getMinutes();
          setSelected(2);
          if (is12HrMode) {
            const mode = currHour >= 12 ? 2 : 1;
            if (hours === 12) {
              setDisplayInputText({
                hour: '1',
                min: ':' + padZeroToMinutes(minutes),
                timeMode: mode === 1 ? TimePickerModes.AM : TimePickerModes.PM,
              });
            } else {
              setDisplayInputText({
                hour: (hours + 1).toString(),
                min: ':' + padZeroToMinutes(minutes),
                timeMode:
                  mode === 1
                    ? hours === 11
                      ? TimePickerModes.PM
                      : TimePickerModes.AM
                    : hours === 11
                      ? TimePickerModes.AM
                      : TimePickerModes.PM,
              });
            }
          } else {
            if (hours === 23) {
              setDisplayInputText({
                hour: '00',
                min: ':' + padZeroToMinutes(minutes),
                timeMode: TimePickerModes.NONE,
              });
            } else {
              setDisplayInputText({
                hour: (hours + 1).toString(),
                min: ':' + padZeroToMinutes(minutes),
                timeMode: TimePickerModes.NONE,
              });
            }
          }
        },
      },
      {
        label: 'In 12 Hours',
        identifier: 3,
        onClick: () => {
          const dt = new Date();
          const hours = dt.getHours();
          const minutes = dt.getMinutes();
          const currHour = convert24HoursTo12Hours(hours);
          const mode = hours >= 12 ? 1 : 2;
          setSelected(3);
          if (is12HrMode) {
            setDisplayInputText({
              hour: currHour.toString(),
              min: ':' + padZero(minutes).toString(),
              timeMode: mode === 1 ? TimePickerModes.AM : TimePickerModes.PM,
            });
          } else {
            setDisplayInputText({
              hour: (hours === 12 ? '00' : hours > 12 ? hours - 12 : hours + 12).toString(),
              min: ':' + padZeroToMinutes(minutes),
              timeMode: TimePickerModes.NONE,
            });
          }
        },
      },
    ],
    [is12HrMode, setDisplayInputText],
  );

  return (
    <div className={twMerge('min-w-[35%] max-w-[35%] flex flex-col bg-base-color rounded-[10px] px-2.5 py-0', className)}>
      {timeHelpers.map(({identifier, label, ...buttonProps}, index) => {
        return (
          <div className={'px-0 py-3 relative'} key={index.toString() + label}>
            <Button
              variant="none"
              className={twMerge(
                'min-w-[unset] p-2.5 w-full font-normal text-right',
                selected === identifier && 'bg-[#ffe1c7] rounded-[10px]',
              )}
              {...buttonProps}>
              <Typography className={twMerge('text-base-700', selected === identifier && 'text-primary')}>{label}</Typography>
            </Button>
            <div className={twMerge(selected === identifier && 'w-1.5 h-full absolute top-0 left-0 bg-primary rounded-r-lg')} />
          </div>
        );
      })}
    </div>
  );
};

export default TimePickerHelpers;
