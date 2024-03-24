import GlobalComponent from '@/components/GlobalComponent';
import Select from '@/components/Select';
import GlobalBaseComponentContextWrapper from '@/utils/index';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Select',
  component: Select,
  decorators: [
    (Select) => (
      <GlobalBaseComponentContextWrapper>
        <Select />
        <GlobalComponent />
      </GlobalBaseComponentContextWrapper>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleSelect: Story = {
  args: {
    label: 'Unique Values',
    name: 'uniqueValues',
    styles: {inputWrapper: 'select'},
    options: [
      {label: 'Code', value: '1'},
      {label: 'Name', value: '2'},
      {label: 'Chained Code', value: '3'},
    ],
  },
};

export const SearchableSelect: Story = {
  args: {
    label: 'Time Zone',
    name: 'time zoned',
    required: true,
    styles: {inputWrapper: 'select', searchTextContainer: 'grow'},
    includeSearch: true,
    title: 'Select Timezone',
    options: [
      {label: 'GMT Greenwich', value: 'GMT'},
      {label: 'IST Indian', value: 'IST'},
      {label: 'PST Pacific', value: 'PST'},
      {label: 'CST Canada', value: 'CST'},
    ],
  },
};

export const DeleteSelected: Story = {
  args: {
    label: 'Time Zone',
    name: 'time zoned',
    required: true,
    styles: {inputWrapper: 'select', searchTextContainer: 'grow'},
    includeSearch: true,
    title: 'Select Timezone',
    includeDeleteSelected: true,
    options: [
      {label: 'GMT Greenwich', value: 'GMT'},
      {label: 'IST Indian', value: 'IST'},
      {label: 'PST Pacific', value: 'PST'},
      {label: 'CST Canada', value: 'CST'},
    ],
  },
};
