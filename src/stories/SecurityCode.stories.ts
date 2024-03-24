import ButtonGroup from '@/components/ButtonGroup';
import SecurityCode from '@/components/SecurityCode';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/SecurityCode',
  component: SecurityCode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SecurityCode>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange(otpCode: string, event?: React.ChangeEvent) {}

export const AO_SecurityCode: Story = {
  args: {
    errorMessage: '',
    onChange: onChange,
    styles: {
      input: '',
      wrapper: '',
    },
  },
};
