import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { MultiSelect, Text } from '@sohantalukder/rn-kit';
import { StoryFrame, sampleItems } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/MultiSelect',
  component: MultiSelect,
  args: {
    data: sampleItems,
    placeholder: 'Select teams',
    search: true,
    setSelected: () => {},
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame
      title="Multi select"
      description="Searchable dropdown with multiple selected values."
      cardStyle={{ overflow: 'visible' }}
      contentStyle={{ overflow: 'visible' }}
    >
      <MultiSelect
        {...args}
        setSelected={() => {}}
        dropdownStyles={{ position: 'relative', top: 0, marginTop: 8 }}
        dropdownShown
      />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<(string | number)[]>(['design']);
    return (
      <StoryFrame
        title="Controlled multi select"
        description="Store selected keys in parent form state."
        cardStyle={{ overflow: 'visible' }}
        contentStyle={{ overflow: 'visible' }}
      >
        <MultiSelect
          data={sampleItems}
          selectedValues={selected}
          setSelected={(values) => setSelected(values ?? [])}
          placeholder="Select teams"
          dropdownStyles={{ position: 'relative', top: 0, marginTop: 8 }}
          dropdownShown
        />
        <Text color="secondary">Selected: {selected.join(', ') || 'none'}</Text>
      </StoryFrame>
    );
  },
};

export const LoadingState: Story = {
  render: () => (
    <StoryFrame
      title="Loading more"
      description="Use loading state for async option pagination."
      cardStyle={{ overflow: 'visible' }}
      contentStyle={{ overflow: 'visible' }}
    >
      <MultiSelect
        data={sampleItems}
        selectedValues={['product']}
        setSelected={() => {}}
        placeholder="Select teams"
        isLoading
        hasMore
        dropdownStyles={{ position: 'relative', top: 0, marginTop: 8 }}
        dropdownShown
      />
    </StoryFrame>
  ),
};
