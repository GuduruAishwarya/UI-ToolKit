import type {Meta, StoryObj} from '@storybook/react';
import GlobalComponent from '@/components/GlobalComponent';
import GlobalBaseComponentContextWrapper from '@/utils/index';
import Tooltip from '@/components/Tooltip';
import Text from '@/components/Text';
import Typography from '@/components/Typography';

const meta = {
  title: 'Toolkit/Tooltip',
  component: Tooltip,
  decorators: [
    (Tooltip) => (
      <GlobalBaseComponentContextWrapper>
        <div style={{maxWidth: 600}}>
          <Tooltip />
        </div>
        <GlobalComponent />
      </GlobalBaseComponentContextWrapper>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextTooltip: Story = {
  args: {
    children: <Text value={'Hover Over me'} readOnly label={'Tooltip Example'} />,
    content: <Typography>You hovered over me!!!</Typography>,
    toLeft: true,
  },
};
