import EditableCard from '@/components/EditableCard';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/EditableCard',
  component: EditableCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EditableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

function onChange() {}

export const AO_EditableCard: Story = {
  args: {
    isCardEditable: true,
    saveText: 'Save',
    cancelText: 'Cancel',
    cardHeader: (
      <div
        style={{
          fontWeight: 'bold',
        }}>
        Card Header{' '}
      </div>
    ),
    cardEditableBody: 'Card Editable Content',
    toggleText: 'Change',
    DisableSave: false,
    saveHandler: onChange,
    cancelHandler: onChange,
    name: 'Editable Card',
    children: (
      <div
        style={{
          padding: '0px 10px 0px 0px ',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        Card Content{' '}
      </div>
    ),
  },
};
