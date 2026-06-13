import React from 'react';
import type { DimensionValue, ViewStyle } from 'react-native';
import { ScrollView, View } from 'react-native';
import { Card, Text } from '@sohantalukder/rn-kit';

type StoryFrameProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  bestPractices?: string[];
  width?: DimensionValue;
  cardStyle?: ViewStyle;
  contentStyle?: ViewStyle;
};

export function StoryFrame({
  title,
  description,
  children,
  bestPractices = [],
  width = 420,
  cardStyle,
  contentStyle,
}: StoryFrameProps) {
  return (
    <ScrollView style={{ maxHeight: 760, width }}>
      <View style={{ gap: 16 }}>
        <View style={{ gap: 6 }}>
          <Text variant="heading3" weight="semibold">
            {title}
          </Text>
          <Text color="secondary">{description}</Text>
        </View>
        <Card
          variant="default"
          padding={18}
          shadow={false}
          style={cardStyle}
        >
          <View style={[{ gap: 14 }, contentStyle]}>{children}</View>
        </Card>
        {bestPractices.length > 0 ? (
          <Card variant="outlined" padding={16} shadow={false}>
            <View style={{ gap: 8 }}>
              <Text weight="semibold">Best practices</Text>
              {bestPractices.map((item) => (
                <Text color="secondary" variant="body2" key={item}>
                  {item}
                </Text>
              ))}
            </View>
          </Card>
        ) : null}
      </View>
    </ScrollView>
  );
}

export const sampleItems = [
  { key: 'design', value: 'Design' },
  { key: 'engineering', value: 'Engineering' },
  { key: 'product', value: 'Product' },
  { key: 'support', value: 'Support', disabled: true },
];

export const samplePhotos = [
  {
    id: 'one',
    uri: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80',
    accessibilityLabel: 'Colorful geometric architecture',
  },
  {
    id: 'two',
    uri: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    accessibilityLabel: 'Modern workspace',
  },
  {
    id: 'three',
    uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    accessibilityLabel: 'House near a lake',
  },
];
