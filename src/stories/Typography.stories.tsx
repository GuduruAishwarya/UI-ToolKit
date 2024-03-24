import Typography from '@/components/Typography';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Typography',
  component: Typography,
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "I'm Default",
  },
};

export const Subtext: Story = {
  args: {
    variant: 'subtext',
    children: "I'm a subtext",
  },
};

export const Bold: Story = {
  args: {
    mode: 'bold',
    children: "I'm a Bold Text",
  },
};

export const Bolder: Story = {
  args: {
    mode: 'bolder',
    children: "I'm a bolder text",
  },
};
