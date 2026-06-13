import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { Button, SlideModal, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Organisms/SlideModal',
  component: SlideModal,
  args: {
    children: null,
  },
} satisfies Meta<typeof SlideModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const modalRef = useRef<{
      closeModal: () => void;
      openModal: () => void;
      isVisible: boolean;
    }>(null);
    return (
      <StoryFrame title="Slide modal" description="Use the exposed ref methods to open and close composed modal flows.">
        <Button text="Open modal" onPress={() => modalRef.current?.openModal()} />
        <SlideModal ref={modalRef}>
          <View style={{ gap: 14, padding: 24 }}>
            <Text variant="heading3" weight="semibold">
              Confirm transfer
            </Text>
            <Text color="secondary">Review the details before submitting.</Text>
            <Button text="Close" onPress={() => modalRef.current?.closeModal()} />
          </View>
        </SlideModal>
      </StoryFrame>
    );
  },
};
