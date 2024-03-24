import Loader from '@/components/Loader';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Loader',
  component: Loader,
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
