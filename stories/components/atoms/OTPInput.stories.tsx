import type { Meta, StoryObj } from '@storybook/nextjs';
import { OTPInput } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/OTPInput',
  component: OTPInput,
  args: {
    length: 6,
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="OTP input" description="Configurable one-time password entry.">
      <OTPInput {...args} callback={() => {}} />
    </StoryFrame>
  ),
};

export const FourDigits: Story = {
  render: () => (
    <StoryFrame title="Four digits" description="Match the backend verification code length.">
      <OTPInput length={4} callback={() => {}} />
    </StoryFrame>
  ),
};
