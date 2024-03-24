import {useState} from 'react';

import type {Meta, StoryObj} from '@storybook/react';
import {TimePickerModes} from '@/components/DateTime/helpers';
import TimePicker, {Time, TimePickerProps} from '@/components/DateTime/TimePicker';
import GlobalBaseComponentContextWrapper from '@/utils/index';
import GlobalComponent from '@/components/GlobalComponent';
import {Completeness} from '@/components/DateTime/types';

const TimePickerStory = ({
  label,
  value = {
    hour: '',
    min: '',
    timeMode: TimePickerModes.NONE,
  },
  required,
  completeness,
  requiresSequential,
  disableFuture,
  disablePast,
  is12HrMode,
}: TimePickerProps) => {
  const [time, setTime] = useState<Time>(value);
  const [timeZone, setTimeZone] = useState<string>('');
  return (
    <TimePicker
      value={time}
      label={label}
      required={required}
      timeZone={timeZone}
      onDone={(dt) => {
        setTime({
          hour: dt.hour,
          min: dt.min,
          timeMode: dt.timeMode,
        });
        setTimeZone(dt.timeZone);
      }}
      disableFuture={disableFuture}
      disablePast={disablePast}
      is12HrMode={is12HrMode}
      completeness={completeness}
      requiresSequential={requiresSequential}
    />
  );
};

const meta = {
  title: 'Toolkit/TimePicker',
  component: TimePickerStory,
  decorators: [
    (TimePickerStory) => (
        <div className='max-w-[500px] m-auto'>
            <GlobalBaseComponentContextWrapper>
                <TimePickerStory />
                <GlobalComponent />
            </GlobalBaseComponentContextWrapper>
        </div>
    ),
  ],
} satisfies Meta<typeof TimePickerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TimePickerRequiredCompleteness: Story = {
  args: {
    label: 'Time',
    required: true,
    timeZone: '',
  },
};

export const TimePartialSequential: Story = {
  args: {
    label: 'Time Partial',
    completeness: Completeness.Partial,
    timeZone: '',
  },
};

export const TimeNonSequential: Story = {
  args: {
    label: 'Time Partial Non Sequential',
    completeness: Completeness.Partial,
    requiresSequential: false,
    timeZone: '',
  },
};

export const TimeDisableFuture: Story = {
  args: {
    label: 'Time Future Disabled',
    disableFuture: true,
    timeZone: '',
  },
};

export const TimeDisablePast: Story = {
  args: {
    label: 'Time disabled Past',
    disablePast: true,
    timeZone: '',
  },
};

export const Time12HrMode: Story = {
  args: {
    label: 'Time 12 Hr Mode',
    timeZone: '',
    is12HrMode: true,
  },
};
