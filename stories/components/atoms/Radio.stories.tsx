import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Radio, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Radio',
  component: Radio,
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Radio" description="Mutually exclusive option control.">
      <Radio {...args} onChange={() => {}} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState('standard');
    return (
      <StoryFrame title="Radio group" description="Use one selected value per option set.">
        {['standard', 'express'].map((item) => (
          <View key={item} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Radio checked={selected === item} onChange={() => setSelected(item)} />
            <Text>{item}</Text>
          </View>
        ))}
      </StoryFrame>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <StoryFrame title="Disabled radio" description="Disabled options are visible but unavailable.">
      <Radio checked disabled />
    </StoryFrame>
  ),
};
