import Text from '@/components/Text';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    placeholder: 'Version Name',
    label: '',
  },
};
export const InputwithLabel: Story = {
  args: {
    label: 'Version',
    placeholder: 'Version Name',
  },
};
export const ReadOnly: Story = {
  args: {
    value: 'Version 2023',
    readOnly: true,
    label: '',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Version',
    value: 'Version 2023',
    disabled: true,
  },
};

export const SubText: Story = {
  args: {
    label: 'Version',
    value: 'Version 2023',
    disabled: true,
    subtext: 'This one is disabled',
  },
};
