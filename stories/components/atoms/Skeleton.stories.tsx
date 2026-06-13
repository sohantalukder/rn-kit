import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Skeleton } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Skeleton',
  component: Skeleton,
  args: {
    width: 240,
    height: 18,
    borderRadius: 8,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Skeleton" description="Placeholder shape for loading layouts.">
      <Skeleton {...args} />
    </StoryFrame>
  ),
};

export const CardLoading: Story = {
  render: () => (
    <StoryFrame title="Card loading" description="Match skeletons to the final content layout.">
      <View style={{ gap: 12 }}>
        <Skeleton width={64} height={64} borderRadius={32} />
        <Skeleton width="90%" height={18} />
        <Skeleton width="70%" height={18} />
      </View>
    </StoryFrame>
  ),
};
