import MiniToggle from '@/components/MiniToggle';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/MiniToggle',
  component: MiniToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof MiniToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_MiniToggle: Story = {
  args: {
    checked: true,
    onChange: onChange,
    hintChecked: 'Enabled',
    hintUnchecked: 'Disabled',
    disabled: false,
    hintTextPosition: 'bottom',
    name: 'MiniToggle',
  },
};
