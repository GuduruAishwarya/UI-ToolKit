import Icon from '@/components/Icon';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const icon: Story = {
  args: {
    name: 'check',
  },
};
