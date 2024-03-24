import {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useMemo} from 'react';
import ScrollSelector from '../../ScrollSelector';
import Select from '../../Select';
import Text from '../../Text';

import {HOURS_12, HOURS_24, MINUTES, TIME_MODES, TimePickerModes, timeZones} from '../../DateTime/helpers';
import {Time, TimePickerScroll} from '.';
import {twMerge} from 'tailwind-merge';

export type TimePickerScrollerProps = {
  setTimeZone: Dispatch<SetStateAction<string>>;
  setDisplayInputText: Dispatch<SetStateAction<Time>>;
  displayInputText: Time;
  is12HrMode?: boolean;
  timeZone: string;
  timeIndex: TimePickerScroll;
  setTimeIndex: Dispatch<SetStateAction<TimePickerScroll>>;
  className?: string;
};
const timeModesScroll = ['', ...TIME_MODES];
const minutesScroll = ['', ...MINUTES];
const TimePickerScroller = ({
  setTimeZone,
  setDisplayInputText,
  displayInputText,
  is12HrMode,
  timeZone,
  setTimeIndex,
  timeIndex,
  className,
}: TimePickerScrollerProps) => {
  const inputText = useMemo(() => {
    let displayText = (displayInputText?.hour || '') + (displayInputText?.min || '');
    if (is12HrMode && displayInputText.timeMode) {
      displayText += displayInputText.timeMode;
    }
    return displayText;
  }, [displayInputText, is12HrMode]);

  const hoursScroll = useMemo(() => (is12HrMode ? ['', ...HOURS_12] : ['', ...HOURS_24]), [is12HrMode]);

  //scroll the picker when
  // input text is manually changed
  useEffect(() => {
    const scrollHandler = () => {
      let hourIndex = 0,
        minIndex = 0,
        modeIndex = 0;
      const hour = displayInputText?.hour;
      const min = displayInputText?.min;
      const timeMode = displayInputText?.timeMode;
      if (hour) {
        const index = hoursScroll.findIndex((x) => x && Number(x) === Number(hour));
        if (index > -1) {
          hourIndex = index;
        }
      }

      if (min) {
        const index = minutesScroll.findIndex((x) => x === min.trim());
        if (index > -1) {
          minIndex = index;
        }
      }

      if (is12HrMode) {
        const index = timeModesScroll.findIndex((x) => x === (timeMode as string));
        if (index > 0) {
          modeIndex = index;
        }
      }
      setTimeIndex({min: minIndex, hour: hourIndex, timeMode: modeIndex});
    };

    scrollHandler();
  }, [displayInputText, hoursScroll, is12HrMode, setTimeIndex]);

  const handleTimeTextChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!value) {
        setDisplayInputText({
          hour: '',
          min: '',
          timeMode: TimePickerModes.NONE,
        });
        return;
      }

      const hourSplit = value.trim().split(':');
      const hour = hourSplit[0];

      const minSplit = hourSplit[1]?.split(' ');

      let min = minSplit?.[0] || '';
      if (min) {
        min = ':' + min;
      }

      const mode = minSplit?.[1];

      let timeMode = (mode?.toUpperCase() || TimePickerModes.NONE) as TimePickerModes;
      if (timeMode && !timeMode.startsWith(' ')) {
        timeMode = (' ' + timeMode) as TimePickerModes;
      }

      setDisplayInputText({hour, min, timeMode});
    },
    [setDisplayInputText],
  );

  const onpickerScroll = (name: string, selectedIndex: number) => {
    if (name === 'hour') {
      setDisplayInputText({
        ...displayInputText,
        [name]: hoursScroll[selectedIndex],
      });
    }
    if (name === 'min') {
      setDisplayInputText({
        ...displayInputText,
        [name]: minutesScroll[selectedIndex].trim(),
      });
    }
    if (name === 'timeMode') {
      setDisplayInputText({
        ...displayInputText,
        [name]: selectedIndex !== 0 ? (selectedIndex === 1 ? TimePickerModes.AM : TimePickerModes.PM) : TimePickerModes.NONE,
      });
    }
  };
  return (
    <div className={twMerge('rounded-[10px] flex flex-col gap-2.5 grow w-[calc(65%-2px)] ', className)}>
      <div className={'flex gap-4 p-2.5 bg-[#f3f4f6] rounded-tr-[10px] '}>
        <Text label="Time" value={inputText} onChange={handleTimeTextChange} className={'max-w-[45%]'} />
        <Select
          label="TimeZone"
          options={timeZones}
          displayText={timeZone}
          shouldDisplayText
          name="timeZone"
          className={'max-w-[45%]'}
          includeSearch
          textInputStyles={{input: 'max-w-[80%]'}}
          value={timeZone}
          onSelectChange={(option) => setTimeZone(option.option.value as string)}
          includeDeleteSelected
          title="Select Timezone"
          styles={{
            inputWrapper: 'bg-base-color',
            optionsWrapper: 'w-max max-w-[700px]',
          }}
        />
      </div>
      <div className={'relative flex bg-base-color gap-2.5 max-h-[400px] rounded-br-[10px] justify-center'}>
        <ScrollSelector
          scrollValues={hoursScroll}
          selectedIndex={timeIndex.hour}
          onFocus={onpickerScroll}
          name="hour"
          className={'min-w-[50px] max-h-[350px] scroll'}
          selectorStyles={'min-w-[calc(100%-2em)]'}
        />
        <ScrollSelector
          scrollValues={minutesScroll}
          selectedIndex={timeIndex.min}
          onFocus={onpickerScroll}
          name="min"
          className={'min-w-[50px] max-h-[350px]'}
          selectorStyles={'min-w-[calc(100%-2em)]'}
        />
        {is12HrMode && (
          <ScrollSelector
            scrollValues={timeModesScroll}
            selectedIndex={timeIndex.timeMode}
            name="timeMode"
            onFocus={onpickerScroll}
            className={'min-w-[50px] max-h-[350px]'}
            selectorStyles={'min-w-[calc(100%-2em)]'}
          />
        )}
      </div>
    </div>
  );
};

export default TimePickerScroller;
