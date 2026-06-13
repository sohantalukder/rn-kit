import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Badge } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Badge',
  component: Badge,
  args: {
    text: 'Active',
    size: 'medium',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Badge" description="Short label or status pill.">
      <Badge {...args} onPress={() => {}} />
    </StoryFrame>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryFrame title="Badge variants" description="Use size and fill to match context.">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
        <Badge text="Small" size="small" />
        <Badge text="Medium" size="medium" />
        <Badge text="Large" size="large" />
        <Badge text="Filled" bgColor="#2563eb" />
        <Badge text="Disabled" disabled />
      </View>
    </StoryFrame>
  ),
};
