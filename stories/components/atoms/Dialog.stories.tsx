import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button, Dialog } from '@sohantalukder/rn-kit';
import { useState } from 'react';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <StoryFrame title="Dialog" description="Confirmation dialog content and actions.">
      <Button
        text="Open dialog"
        onPress={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Delete item?"
        description="This action cannot be undone."
        icon="error"
        buttons={[
          { label: 'Cancel', type: 'outline', onPress: () => setVisible(false) },
          { label: 'Delete', type: 'error', onPress: () => setVisible(false) },
        ]}
      />
    </StoryFrame>
  );
}

function SuccessDialogDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <StoryFrame title="Success dialog" description="Use positive confirmation copy after completed work.">
      <Button
        text="Show success"
        onPress={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        title="Payment complete"
        description="Your transfer was submitted successfully."
        icon="success"
        buttons={[{ label: 'Done', onPress: () => setVisible(false) }]}
      />
    </StoryFrame>
  );
}

export const Default: Story = {
  render: () => <DialogDemo />,
};

export const SuccessState: Story = {
  render: () => <SuccessDialogDemo />,
};
