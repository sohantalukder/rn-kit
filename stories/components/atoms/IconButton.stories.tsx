import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { IconButton } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/IconButton',
  component: IconButton,
  args: {
    icon: 'search',
    size: 'medium',
    accessibilityLabel: 'Search',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Icon button" description="Icon-only action with accessible labeling.">
      <IconButton {...args} onPress={() => {}} />
    </StoryFrame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <StoryFrame title="Sizes" description="Use sizes to fit toolbar and list action density.">
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <IconButton icon="search" size="small" accessibilityLabel="Small search" />
        <IconButton icon="notification" size="medium" accessibilityLabel="Notifications" />
        <IconButton icon="more" size="large" accessibilityLabel="More actions" />
      </View>
    </StoryFrame>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <StoryFrame title="Disabled state" description="Disabled icon actions lower interaction affordance.">
      <IconButton icon="delete" disabled accessibilityLabel="Delete" />
    </StoryFrame>
  ),
};
