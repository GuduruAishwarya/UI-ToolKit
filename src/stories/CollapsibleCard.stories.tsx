import Button from '@/components/Button';
import CollapsibleCard from '@/components/CollapsibleCard';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/CollapsibleCard',
  component: CollapsibleCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof CollapsibleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AO_CollapsibleCard: Story = {
  args: {
    title: 'Collapsible Card',
    className: 'border border-base-200 bg-red-500 rounded-lg py-6',
    titleStyles: 'px-6 pl-4 min-h-[40px] text-xl font-bold',
    children: (
      <div
        style={{
          minWidth: '100%',
          minHeight: 400,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '1em',
          textAlign: 'center',
        }}>
        Start adding Values
        <div>
          <Button variant="primary" onClick={() => alert('ADDED')}>
            Add
          </Button>
        </div>
      </div>
    ),
  },
};
