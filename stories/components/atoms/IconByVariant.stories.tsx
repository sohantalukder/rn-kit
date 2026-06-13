import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { IconByVariant, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const iconNames = ['check', 'cancel', 'search', 'send', 'success', 'error', 'theme', 'notification'];

const meta = {
  title: 'Components/Atoms/IconByVariant',
  component: IconByVariant,
  args: {
    path: 'search',
    height: 32,
    width: 32,
  },
} satisfies Meta<typeof IconByVariant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Icon registry" description="Render local SVG icons by registry key.">
      <IconByVariant {...args} />
    </StoryFrame>
  ),
};

export const RegistryGrid: Story = {
  render: () => (
    <StoryFrame title="Registry grid" description="Common icon keys available in the package.">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
        {iconNames.map((name) => (
          <View key={name} style={{ alignItems: 'center', gap: 6, width: 72 }}>
            <IconByVariant path={name} height={28} width={28} color="#2563eb" />
            <Text variant="body3" color="secondary">{name}</Text>
          </View>
        ))}
      </View>
    </StoryFrame>
  ),
};
