import type { Meta, StoryObj } from '@storybook/nextjs';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { StatusBar, Text } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Atoms/StatusBar',
  component: StatusBar,
  args: {
    showHeader: true,
    bgColor: '#2563eb',
    barStyle: 'light-content' as ComponentProps<typeof StatusBar>['barStyle'],
  },
  argTypes: {
    barStyle: { control: 'inline-radio', options: ['light-content', 'dark-content'] },
  },
} satisfies Meta<typeof StatusBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Status bar" description="Browser preview shows reserved header space; verify native behavior in-app.">
      <View style={{ overflow: 'hidden', borderRadius: 8 }}>
        <StatusBar {...args} />
        <View style={{ backgroundColor: '#2563eb', padding: 18 }}>
          <Text color="white" weight="semibold">
            Screen content starts below the status area
          </Text>
        </View>
      </View>
    </StoryFrame>
  ),
};
