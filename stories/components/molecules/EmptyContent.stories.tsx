import type { Meta, StoryObj } from '@storybook/nextjs';
import { EmptyContent } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/EmptyContent',
  component: EmptyContent,
  args: {
    title: 'No results',
    description: 'Try adjusting filters or searching for another keyword.',
  },
} satisfies Meta<typeof EmptyContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Empty content" description="Reusable empty state with icon and explanatory copy.">
      <EmptyContent {...args} style={{ minHeight: 220 }} />
    </StoryFrame>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <StoryFrame title="Loading empty state" description="Use loading when the empty state is not final yet.">
      <EmptyContent isLoading style={{ minHeight: 160 }} />
    </StoryFrame>
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <StoryFrame title="Custom icon" description="Choose an icon that names the problem clearly.">
      <EmptyContent
        icon="search"
        title="Nothing matched"
        description="Try a broader search term."
        style={{ minHeight: 220 }}
      />
    </StoryFrame>
  ),
};
