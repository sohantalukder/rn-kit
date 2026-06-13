import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { Slider, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Slider',
  component: Slider,
  args: {
    min: 0,
    max: 100,
    initialValue: 40,
    onValueChange: () => {},
    width: 300,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Slider" description="Gesture-driven numeric range input.">
      <Slider {...args} onValueChange={() => {}} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(60);
    return (
      <StoryFrame title="Controlled slider" description="Show the current value near the control.">
        <Text weight="semibold">Value: {value}</Text>
        <Slider min={0} max={100} value={value} onValueChange={setValue} />
      </StoryFrame>
    );
  },
};
