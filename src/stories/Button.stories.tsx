import Button from '@/components/Button';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled',
    disabled: true,
  },
};

export const ButtonWithAction: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
    onClick: () => alert('You clicked'),
  },
};
