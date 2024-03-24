import GlobalComponent from '@/components/GlobalComponent';
import PhoneNumber from '@/components/PhoneNumberComponent';
import GlobalBaseComponentContextWrapper from '@/utils/index';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/PhoneNumber',
  component: PhoneNumber,
  decorators: [
    (Select) => (
      <GlobalBaseComponentContextWrapper>
        <Select />
        <GlobalComponent />
      </GlobalBaseComponentContextWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PhoneNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_PhoneNumber: Story = {
  args: {
    label: 'PhoneNumber:',
    onChangeSelect: onChange,
    onChangeInput: onChange,
    required: true,
    error: '',
    setError: onChange,
    telephoneOptions: [
      {
        countryName: 'India',
        countryCode: 'in',
        dialCode: '91',
        patterns: ['####-######'],
        maxPhoneLength: 10,
      },
    ],
    className: '',
    defaultValues: {
      country: 'United States',
      dialCode: '1',
      phoneNumber: '9999999999',
      pattern: '####-######',
    },
    toolTip: 'Enter phone number',
  },
};
