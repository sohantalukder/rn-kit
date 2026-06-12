import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Switch, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Switch',
  component: Switch,
  args: {
    value: false,
    name: 'notifications',
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Switch" description="Immediate on/off setting control.">
      <Switch {...args} onPress={() => {}} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true);
    return (
      <StoryFrame title="Controlled switch" description="Mirror app setting state through the parent.">
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Switch value={enabled} onPress={(next) => setEnabled(next)} />
          <Text>{enabled ? 'Notifications enabled' : 'Notifications disabled'}</Text>
        </View>
      </StoryFrame>
    );
  },
};
