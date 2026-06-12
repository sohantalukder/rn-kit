import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Toast } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Toast',
  component: Toast,
  args: {
    type: 'success',
    title: 'Profile saved',
  },
  argTypes: {
    type: { control: 'inline-radio', options: ['success', 'info', 'error'] },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Toast" description="Transient feedback message.">
      <View style={{ width: 360 }}>
        <Toast {...args} onDismiss={() => {}} />
      </View>
    </StoryFrame>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryFrame title="Toast variants" description="Use the smallest message that explains the result.">
      <View style={{ gap: 10, width: 360 }}>
        <Toast type="success" title="Transfer complete" />
        <Toast type="info" title="New version available" />
        <Toast type="error" title="Payment failed" />
      </View>
    </StoryFrame>
  ),
};
