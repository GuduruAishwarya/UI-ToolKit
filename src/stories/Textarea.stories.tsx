import TextArea from '@/components/TextArea';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Textarea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    rows: 3,
    placeholder: 'Text Area...',
  },
};
export const InputwithLabel: Story = {
  args: {
    rows: 3,
    placeholder: 'Text Area...',
    label: 'Description',
  },
};
export const ReadOnly: Story = {
  args: {
    rows: 3,
    label: 'Description',
    value: "I'm read only",
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    rows: 3,
    label: 'Description',
    value: "I'm disabled",
    disabled: true,
  },
};

export const SubText: Story = {
  args: {
    label: 'Version',
    rows: 4,
    value: 'Version 2023',
    disabled: true,
    subtext: 'This one is disabled',
  },
};
