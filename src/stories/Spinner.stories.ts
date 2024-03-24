import Spinner from '@/components/Spinner';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_Spinner: Story = {
  args: {
    className: '',
    spinnerStyles: '',
    variant: 'large',
    loaderText: 'Spinner',
  },
};
