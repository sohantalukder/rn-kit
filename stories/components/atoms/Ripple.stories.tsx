import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Ripple, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Ripple',
  component: Ripple,
  args: {
    children: <View />,
    rippleColor: '#2563eb',
    disabled: false,
  },
} satisfies Meta<typeof Ripple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Ripple" description="Pressable wrapper with touch feedback.">
      <Ripple {...args} onPress={() => {}} borderRadius={8}>
        <View style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 16 }}>
          <Text weight="semibold">Pressable content</Text>
        </View>
      </Ripple>
    </StoryFrame>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <StoryFrame title="Disabled ripple" description="Disabled ripple prevents press handling.">
      <Ripple disabled borderRadius={8}>
        <View style={{ backgroundColor: '#e2e8f0', borderRadius: 8, padding: 16 }}>
          <Text color="disabled">Disabled content</Text>
        </View>
      </Ripple>
    </StoryFrame>
  ),
};
