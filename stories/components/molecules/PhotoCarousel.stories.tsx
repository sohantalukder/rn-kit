import type { Meta, StoryObj } from '@storybook/nextjs';
import { PhotoCarousel } from '@sohantalukder/rn-kit';
import { StoryFrame, samplePhotos } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/PhotoCarousel',
  component: PhotoCarousel,
  args: {
    photos: samplePhotos,
    carouselHeight: 220,
  },
} satisfies Meta<typeof PhotoCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Photo carousel" description="Swipeable image carousel with pagination dots." width={460}>
      <PhotoCarousel {...args} />
    </StoryFrame>
  ),
};

export const AutoScroll: Story = {
  render: () => (
    <StoryFrame title="Auto scroll" description="Use auto-scroll sparingly in dense product screens." width={460}>
      <PhotoCarousel photos={samplePhotos} carouselHeight={220} autoScroll autoScrollInterval={3000} />
    </StoryFrame>
  ),
};
