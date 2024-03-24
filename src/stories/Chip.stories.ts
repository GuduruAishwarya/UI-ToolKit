import Chip from '@/components/Chip';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

function onClick() {}

export const AO_Chip: Story = {
  args: {
    chip: 'Chip',
    className: 'border-green-high-contrast bg-green-low-contrast text-green-high-contrast',
    icon: {
      onClick: onClick,
      iconProps: {name: 'check'},
    },
    onClick: onClick,
    mode: 'normal',
    styles: {
      chipStyles: '',
    },
  },
};

export const A1_Chip: Story = {
  args: {
    chip: 'Chip',
    className: 'border-yellow-high-contrast bg-yellow-low-contrast text-yellow-high-contrast',
    icon: {
      onClick: onClick,
      iconProps: {name: 'check'},
    },
    onClick: onClick,
    mode: 'normal',
    styles: {
      chipStyles: '',
    },
  },
};

export const A2_Chip: Story = {
  args: {
    chip: 'Chip',
    className: 'border-red-high-contrast bg-red-low-contrast text-red-high-contrast',
    icon: {
      onClick: onClick,
      iconProps: {name: 'check'},
    },
    onClick: onClick,
    mode: 'normal',
    styles: {
      chipStyles: '',
    },
  },
};

export const A3_Chip: Story = {
  args: {
    chip: 'Chip',
    className: '',
    icon: {
      onClick: onClick,
      iconProps: {name: 'check'},
    },
    onClick: onClick,
    mode: 'normal',
    styles: {
      chipStyles: '',
    },
  },
};
