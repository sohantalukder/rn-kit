import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { Button, BottomSheet, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/BottomSheet',
  component: BottomSheet,
  args: {
    children: null,
    onRequestClose: () => {},
    visible: false,
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);
    return (
      <StoryFrame title="Bottom sheet" description="Open the sheet to preview modal content.">
        <Button text="Open sheet" onPress={() => setVisible(true)} />
        <BottomSheet visible={visible} onRequestClose={() => setVisible(false)}>
          <Text variant="heading3" weight="semibold">
            Payment method
          </Text>
          <Text color="secondary">Choose how you want to complete this action.</Text>
          <Button text="Done" onPress={() => setVisible(false)} />
        </BottomSheet>
      </StoryFrame>
    );
  },
};
