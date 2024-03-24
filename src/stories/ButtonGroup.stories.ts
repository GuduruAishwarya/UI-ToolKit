import ButtonGroup from '@/components/ButtonGroup';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_ButtonGroup: Story = {
  args: {
    name: 'ButtonGroup',
    options: [
      {
        label: 'Confirmed',
        value: 'Confirmed',
      },
      {
        label: 'Unconfirmed',
        value: 'Unconfirmed',
      },
      {
        label: 'Unknown',
        value: 'Unknown',
      },
    ],
    selected: 'Confirmed',
    onChange: onChange,
    disabled: false,
    className: '',
    wrapperClassName: 'string',
  },
};
