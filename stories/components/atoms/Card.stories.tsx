import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { Card, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/Card',
  component: Card,
  args: {
    variant: 'default',
    padding: 18,
    shadow: true,
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'elevated', 'outlined', 'filled'] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Card" description="Content surface for grouped information.">
      <Card {...args}>
        <Text weight="semibold">Account balance</Text>
        <Text color="secondary">$4,280.00 available</Text>
      </Card>
    </StoryFrame>
  ),
};

export const Variants: Story = {
  render: () => (
    <StoryFrame title="Card variants" description="Use variants to tune hierarchy.">
      <View style={{ gap: 12 }}>
        {(['default', 'elevated', 'outlined', 'filled'] as const).map((variant) => (
          <Card key={variant} variant={variant} padding={16}>
            <Text weight="semibold">{variant}</Text>
          </Card>
        ))}
      </View>
    </StoryFrame>
  ),
};

export const Pressable: Story = {
  render: () => (
    <StoryFrame title="Pressable card" description="Make cards pressable only when the whole surface is one action.">
      <Card pressable onPress={() => {}} variant="outlined" padding={18}>
        <Text weight="semibold">Open statement</Text>
        <Text color="secondary">Tap anywhere on the card.</Text>
      </Card>
    </StoryFrame>
  ),
};
