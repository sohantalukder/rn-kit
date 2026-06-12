import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Button } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Button',
  component: Button,
  args: {
    text: 'Continue',
    variant: 'primary',
    disabled: false,
    isLoading: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'error', 'disable'],
    },
    iconPosition: { control: 'inline-radio', options: ['left', 'right'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Install with `npm install @sohantalukder/rn-kit`. Use Button for primary and secondary actions. Keep labels short, provide loading state for submitted async actions, and avoid multiple primary buttons in one decision area.',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Default button" description="A primary action using the default theme tokens.">
      <Button {...args} onPress={() => {}} />
    </StoryFrame>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryFrame title="Variants" description="Primary, secondary, outline, error, and disabled visual styles.">
      <View style={{ gap: 12 }}>
        {(['primary', 'secondary', 'outline', 'error', 'disable'] as const).map((variant) => (
          <Button key={variant} text={variant} variant={variant} onPress={() => {}} />
        ))}
      </View>
    </StoryFrame>
  ),
};

export const LoadingState: Story = {
  render: () => (
    <StoryFrame title="Loading state" description="Use loading state while an action is in progress.">
      <Button text="Saving" isLoading onPress={() => {}} />
    </StoryFrame>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <StoryFrame title="With icon" description="Icons can appear on either side of the label.">
      <Button text="Send" icon="send" iconPosition="right" onPress={() => {}} />
    </StoryFrame>
  ),
};
