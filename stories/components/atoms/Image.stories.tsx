import type { Meta, StoryObj } from '@storybook/nextjs';
import { Image } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const imageUrl = 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80';

const meta = {
  title: 'Components/Atoms/Image',
  component: Image,
  args: {
    source: { uri: imageUrl },
    width: 220,
    height: 140,
    borderRadius: 16,
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Image" description="Fast image wrapper with placeholder fallback.">
      <Image {...args} />
    </StoryFrame>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <StoryFrame title="Placeholder" description="Invalid or empty sources fall back to the placeholder icon.">
      <Image source={{ uri: '' }} width={160} height={120} borderRadius={12} />
    </StoryFrame>
  ),
};
