import Tabs from '@/components/Tabs';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_Tabs: Story = {
  args: {
    tabs: [
      {
        text: 'Account Details',
        icon: {name: 'user'},
        content: <div>Account Details</div>,
        identifier: 'accountDetails',
        tabProps: {
          variant: 'none',
          className: '',
          disabled: false,
        },
      },
      {
        text: 'Sessions',
        icon: {
          name: 'timer',
        },
        content: <div>Sessions</div>,
        identifier: 'sessions',
        tabProps: {
          variant: 'none',
          className: '',
          disabled: false,
        },
      },
      {
        text: 'Connections',
        icon: {
          name: 'user-connections',
        },
        content: <div>Connections</div>,
        identifier: 'connections',
        tabProps: {
          variant: 'none',
          className: '',
          disabled: true,
        },
      },
      {
        text: 'Account Settings',
        icon: {
          name: 'account-settings',
        },
        content: <div>Account Settings</div>,
        identifier: 'accountSettings',
        tabProps: {
          variant: 'none',
          className: '',
          disabled: false,
        },
      },
    ],
    activeTab: 'accountDetails',
    styles: {
      container: 'gap-6 bg-base-100 text-center max-h-[calc(100%-218px)] ',
      tabsWrapper: 'justify-start border-none bg-base-color px-10 pt-4 h-14',
      selectedStyles: 'fill-primary',
    },
  },
};
