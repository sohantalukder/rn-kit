import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import { SearchBar } from '@sohantalukder/rn-kit';
import { StoryFrame } from '../StoryFrame';

const meta = {
  title: 'Components/Molecules/SearchBar',
  component: SearchBar,
  args: {
    placeholder: 'Search items',
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <StoryFrame title="Search bar" description="Search input with themed icons and clear action.">
      <SearchBar {...args} />
    </StoryFrame>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('invoices');

    return (
      <StoryFrame title="Controlled search" description="Use controlled state for filtering lists.">
        <SearchBar
          value={value}
          onSearch={setValue}
          placeholder="Search transactions"
        />
      </StoryFrame>
    );
  },
};

export const DisabledState: Story = {
  render: () => (
    <StoryFrame title="Disabled search" description="Disabled search keeps the current query visible.">
      <SearchBar
        value="archived"
        disabled
        placeholder="Search records"
      />
    </StoryFrame>
  ),
};
