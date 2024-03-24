import {useMemo} from 'react';
import Button from '../../Button';
import {Time} from '.';
import {FooterProps} from '../types';

export type TimePickerFooterProps = {
  timeZone: string;
  displayTime: Time;
  is12HrMode: boolean;
} & FooterProps;

const TimePickerFooter = ({timeZone, displayTime, is12HrMode, onDone, onCancel, onClear}: TimePickerFooterProps) => {
  const timeDisplay = useMemo(() => {
    let hour = displayTime.hour.replace(':', '')?.trim() || '';
    let min = displayTime.min || '';
    let mode = (displayTime.timeMode as string)?.trim() || '';
    if (is12HrMode) {
      if (Number(hour) < 1 || Number(hour) > 12 || isNaN(Number(hour))) {
        hour = '';
      }
    }

    if (mode !== 'AM' && mode !== 'PM') {
      mode = '';
    }

    if (Number(min) < 0 && Number(min) > 59 && isNaN(Number(min))) {
      min = '';
    }
    return `${hour}${min} ${mode} ${timeZone}`;
  }, [displayTime, timeZone, is12HrMode]);

  return (
    <div className={'px-0 py-2 bg-primary rounded-b-[10px]'}>
      <div className={'flex justify-between items-center'}>
        <div className={'flex text-base-color grow'}>{timeDisplay}</div>
        <div className={'flex gap-2'}>
          <Button variant="primary" className={'min-w-[unset]'} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" className={'min-w-[unset]'} onClick={onClear}>
            Clear
          </Button>
          <Button variant="primary" className={'min-w-[unset]'} onClick={onDone}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerFooter;
