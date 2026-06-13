import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Loader, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Loader',
  component: Loader,
  args: {
    color: '#2563eb',
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Loader" description="Inline progress indicator for busy states.">
      <View style={{ alignItems: 'center', gap: 12 }}>
        <Loader {...args} />
        <Text color="secondary">Loading account data</Text>
      </View>
    </StoryFrame>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <StoryFrame title="Custom color" description="Match loader color to the surrounding action.">
      <Loader color="#0f766e" />
    </StoryFrame>
  ),
};
