import type { Meta, StoryObj } from '@storybook/nextjs';
import { Dialog } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <StoryFrame title="Dialog" description="Confirmation dialog content and actions.">
      <Dialog
        visible
        title="Delete item?"
        description="This action cannot be undone."
        icon="error"
        buttons={[
          { label: 'Cancel', type: 'outline', onPress: () => {} },
          { label: 'Delete', type: 'error', onPress: () => {} },
        ]}
      />
    </StoryFrame>
  ),
};

export const SuccessState: Story = {
  render: () => (
    <StoryFrame title="Success dialog" description="Use positive confirmation copy after completed work.">
      <Dialog
        visible
        title="Payment complete"
        description="Your transfer was submitted successfully."
        icon="success"
        buttons={[{ label: 'Done', onPress: () => {} }]}
      />
    </StoryFrame>
  ),
};
