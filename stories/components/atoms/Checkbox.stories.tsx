import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Checkbox',
  component: Checkbox,
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Checkbox" description="Independent binary selection.">
      <Checkbox {...args} onPress={() => {}} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <StoryFrame title="Controlled checkbox" description="Track selected state in the parent form.">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Checkbox checked={checked} onPress={() => setChecked((value) => !value)} />
          <Text>Remember this device</Text>
        </View>
      </StoryFrame>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <StoryFrame title="Disabled checkbox" description="Disabled state preserves the current value.">
      <Checkbox checked disabled />
    </StoryFrame>
  ),
};
