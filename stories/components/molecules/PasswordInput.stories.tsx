import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { PasswordInput } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/PasswordInput',
  component: PasswordInput,
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    required: true,
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Password input" description="Password field with visibility toggle.">
      <PasswordInput {...args} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('correct-horse');
    return (
      <StoryFrame title="Controlled password" description="Use controlled values in secure forms.">
        <PasswordInput label="Password" value={value} onChangeText={(text) => setValue(text)} />
      </StoryFrame>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <StoryFrame title="Error state" description="Validation copy appears below the field.">
      <PasswordInput
        label="Password"
        value="short"
        errorMessage="Password must be at least 8 characters."
      />
    </StoryFrame>
  ),
};
