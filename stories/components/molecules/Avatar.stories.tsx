import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Avatar } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const imageUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80';

const meta = {
  title: 'Components/Molecules/Avatar',
  component: Avatar,
  args: {
    imageUrl,
    height: 72,
    width: 72,
    borderRadius: 36,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Avatar" description="Profile image wrapper with fallback icon.">
      <Avatar {...args} />
    </StoryFrame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryFrame title="Avatar sizes" description="Use consistent square dimensions.">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Avatar imageUrl={imageUrl} height={40} width={40} borderRadius={20} />
        <Avatar imageUrl={imageUrl} height={64} width={64} borderRadius={32} />
        <Avatar imageUrl={imageUrl} height={92} width={92} borderRadius={46} />
      </View>
    </StoryFrame>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <StoryFrame title="Placeholder avatar" description="Invalid URLs fall back to the profile icon.">
      <Avatar imageUrl="" height={72} width={72} borderRadius={36} />
    </StoryFrame>
  ),
};
