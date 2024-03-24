import GlobalComponent from '@/components/GlobalComponent';
import PopOver from '@/components/PopOver';
import Typography from '@/components/Typography';
import GlobalBaseComponentContextWrapper from '@/utils/index';
import type {Meta, StoryObj} from '@storybook/react';
import {useCallback, useRef, useState} from 'react';

const PopoverWrapper = (props: any = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showPopover, setShowPopover] = useState(false);
  const onPopoverClose = useCallback(() => {
    setShowPopover(false);
  }, []);
  return (
    <div ref={ref} className="h-60 w-60 text-base-700">
      <button onClick={() => setShowPopover(!showPopover)}>click me to open popover</button>
      <PopOver {...props} atElement={ref} isPopOverOpen={showPopover} onClose={onPopoverClose}>
        <Typography variant="h1" mode="bolder" className="border-2 border-base-200 rounded h-full w-20">
          I am popover
        </Typography>
      </PopOver>
    </div>
  );
};

const meta = {
  title: 'Toolkit/PopOver',
  component: PopoverWrapper,
  tags: ['autodocs'],
  argTypes: {},
  decorators: [
    (PopoverWrapper) => (
      <GlobalBaseComponentContextWrapper>
        <GlobalComponent />
        <PopoverWrapper />
      </GlobalBaseComponentContextWrapper>
    ),
  ],
} satisfies Meta<typeof PopOver>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Popover: Story = {
  args: {
    // isPopOverOpen: true,
    // children: <h1>this is popover</h1>,
  } as any,
};
