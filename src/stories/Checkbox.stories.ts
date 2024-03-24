import Checkbox from '@/components/Checkbox';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_Checkbox: Story = {
  args: {
    name: 'Checkbox',
    label: 'Checkbox',
    checked: true,
    onChange: onChange,
    className: '',
  },
};
