'use client';

import { Check, Component } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import Avatar from '../../src/components/molecules/avatar/Avatar';
import Badge from '../../src/components/atoms/badge/Badge';
import BottomSheet from '../../src/components/atoms/bottom-sheet/BottomSheet';
import Button from '../../src/components/atoms/buttons/Button';
import Card from '../../src/components/atoms/card/Card';
import Checkbox from '../../src/components/atoms/check-box/Checkbox';
import ClickableText from '../../src/components/molecules/clickable-text/ClickableText';
import Dialog from '../../src/components/atoms/dialog/Dialog';
import Divider from '../../src/components/atoms/divider/Divider';
import EmptyContent from '../../src/components/molecules/empty-content/EmptyContent';
import IconButton from '../../src/components/atoms/buttons/IconButton';
import IconByVariant from '../../src/components/atoms/icon-by-variant/IconByVariant';
import Image from '../../src/components/atoms/image/Image';
import Loader from '../../src/components/atoms/loader/Loader';
import MultilineInput from '../../src/components/atoms/text-input/MultilineInput';
import MultiSelect from '../../src/components/molecules/multi-select';
import NoInternet from '../../src/components/molecules/no-internet/NoInternet';
import OTPInput from '../../src/components/atoms/text-input/OtpInput';
import PasswordInput from '../../src/components/molecules/password-input/PasswordInput';
import PhotoCarousel from '../../src/components/molecules/photo-carousel/PhotoCarousel';
import Radio from '../../src/components/atoms/radio/Radio';
import Ripple from '../../src/components/atoms/buttons/Ripple';
import ScreenContainer from '../../src/components/templates/screen-container/ScreenContainer';
import SelectList from '../../src/components/molecules/select-list/SelectList';
import Skeleton from '../../src/components/atoms/skeleton/Skeleton';
import SlideModal from '../../src/components/organisms/slide-modal/SlideModal';
import Slider from '../../src/components/atoms/slider/Slider';
import StatusBar from '../../src/components/atoms/status-bar/StatusBar';
import Switch from '../../src/components/atoms/switch/Switch';
import Text from '../../src/components/atoms/text/Text';
import TextInput from '../../src/components/atoms/text-input/TextInput';
import ThemeProvider from '../../src/theme/ThemeProvider/ThemeProvider';
import Toast from '../../src/components/atoms/toast';
import type { SlideModalRef } from '../../src/components/organisms/slide-modal/SlideModal';
import { StatusBarStyle } from '../../src/components/atoms/status-bar/StatusBar';
import type { ComponentDoc } from '../data/componentRegistry';

type ComponentPreviewProps = {
  component: ComponentDoc;
};

const sampleItems = [
  { key: 'design', value: 'Design' },
  { key: 'engineering', value: 'Engineering' },
  { key: 'product', value: 'Product' },
  { key: 'support', value: 'Support', disabled: true },
];

const samplePhotos = [
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

const imageUrl =
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80';
const avatarUrl =
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80';

function PreviewFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ gap: 16, width: '100%' }}>
      <View style={{ gap: 6 }}>
        <Text variant="heading3" weight="semibold">
          {title}
        </Text>
        <Text color="secondary">{description}</Text>
      </View>
      <Card variant="default" padding={18} shadow={false}>
        <View style={{ gap: 14 }}>{children}</View>
      </Card>
    </View>
  );
}

function ComponentExample({ component }: ComponentPreviewProps) {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [radioValue, setRadioValue] = useState('standard');
  const [sliderValue, setSliderValue] = useState(60);
  const [textValue, setTextValue] = useState('hello@rnkit.dev');
  const [notes, setNotes] = useState('This request needs a follow-up.');
  const [password, setPassword] = useState('correct-horse');
  const [selected, setSelected] = useState<string | number | undefined>('design');
  const [selectedMany, setSelectedMany] = useState<(string | number)[]>(['design']);
  const [sheetVisible, setSheetVisible] = useState(false);
  const modalRef = useRef<SlideModalRef>(null);

  switch (component.slug) {
    case 'button':
      return (
        <PreviewFrame title="Button variants" description="Primary, secondary, outline, and loading states.">
          <Button text="Continue" onPress={() => {}} />
          <Button text="Secondary" variant="secondary" onPress={() => {}} />
          <Button text="Outline" variant="outline" onPress={() => {}} />
          <Button text="Saving" isLoading onPress={() => {}} />
        </PreviewFrame>
      );

    case 'icon-button':
      return (
        <PreviewFrame title="Icon button sizes" description="Icon-only actions for toolbars and compact rows.">
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <IconButton icon="search" size="small" accessibilityLabel="Small search" />
            <IconButton icon="notification" size="medium" accessibilityLabel="Notifications" />
            <IconButton icon="more" size="large" accessibilityLabel="More actions" />
          </View>
        </PreviewFrame>
      );

    case 'ripple':
      return (
        <PreviewFrame title="Ripple" description="Pressable content with a visible touch response.">
          <Ripple onPress={() => {}} style={{ borderRadius: 8, padding: 16 }}>
            <Text weight="semibold">Tap this surface</Text>
          </Ripple>
        </PreviewFrame>
      );

    case 'loader':
      return (
        <PreviewFrame title="Loader" description="Inline progress indicator for busy states.">
          <View style={{ alignItems: 'center', gap: 12 }}>
            <Loader color="#0f766e" />
            <Text color="secondary">Loading account data</Text>
          </View>
        </PreviewFrame>
      );

    case 'status-bar':
      return (
        <PreviewFrame title="Status bar" description="Preview reserved screen chrome and content spacing.">
          <View style={{ overflow: 'hidden', borderRadius: 8 }}>
            <StatusBar bgColor="#0f766e" barStyle={StatusBarStyle.LIGHT} />
            <View style={{ backgroundColor: '#0f766e', padding: 18 }}>
              <Text color="white" weight="semibold">
                Screen content starts below the status area
              </Text>
            </View>
          </View>
        </PreviewFrame>
      );

    case 'text-input':
      return (
        <PreviewFrame title="Text input" description="Controlled single-line input with labels.">
          <TextInput label="Email" value={textValue} onChangeText={setTextValue} required />
          <TextInput label="Reference" value="RN-1024" disabled />
        </PreviewFrame>
      );

    case 'multiline-input':
      return (
        <PreviewFrame title="Multiline input" description="Text area input for longer values.">
          <MultilineInput label="Notes" value={notes} onChangeText={setNotes} numberOfLines={4} />
        </PreviewFrame>
      );

    case 'otp-input':
      return (
        <PreviewFrame title="OTP input" description="Configurable one-time password entry.">
          <OTPInput length={6} callback={() => {}} />
        </PreviewFrame>
      );

    case 'bottom-sheet':
      return (
        <PreviewFrame title="Bottom sheet" description="Open the sheet to preview modal content.">
          <Button text="Open sheet" onPress={() => setSheetVisible(true)} />
          <BottomSheet visible={sheetVisible} onRequestClose={() => setSheetVisible(false)}>
            <Text variant="heading3" weight="semibold">
              Payment method
            </Text>
            <Text color="secondary">Choose how you want to complete this action.</Text>
            <Button text="Done" onPress={() => setSheetVisible(false)} />
          </BottomSheet>
        </PreviewFrame>
      );

    case 'text':
      return (
        <PreviewFrame title="Typography scale" description="Theme-aware text variants.">
          <View style={{ gap: 8 }}>
            <Text variant="heading1" weight="bold">
              Heading 1
            </Text>
            <Text variant="heading2" weight="bold">
              Heading 2
            </Text>
            <Text variant="heading3" weight="semibold">
              Heading 3
            </Text>
            <Text variant="body2" color="secondary">
              Secondary body copy
            </Text>
          </View>
        </PreviewFrame>
      );

    case 'checkbox':
      return (
        <PreviewFrame title="Checkbox" description="Independent binary selection.">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Checkbox checked={checked} onPress={() => setChecked((value) => !value)} />
            <Text>Remember this device</Text>
          </View>
          <Checkbox checked disabled />
        </PreviewFrame>
      );

    case 'radio':
      return (
        <PreviewFrame title="Radio group" description="Use one selected value per option set.">
          {['standard', 'express'].map((item) => (
            <View key={item} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Radio checked={radioValue === item} onChange={() => setRadioValue(item)} />
              <Text>{item}</Text>
            </View>
          ))}
        </PreviewFrame>
      );

    case 'switch':
      return (
        <PreviewFrame title="Switch" description="Immediate on/off setting control.">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Switch value={enabled} onPress={(next) => setEnabled(next)} />
            <Text>{enabled ? 'Notifications enabled' : 'Notifications disabled'}</Text>
          </View>
        </PreviewFrame>
      );

    case 'image':
      return (
        <PreviewFrame title="Image" description="Fast image wrapper with placeholder fallback.">
          <Image source={{ uri: imageUrl }} width={220} height={140} borderRadius={16} />
        </PreviewFrame>
      );

    case 'skeleton':
      return (
        <PreviewFrame title="Skeleton" description="Match loading shapes to final content.">
          <View style={{ gap: 12 }}>
            <Skeleton width={64} height={64} borderRadius={32} />
            <Skeleton width="90%" height={18} />
            <Skeleton width="70%" height={18} />
          </View>
        </PreviewFrame>
      );

    case 'slider':
      return (
        <PreviewFrame title="Slider" description="Show the current value near the control.">
          <Text weight="semibold">Value: {sliderValue}</Text>
          <Slider min={0} max={100} value={sliderValue} onValueChange={setSliderValue} />
        </PreviewFrame>
      );

    case 'card':
      return (
        <PreviewFrame title="Card variants" description="Use surfaces to group related information.">
          <Card variant="outlined" padding={16}>
            <Text weight="semibold">Account balance</Text>
            <Text color="secondary">$4,280.00 available</Text>
          </Card>
          <Card pressable onPress={() => {}} variant="filled" padding={16}>
            <Text weight="semibold">Open statement</Text>
          </Card>
        </PreviewFrame>
      );

    case 'divider':
      return (
        <PreviewFrame title="Divider" description="Simple visual separator.">
          <Text>Section one</Text>
          <Divider width="100%" height={1} />
          <Text>Section two</Text>
        </PreviewFrame>
      );

    case 'icon-by-variant':
      return (
        <PreviewFrame title="Icon registry" description="Render local SVG icons by registry key.">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 18 }}>
            {['check', 'cancel', 'search', 'send', 'success', 'error'].map((name) => (
              <View key={name} style={{ alignItems: 'center', gap: 6, width: 72 }}>
                <IconByVariant path={name} height={28} width={28} color="#0f766e" />
                <Text variant="body3" color="secondary">
                  {name}
                </Text>
              </View>
            ))}
          </View>
        </PreviewFrame>
      );

    case 'badge':
      return (
        <PreviewFrame title="Badge variants" description="Short label or status pill.">
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <Badge text="Small" size="small" />
            <Badge text="Medium" size="medium" />
            <Badge text="Large" size="large" />
            <Badge text="Filled" bgColor="#0f766e" />
            <Badge text="Disabled" disabled />
          </View>
        </PreviewFrame>
      );

    case 'dialog':
      return (
        <PreviewFrame title="Dialog" description="Confirmation dialog content and actions.">
          <Dialog
            visible
            title="Delete item?"
            description="This action cannot be undone."
            icon="error"
            buttons={[
              { label: 'Cancel', type: 'outline', onPress: () => {} },
              { label: 'Delete', type: 'error', onPress: () => {} },
            ]}
          />
        </PreviewFrame>
      );

    case 'toast':
      return (
        <PreviewFrame title="Toast variants" description="Transient feedback messages.">
          <View style={{ gap: 10 }}>
            <Toast type="success" title="Transfer complete" />
            <Toast type="info" title="New version available" />
            <Toast type="error" title="Payment failed" />
          </View>
        </PreviewFrame>
      );

    case 'password-input':
      return (
        <PreviewFrame title="Password input" description="Password field with visibility toggle.">
          <PasswordInput label="Password" value={password} onChangeText={setPassword} required />
          <PasswordInput
            label="Short password"
            value="short"
            errorMessage="Password must be at least 8 characters."
          />
        </PreviewFrame>
      );

    case 'photo-carousel':
      return (
        <PreviewFrame title="Photo carousel" description="Swipeable image carousel with pagination dots.">
          <PhotoCarousel photos={samplePhotos} carouselHeight={220} />
        </PreviewFrame>
      );

    case 'clickable-text':
      return (
        <PreviewFrame title="Clickable text" description="Small text action for secondary flows.">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Text color="secondary">Already have an account?</Text>
            <ClickableText textColor="primary" onPress={() => {}}>
              Sign in
            </ClickableText>
          </View>
        </PreviewFrame>
      );

    case 'empty-content':
      return (
        <PreviewFrame title="Empty content" description="Reusable empty state with icon and explanatory copy.">
          <EmptyContent
            icon="search"
            title="Nothing matched"
            description="Try a broader search term."
            style={{ minHeight: 220 }}
          />
        </PreviewFrame>
      );

    case 'avatar':
      return (
        <PreviewFrame title="Avatar sizes" description="Use consistent square dimensions.">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <Avatar imageUrl={avatarUrl} height={40} width={40} borderRadius={20} />
            <Avatar imageUrl={avatarUrl} height={64} width={64} borderRadius={32} />
            <Avatar imageUrl="" height={72} width={72} borderRadius={36} />
          </View>
        </PreviewFrame>
      );

    case 'no-internet':
      return (
        <PreviewFrame title="No internet" description="Network failure state with retry action.">
          <NoInternet
            animated={false}
            text="Connection lost"
            description="Please check your connection and try again."
            onRetry={() => {}}
            containerStyle={{ minHeight: 360 }}
          />
        </PreviewFrame>
      );

    case 'multi-select':
      return (
        <PreviewFrame title="Multi select" description="Searchable dropdown with multiple selected values.">
          <MultiSelect
            data={sampleItems}
            selectedValues={selectedMany}
            setSelected={(values) => setSelectedMany(values ?? [])}
            placeholder="Select teams"
            dropdownShown
          />
          <Text color="secondary">Selected: {selectedMany.join(', ') || 'none'}</Text>
        </PreviewFrame>
      );

    case 'select-list':
      return (
        <PreviewFrame title="Select list" description="Searchable single-select dropdown.">
          <SelectList
            data={sampleItems}
            setSelected={setSelected}
            defaultOption={{ key: 'design', value: 'Design' }}
            placeholder="Select a team"
            dropdownShown
          />
          <Text color="secondary">Selected: {selected ?? 'none'}</Text>
        </PreviewFrame>
      );

    case 'slide-modal':
      return (
        <PreviewFrame title="Slide modal" description="Use the exposed ref methods to open composed modal flows.">
          <Button text="Open modal" onPress={() => modalRef.current?.openModal()} />
          <SlideModal ref={modalRef}>
            <View style={{ gap: 14, padding: 24 }}>
              <Text variant="heading3" weight="semibold">
                Confirm transfer
              </Text>
              <Text color="secondary">Review the details before submitting.</Text>
              <Button text="Close" onPress={() => modalRef.current?.closeModal()} />
            </View>
          </SlideModal>
        </PreviewFrame>
      );

    case 'screen-container':
      return (
        <PreviewFrame title="Screen container" description="Base screen wrapper with status bar handling.">
          <View style={{ height: 360, overflow: 'hidden', borderRadius: 8 }}>
            <ScreenContainer containerStyle={{ padding: 20 }}>
              <View style={{ gap: 12 }}>
                <Text variant="heading3" weight="semibold">
                  Dashboard
                </Text>
                <Text color="secondary">Consistent screen background and content area.</Text>
                <Button text="Continue" onPress={() => {}} />
              </View>
            </ScreenContainer>
          </View>
        </PreviewFrame>
      );

    default:
      return (
        <PreviewFrame title={component.name} description={component.summary}>
          <Text color="secondary">No custom preview is configured yet.</Text>
        </PreviewFrame>
      );
  }
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const highlightedVariants = component.variants.slice(0, 4);

  return (
    <div className="preview-panel">
      <div className="preview-header">
        <div>
          <span className="eyebrow">React Native preview</span>
          <h2>{component.name}</h2>
        </div>
        <span className="preview-chip">
          <Component size={14} aria-hidden="true" />
          Live component
        </span>
      </div>
      <div className="preview-stage">
        <div className="preview-canvas">
          <ThemeProvider>
            <ComponentExample component={component} />
          </ThemeProvider>
        </div>

        <div className="preview-notes">
          <div>
            <h3>Common variants</h3>
            <div className="preview-token-row">
              {highlightedVariants.map((variant) => (
                <span key={variant}>{variant}</span>
              ))}
            </div>
          </div>
          <div>
            <h3>Good default</h3>
            <ul className="preview-checklist">
              {component.bestPractices.slice(0, 2).map((note) => (
                <li key={note}>
                  <Check size={15} aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
