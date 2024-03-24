import Modal from '@/components/Modal';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmation: Story = {
  args: {
    title: 'Delete Column',
    children: 'Are you sure you want to delete this?',
    isOpen: true,
    actions: [
      {
        text: 'No',
        variant: 'secondary',
        onClick: () =>
          alert(
            'Canceled! To close the modal, use isOpen prop from Story book Props control. In real time open/closing will be done by the referred Component.',
          ),
      },
      {
        text: 'Yes',
        variant: 'primary',
        onClick: () =>
          alert(
            'Deleted! To close the modal, use isOpen prop from Story book Props control. In real time open/closing will be done by the referred Component.',
          ),
      },
    ],
  },
};
