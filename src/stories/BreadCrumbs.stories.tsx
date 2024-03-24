import BreadCrumbs, {BreadCrumbType} from '@/components/BreadCrumbs';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/BreadCrumbs',
  component: BreadCrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof BreadCrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_BreadCrumbs: Story = {
  args: {
    separator: '/',
    breadCrumbs: [
      {
        title: 'Personal',
        url: '/settings',
      },
      {
        title: 'My Connections',
        url: '/settings/my-connections',
      },
      {
        title: 'Add Company',
        url: '/settings/my-connections/add-company',
      },
    ],
    setBreadCrumbs: onChange,
    className: '',
  },
};
