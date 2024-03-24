import ClipboardCopy from '@/components/ClipboardCopy';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/ClipboardCopy',
  component: ClipboardCopy,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ClipboardCopy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AO_ClipboardCopy: Story = {
  args: {
    copyText: 'Clipboard',
    className: 'h-[100px] w-[100px]',
  },
};
