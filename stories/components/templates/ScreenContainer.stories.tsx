import type { Meta, StoryObj } from '@storybook/nextjs';
import { View } from 'react-native';
import { ScreenContainer, Text, Button } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Templates/ScreenContainer',
  component: ScreenContainer,
  args: {
    showHeader: true,
  },
} satisfies Meta<typeof ScreenContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Screen container" description="Base screen wrapper with status bar handling." width={460}>
      <View style={{ height: 360, overflow: 'hidden', borderRadius: 8 }}>
        <ScreenContainer {...args} containerStyle={{ padding: 20 }}>
          <View style={{ gap: 12 }}>
            <Text variant="heading3" weight="semibold">
              Dashboard
            </Text>
            <Text color="secondary">Consistent screen background and content area.</Text>
            <Button text="Continue" onPress={() => {}} />
          </View>
        </ScreenContainer>
      </View>
    </StoryFrame>
  ),
};

export const CustomBackground: Story = {
  render: () => (
    <StoryFrame title="Custom background" description="Override background color for special screens." width={460}>
      <View style={{ height: 360, overflow: 'hidden', borderRadius: 8 }}>
        <ScreenContainer bgColor="#e0f2fe" containerStyle={{ padding: 20 }}>
          <Text variant="heading3" weight="semibold">
            Empty dashboard
          </Text>
        </ScreenContainer>
      </View>
    </StoryFrame>
  ),
};
