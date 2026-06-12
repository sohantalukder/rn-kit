import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { TextInput } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/TextInput',
  component: TextInput,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    required: true,
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Text input" description="Labeled single-line input with validation support.">
      <TextInput {...args} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('hello@rnkit.dev');
    return (
      <StoryFrame title="Controlled input" description="Use controlled state in forms.">
        <TextInput label="Email" value={value} onChangeText={(text) => setValue(text)} />
      </StoryFrame>
    );
  },
};

export const ErrorState: Story = {
  render: () => (
    <StoryFrame title="Error state" description="Show validation copy close to the field.">
      <TextInput label="Email" value="not-an-email" errorMessage="Enter a valid email address." />
    </StoryFrame>
  ),
};

export const DisabledState: Story = {
  render: () => (
    <StoryFrame title="Disabled input" description="Disabled fields communicate unavailable data entry.">
      <TextInput label="Reference" value="RN-1024" disabled />
    </StoryFrame>
  ),
};
