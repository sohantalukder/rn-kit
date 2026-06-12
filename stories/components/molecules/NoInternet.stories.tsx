import type { Meta, StoryObj } from '@storybook/nextjs';
import { NoInternet } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/NoInternet',
  component: NoInternet,
  args: {
    text: 'No internet connection',
    description: 'Please check your connection and try again.',
    animated: true,
  },
} satisfies Meta<typeof NoInternet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame
      title="No internet"
      description="Network failure state with retry action."
      width={460}
      bestPractices={['Provide a retry path.', 'Keep offline copy clear and blame-free.']}
    >
      <NoInternet {...args} onRetry={() => {}} containerStyle={{ minHeight: 420 }} />
    </StoryFrame>
  ),
};

export const StaticState: Story = {
  render: () => (
    <StoryFrame title="Static state" description="Disable animation where motion should be reduced." width={460}>
      <NoInternet animated={false} onRetry={() => {}} containerStyle={{ minHeight: 420 }} />
    </StoryFrame>
  ),
};

export const CustomCopy: Story = {
  render: () => (
    <StoryFrame title="Custom copy" description="Adjust message tone to the product context." width={460}>
      <NoInternet
        text="Connection lost"
        description="We will keep this screen ready while you reconnect."
        animated={false}
        onRetry={() => {}}
        containerStyle={{ minHeight: 420 }}
      />
    </StoryFrame>
  ),
};
