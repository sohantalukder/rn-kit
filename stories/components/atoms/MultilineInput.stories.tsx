import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { MultilineInput } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/MultilineInput',
  component: MultilineInput,
  args: {
    label: 'Notes',
    placeholder: 'Add a short note',
    numberOfLines: 5,
  },
} satisfies Meta<typeof MultilineInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Multiline input" description="Text area input for longer values.">
      <MultilineInput {...args} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('This request needs a follow-up.');
    return (
      <StoryFrame title="Controlled multiline input" description="Mirror form state through `value` and callbacks.">
        <MultilineInput label="Notes" value={value} onChangeText={(text) => setValue(text)} />
      </StoryFrame>
    );
  },
};

export const CustomHeight: Story = {
  render: () => (
    <StoryFrame title="Custom height" description="Set a stable height for predictable form layout.">
      <MultilineInput label="Description" height={220} />
    </StoryFrame>
  ),
};
