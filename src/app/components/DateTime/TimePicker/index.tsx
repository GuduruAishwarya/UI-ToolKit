import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Card from '@/components/Card';
import Icon from '@/components/Icon';
import PopOver from '@/components/PopOver';
import Tooltip from '@/components/Tooltip';

import {
  generateTimeIndexForPicker,
  getDisplayInputTimeText,
  getTimeDisplayText,
  getTimeErrorMessage,
  isTimeFutureTime,
  isTimePastTime,
  isTimeValid,
  TimePickerModes,
} from '@/components/DateTime/helpers';
import Suggestions from '@/components/Suggestions';

import TimePickerScroller from './TimePickerScroller';
import TimePickerFooter from './TimePickerFooter';
import TimePickerHelpers from './TimePickerHelper';
import {Completeness, DateTimeCommonProps, DateType, SuggestionTips} from '../types';
import {twMerge} from 'tailwind-merge';
import Text from '@/components/Text';
import Typography from '@/components/Typography';

export type TimePickerProps = {
  value?: Time;
  is12HrMode?: boolean;
  onDone: (time: TimeWithZone, error: string, name?: string) => void;
  timeZone: string;
  name?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  relativeDate?: DateType;
} & DateTimeCommonProps;

export type Time = {
  hour: string;
  min: string;
  timeMode: TimePickerModes;
};

export type TimeWithZone = {
  timeZone: string;
} & Time;

export type TimePickerScroll = {
  hour: number;
  min: number;
  timeMode: number;
};

const fullEntries: SuggestionTips = {
  allowed: ['04:32 PM EST'],
  notAllowed: ['04:32 PM', 'EST'],
};

const partialEntries: SuggestionTips = {
  allowed: ['04:32 PM EST', '04:32 PM'],
  notAllowed: ['EST'],
};

const TimePicker = ({
  is12HrMode = false,
  value = {timeMode: TimePickerModes.NONE, hour: '', min: ''},
  errorMessage: timeError,
  label,
  onDone,
  completeness = Completeness.Full,
  requiresSequential = true,
  name,
  required,
  timeZone: zone,
  disableFuture,
  disablePast,
  placeholder,
}: TimePickerProps) => {
  const [timeIndex, setTimeIndex] = useState<TimePickerScroll>(generateTimeIndexForPicker(value, is12HrMode));

  useEffect(() => {
    const displayText = getTimeDisplayText(value, is12HrMode, timeZone);
    setTimeDisplayText(displayText);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const [openPicker, setOpenPicker] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [timeZone, setTimeZone] = useState<string>(zone);
  const [errorMessage, setErrorMessage] = useState(timeError);
  const [timeDisplayText, setTimeDisplayText] = useState<string>('');

  const tooltipContent = useMemo(() => {
    return (
      <Suggestions
        completeness={completeness}
        requiresSequential={requiresSequential}
        suggestions={completeness === Completeness.Full ? fullEntries : partialEntries}
      />
    );
  }, [completeness, requiresSequential]);

  const [displayInputText, setDisplayInputText] = useState<Time>(getDisplayInputTimeText(value, is12HrMode));

  const handleInputClick = () => {
    setOpenPicker(true);
    setIsFocus(true);
  };

  const handleDone = useCallback(() => {
    setOpenPicker(false);
    setIsFocus(false);

    const hour = displayInputText.hour;
    const min = displayInputText.min;
    const timeMode = displayInputText.timeMode;

    const selectedTime = {hour, min, timeMode: timeMode};

    let errMsg = getTimeErrorMessage(selectedTime, is12HrMode, completeness, timeZone, requiresSequential, label, required || false);
    const displayText = getTimeDisplayText(selectedTime, is12HrMode, timeZone);
    if (!errMsg) {
      const isValidTime = isTimeValid(selectedTime, is12HrMode);
      if (!isValidTime) {
        errMsg = 'Invalid Time';
      }
    }
    if (!errMsg && (disableFuture || disablePast)) {
      if (selectedTime.hour && selectedTime.min) {
        if (disablePast) {
          const isValid = isTimeFutureTime(selectedTime, is12HrMode);
          if (!isValid) {
            errMsg = 'Time Selected must be a Future Time';
          }
        }

        if (disableFuture) {
          const isValid = isTimePastTime(selectedTime, is12HrMode);
          if (!isValid) {
            errMsg = 'Time Selected should be a Past Time';
          }
        }
      }
    }
    setErrorMessage(errMsg);
    setTimeDisplayText(displayText);
    onDone(
      {
        hour,
        min,
        timeMode: timeMode,
        timeZone,
      },
      errMsg,
      name,
    );
  }, [completeness, disableFuture, disablePast, displayInputText, is12HrMode, label, name, onDone, required, requiresSequential, timeZone]);

  const handleCancel = useCallback(() => {
    setOpenPicker(false);
    setIsFocus(false);
    setDisplayInputText({
      hour: '',
      min: '',
      timeMode: TimePickerModes.NONE,
    });
  }, [value]);

  const handleClear = useCallback(() => {
    setDisplayInputText({
      hour: '',
      min: '',
      timeMode: TimePickerModes.NONE,
    });
    setTimeZone('');
  }, []);

  return (
    <>
      <div className={'flex flex-col gap-2.5'}>
        {label && <Typography mode="bolder">{`${label}${required ? '*' : ''}`}</Typography>}
        <div>
          <Tooltip content={tooltipContent} >
            <div
              className={twMerge(
                'flex items-center border border-base-700 bg-base-color rounded-md justify-center w-max',
                isFocus && 'outline-2 outline-base-300',
                errorMessage && 'border-red-bright outline-red-bright',
              )}
              ref={ref}>
              <Text
                className={twMerge(
                  'flex items-center border-none bg-base-color rounded-md justify-center',
                  errorMessage && 'text-red-bright',
                )}
                onClick={handleInputClick}
                readOnly
                placeholder={placeholder}
                value={timeDisplayText}
                styles={{
                  inputWrapper: 'border-none',
                }}
              />

              <div className={'px-0 py-2.5 '}>
                <Icon name={errorMessage ? 'exclamation-circle' : 'check'} />
              </div>
            </div>
            {errorMessage && <Typography className={'text-red-bright'}>{errorMessage}</Typography>}
          </Tooltip>
        </div>
      </div>

      <PopOver isPopOverOpen={openPicker} shouldCloseOnOutsideClick={false} atElement={ref} moveLeftBy={20}>
        <Card className={'flex flex-col p-0 bg-[#f3f4f6] rounded-[10px] overflow-visible w-[500px]'}>
          <div className={'flex gap-0.5'}>
            <TimePickerHelpers timePickersIndex={timeIndex} is12HrMode={is12HrMode} setDisplayInputText={setDisplayInputText} />

            <TimePickerScroller
              setTimeZone={setTimeZone}
              setDisplayInputText={setDisplayInputText}
              displayInputText={displayInputText}
              timeZone={timeZone}
              timeIndex={timeIndex}
              setTimeIndex={setTimeIndex}
              is12HrMode={is12HrMode}
            />
          </div>

          <TimePickerFooter
            displayTime={displayInputText}
            timeZone={timeZone || ''}
            is12HrMode={is12HrMode}
            onDone={handleDone}
            onCancel={handleCancel}
            onClear={handleClear}
          />
        </Card>
      </PopOver>
    </>
  );
};

export default TimePicker;
