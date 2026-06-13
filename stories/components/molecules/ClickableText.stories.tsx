import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { ClickableText, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/ClickableText',
  component: ClickableText,
  args: {
    children: 'Forgot password?',
    textColor: 'primary',
  },
  argTypes: {
    textColor: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'error'] },
  },
} satisfies Meta<typeof ClickableText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Clickable text" description="Small text action for secondary flows.">
      <ClickableText {...args} onPress={() => {}} />
    </StoryFrame>
  ),
};

export const InlineUsage: Story = {
  render: () => (
    <StoryFrame title="Inline usage" description="Pair with surrounding text when the action is low emphasis.">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
        <Text color="secondary">Already have an account?</Text>
        <ClickableText textColor="primary" onPress={() => {}}>
          Sign in
        </ClickableText>
      </View>
    </StoryFrame>
  ),
};
