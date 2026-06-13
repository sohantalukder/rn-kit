import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Text',
  component: Text,
  args: {
    children: 'Design-system typography',
    variant: 'body1',
    color: 'default',
    weight: 'regular',
  },
  argTypes: {
    variant: { control: 'select', options: ['heading1', 'heading2', 'heading3', 'body1', 'body2', 'body3'] },
    color: { control: 'select', options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'disabled', 'black', 'white'] },
    weight: { control: 'inline-radio', options: ['regular', 'medium', 'semibold', 'bold'] },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Text" description="Theme-aware typography primitive.">
      <Text {...args} />
    </StoryFrame>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryFrame title="Typography scale" description="Use named variants instead of one-off font sizes.">
      <View style={{ gap: 8 }}>
        <Text variant="heading1" weight="bold">Heading 1</Text>
        <Text variant="heading2" weight="bold">Heading 2</Text>
        <Text variant="heading3" weight="semibold">Heading 3</Text>
        <Text variant="body1">Body 1 text</Text>
        <Text variant="body2" color="secondary">Body 2 secondary text</Text>
        <Text variant="body3" color="primary">Body 3 primary text</Text>
      </View>
    </StoryFrame>
  ),
};
