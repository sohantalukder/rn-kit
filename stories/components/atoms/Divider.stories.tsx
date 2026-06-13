import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Divider, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Divider',
  component: Divider,
  args: {
    width: '100%',
    height: 1,
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Divider" description="Simple visual separator.">
      <Text>Section one</Text>
      <Divider {...args} />
      <Text>Section two</Text>
    </StoryFrame>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <StoryFrame title="Custom divider" description="Use subtle color shifts for low-emphasis separators.">
      <View style={{ flexDirection: 'row', height: 80, gap: 16 }}>
        <Text>Left</Text>
        <Divider width={1} height="100%" color="#2563eb" />
        <Text>Right</Text>
      </View>
    </StoryFrame>
  ),
};
