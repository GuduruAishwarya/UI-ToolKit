import GlobalComponent from '@/components/GlobalComponent';
import Grid from '@/components/Grid';
import Icon from '@/components/Icon';
import Typography from '@/components/Typography';
import GlobalBaseComponentContextWrapper from '@/utils/index';
import type {Meta, StoryObj} from '@storybook/react';

const meta = {
  title: 'Toolkit/Grid',
  component: Grid,
  decorators: [
    (Grid) => (
      <GlobalBaseComponentContextWrapper>
        <Grid />
        <GlobalComponent />
      </GlobalBaseComponentContextWrapper>
    ),
  ],

  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AO_Grid: Story = {
  args: {
    rows: [
      {
        _id: 1,
        guid: 1,
      },
      {
        _id: 2,
        guid: 2,
      },
    ],
    columns: [
      {
        identifier: undefined,
        fieldStyles: '',
        header: 'Name',
        width: 400,
        grow: true,
        renderCell: () => {
          return <Typography mode="bold">Ram</Typography>;
        },
      },
      {
        identifier: undefined,
        fieldStyles: '',
        header: 'Role',
        width: 400,
        grow: true,
        renderCell: () => {
          return <Typography mode="bold">UI developer</Typography>;
        },
      },
    ],
    isDraggable: false,
    onDragOver: () => {},
    onDragStart: () => {},
    onDrop: () => {},
    onDragLeave: () => {},
    onSearch: () => {},
    toolBarProps: <></>,
    className: '',
    title: '',
    collapsible: false,
    styles: {
      searchContainer: '',
      rowStyles: '',
      headerStyles: '',
    },
    pagination: {
      pageNumber: 0,
      paginationRows: [1, 2, 3],
      shouldPaginate: true,
      totalRows: 3,
      onPageChange: () => {},
      mode: undefined,
    },
    onRowClick: () => {
      alert('Row Clicked');
    },
  },
};
