import Button from '@/components/Button';
import Card from '@/components/Card';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const samplecard: Story = {
  args: {
    className: 'card',
    children: (
      <div
        style={{
          minHeight: 200,
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
