import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { SelectList, Text } from '@sohantalukder/rn-kit';
import { StoryFrame, sampleItems } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/SelectList',
  component: SelectList,
  args: {
    data: sampleItems,
    placeholder: 'Select a team',
    search: true,
    setSelected: () => {},
  },
} satisfies Meta<typeof SelectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Select list" description="Searchable single-select dropdown.">
      <SelectList {...args} setSelected={() => {}} dropdownShown />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | number | undefined>('design');
    return (
      <StoryFrame title="Controlled select" description="Single selected value is owned by parent state.">
        <SelectList
          data={sampleItems}
          setSelected={setSelected}
          defaultOption={{ key: 'design', value: 'Design' }}
          placeholder="Select a team"
          dropdownShown
        />
        <Text color="secondary">Selected: {selected ?? 'none'}</Text>
      </StoryFrame>
    );
  },
};

export const NoSearch: Story = {
  render: () => (
    <StoryFrame title="No search" description="Disable search for short option lists.">
      <SelectList data={sampleItems} setSelected={() => {}} search={false} dropdownShown />
    </StoryFrame>
  ),
};
