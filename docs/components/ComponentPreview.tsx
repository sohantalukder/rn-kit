'use client';

import { Check, Component, Copy } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';
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
import SearchBar from '../../src/components/molecules/search-bar/SearchBar';
import SelectList from '../../src/components/molecules/select-list/SelectList';
import Skeleton from '../../src/components/atoms/skeleton/Skeleton';
import SlideModal from '../../src/components/organisms/slide-modal/SlideModal';
import Slider from '../../src/components/atoms/slider/Slider';
import StatusBar from '../../src/components/atoms/status-bar/StatusBar';
import Switch from '../../src/components/atoms/switch/Switch';
import Text from '../../src/components/atoms/text/Text';
import TextInput from '../../src/components/atoms/text-input/TextInput';
import { useTheme } from '../../src/theme';
import ThemeProvider from '../../src/theme/ThemeProvider/ThemeProvider';
import type { ThemeStorageAdapter } from '../../src/theme/ThemeProvider/ThemeProvider';
import Toast from '../../src/components/atoms/toast';
import type { SlideModalRef } from '../../src/components/organisms/slide-modal/SlideModal';
import { StatusBarStyle } from '../../src/components/atoms/status-bar/StatusBar';
import type { ComponentDoc } from '../data/componentRegistry';

type ComponentPreviewProps = {
  component: ComponentDoc;
};

type DocsTheme = 'light' | 'dark';

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

function getCurrentDocsTheme(): DocsTheme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function useDocsTheme() {
  const [docsTheme, setDocsTheme] = useState<DocsTheme>(getCurrentDocsTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDocsTheme(getCurrentDocsTheme());
    });

    observer.observe(document.documentElement, {
      attributeFilter: ['data-theme'],
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  return docsTheme;
}

function PreviewFrame({
  title,
  description,
  children,
  cardStyle,
  contentStyle,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  cardStyle?: ViewStyle;
  contentStyle?: ViewStyle;
}) {
  return (
    <View style={{ gap: 16, width: '100%' }}>
      <View style={{ gap: 6 }}>
        <Text
          variant="heading3"
          weight="semibold"
          style={{ fontSize: 22, lineHeight: 28 }}
        >
          {title}
        </Text>
        <Text
          variant="body2"
          color="secondary"
          style={{ fontSize: 14, fontWeight: '400', lineHeight: 20 }}
        >
          {description}
        </Text>
      </View>
      <Card
        variant="default"
        padding={18}
        shadow={false}
        style={cardStyle}
      >
        <View style={[{ gap: 14 }, contentStyle]}>{children}</View>
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
  const [searchQuery, setSearchQuery] = useState('invoices');
  const [selected, setSelected] = useState<string | number | undefined>('design');
  const [selectedMany, setSelectedMany] = useState<(string | number)[]>(['design']);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const modalRef = useRef<SlideModalRef>(null);
  const { colors } = useTheme();
  const isDarkPreview = colors.text.toLowerCase() === '#ffffff';
  const screenPalette = isDarkPreview
    ? {
        phoneBg: '#0f1117',
        phoneBorder: '#2a2d36',
        panelBg: '#171a23',
        panelBorder: '#2a2d36',
        cardBg: '#080402',
        heroBg: '#1f2430',
        heroMuted: '#aeb7c6',
        heroText: '#ffffff',
        text: '#f8fafc',
        muted: '#aeb7c6',
        buttonSecondary: 'rgba(255,255,255,0.14)',
        success: '#34d399',
        shadow: '#000000',
      }
    : {
        phoneBg: '#f7f9fc',
        phoneBorder: '#d9e0ea',
        panelBg: '#ffffff',
        panelBorder: '#e2e8f0',
        cardBg: '#111827',
        heroBg: '#111827',
        heroMuted: '#94a3b8',
        heroText: '#ffffff',
        text: '#0f172a',
        muted: '#64748b',
        buttonSecondary: 'rgba(255,255,255,0.12)',
        success: '#059669',
        shadow: '#0f172a',
      };
  const bottomSheetPalette = isDarkPreview
    ? {
        wrapperBg: '#111113',
        wrapperBorder: '#27272a',
        panelBg: '#18181b',
        panelBorder: '#3f3f46',
        cardBg: '#0d0d0f',
        cardBorder: '#27272a',
        badgeBg: '#27272a',
        title: '#fafafa',
        muted: '#a1a1aa',
        accent: '#6366f1',
        accentText: '#c7d2fe',
        shadow: '#000000',
      }
    : {
        wrapperBg: '#f8fafc',
        wrapperBorder: '#e2e8f0',
        panelBg: '#f8fafc',
        panelBorder: '#e2e8f0',
        cardBg: '#ffffff',
        cardBorder: '#e2e8f0',
        badgeBg: '#eef2ff',
        title: '#0f172a',
        muted: '#64748b',
        accent: '#4f46e5',
        accentText: '#4f46e5',
        shadow: '#0f172a',
      };

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
          <View style={{ alignItems: 'center', flexDirection: 'row', gap: 12 }}>
            <IconButton icon="search" size="small" accessibilityLabel="Small search" />
            <IconButton
              icon="notification"
              size="medium"
              showDot
              accessibilityLabel="Notifications"
            />
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
          <MultilineInput
            label="Notes"
            animatedLabel
            value={notes}
            onChangeText={setNotes}
            numberOfLines={4}
          />
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
        <View
          style={{
            width: '100%',
            maxWidth: 520,
            borderRadius: 24,
            backgroundColor: bottomSheetPalette.wrapperBg,
            borderWidth: 1,
            borderColor: bottomSheetPalette.wrapperBorder,
            padding: 24,
            gap: 18,
            minHeight: 420,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <View style={{ gap: 6 }}>
            <Text weight="bold" style={{ color: bottomSheetPalette.title, fontSize: 22, lineHeight: 28 }}>
              Bottom sheet
            </Text>
            <Text style={{ color: bottomSheetPalette.muted, fontSize: 14, lineHeight: 20 }}>
              Open a focused panel from the bottom of the screen for contextual tasks.
            </Text>
          </View>

          <View
            style={{
              borderRadius: 20,
              backgroundColor: bottomSheetPalette.cardBg,
              borderWidth: 1,
              borderColor: bottomSheetPalette.cardBorder,
              padding: 16,
              gap: 12,
              shadowColor: bottomSheetPalette.shadow,
              shadowOpacity: isDarkPreview ? 0.28 : 0.08,
              shadowRadius: 18,
              shadowOffset: { width: 0, height: 10 },
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View style={{ gap: 3 }}>
                <Text weight="semibold" style={{ color: bottomSheetPalette.title, fontSize: 15 }}>
                  Payment method
                </Text>
                <Text style={{ color: bottomSheetPalette.muted, fontSize: 12 }}>
                  Change card, wallet, or bank account.
                </Text>
              </View>
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: bottomSheetPalette.badgeBg,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text weight="bold" style={{ color: bottomSheetPalette.accentText, fontSize: 14 }}>
                  BS
                </Text>
              </View>
            </View>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Open bottom sheet"
              onPress={() => setSheetVisible(true)}
              style={({ pressed }) => ({
                alignItems: 'center',
                backgroundColor: bottomSheetPalette.accent,
                borderRadius: 14,
                justifyContent: 'center',
                minHeight: 48,
                opacity: pressed ? 0.82 : 1,
              })}
            >
              <Text weight="semibold" style={{ color: '#ffffff', fontSize: 16 }}>
                Open sheet
              </Text>
            </Pressable>
          </View>

          <BottomSheet
            visible={sheetVisible}
            onRequestClose={() => setSheetVisible(false)}
            maxHeight={240}
            minHeight={200}
            style={{ backgroundColor: bottomSheetPalette.cardBg, paddingHorizontal: 20, paddingBottom: 24 }}
            webPresentation="contained"
          >
            <View style={{ gap: 14 }}>
              <Text variant="heading3" weight="semibold" style={{ color: bottomSheetPalette.title }}>
                Payment method
              </Text>
              <Text style={{ color: bottomSheetPalette.muted, lineHeight: 22 }}>
                Choose a card, wallet, or bank account before completing this action.
              </Text>
              <Button
                text="Done"
                bgColor={bottomSheetPalette.accent}
                textColor="#ffffff"
                borderRadius={14}
                onPress={() => setSheetVisible(false)}
              />
            </View>
          </BottomSheet>
        </View>
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
          <Button
            text="Open dialog"
            onPress={() => setDialogVisible(true)}
          />
          <Dialog
            visible={dialogVisible}
            onDismiss={() => setDialogVisible(false)}
            title="Delete item?"
            description="This action cannot be undone."
            icon="error"
            buttons={[
              {
                label: 'Cancel',
                type: 'outline',
                onPress: () => setDialogVisible(false),
              },
              {
                label: 'Delete',
                type: 'error',
                onPress: () => setDialogVisible(false),
              },
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

    case 'search-bar':
      return (
        <PreviewFrame title="Search bar" description="Theme-aware search with icons and clear action.">
          <SearchBar
            value={searchQuery}
            onSearch={setSearchQuery}
            placeholder="Search transactions"
          />
          <SearchBar
            value="archived"
            disabled
            placeholder="Search records"
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
        <PreviewFrame title="No Internet" description="Network failure state with retry action.">
          <NoInternet
            animated={false}
            text="Connection lost"
            description="Please check your connection and try again."
            onRetry={() => {}}
            iconSize={88}
            containerStyle={{ minHeight: 360, paddingVertical: 28 }}
            textStyle={{ fontSize: 20, lineHeight: 26 }}
            descriptionStyle={{ fontSize: 14, lineHeight: 22, maxWidth: 300 }}
          />
        </PreviewFrame>
      );

    case 'multi-select':
      return (
        <PreviewFrame
          title="Multi select"
          description="Searchable dropdown with multiple selected values."
          cardStyle={{ overflow: 'visible' }}
          contentStyle={{ overflow: 'visible' }}
        >
          <MultiSelect
            data={sampleItems}
            selectedValues={selectedMany}
            setSelected={(values) => setSelectedMany(values ?? [])}
            placeholder="Select teams"
            maxHeight={220}
            dropdownStyles={{ position: 'relative', top: 0, marginTop: 8 }}
            dropdownShown
          />
          <Text color="secondary">Selected: {selectedMany.join(', ') || 'none'}</Text>
        </PreviewFrame>
      );

    case 'select-list':
      return (
        <PreviewFrame
          title="Select list"
          description="Searchable single-select dropdown."
          cardStyle={{ overflow: 'visible' }}
          contentStyle={{ overflow: 'visible' }}
        >
          <SelectList
            data={sampleItems}
            setSelected={setSelected}
            defaultOption={{ key: 'design', value: 'Design' }}
            placeholder="Select a team"
            maxHeight={200}
            dropdownStyles={{ position: 'relative', top: 0, marginTop: 8 }}
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
        <View style={{ alignItems: 'center', width: '100%' }}>
          <View
            style={{
              width: 340,
              maxWidth: '100%',
              height: 500,
              overflow: 'hidden',
              borderRadius: 28,
              borderWidth: 1,
              borderColor: screenPalette.phoneBorder,
              backgroundColor: screenPalette.phoneBg,
              shadowColor: screenPalette.shadow,
              shadowOpacity: isDarkPreview ? 0.28 : 0.12,
              shadowRadius: 24,
              shadowOffset: { width: 0, height: 16 },
            }}
          >
            <ScreenContainer
              bgColor={screenPalette.phoneBg}
              barBackgroundColor={screenPalette.phoneBg}
              barStyle={isDarkPreview ? StatusBarStyle.LIGHT : StatusBarStyle.DARK}
              containerStyle={{ padding: 16 }}
            >
              <View style={{ gap: 14 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View>
                    <Text style={{ color: screenPalette.muted, fontSize: 12 }}>Today</Text>
                    <Text variant="heading3" weight="bold" style={{ color: screenPalette.text }}>
                      Dashboard
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 19,
                      backgroundColor: screenPalette.cardBg,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text weight="bold" style={{ color: '#ffffff', fontSize: 13 }}>
                      ST
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderRadius: 22,
                    backgroundColor: screenPalette.heroBg,
                    padding: 18,
                    gap: 12,
                  }}
                >
                  <Text style={{ color: screenPalette.heroMuted, fontSize: 12 }}>Available balance</Text>
                  <Text weight="bold" style={{ color: screenPalette.heroText, fontSize: 30, lineHeight: 36 }}>
                    $4,280.00
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {['Send', 'Top up'].map((label) => (
                      <View
                        key={label}
                        style={{
                          borderRadius: 999,
                          backgroundColor: label === 'Send' ? '#6366f1' : screenPalette.buttonSecondary,
                          paddingHorizontal: 13,
                          paddingVertical: 7,
                        }}
                      >
                        <Text weight="semibold" style={{ color: '#ffffff', fontSize: 12 }}>
                          {label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{ flexDirection: 'row', gap: 10 }}>
                  {[
                    ['Income', '+12%'],
                    ['Spend', '-4%'],
                    ['Saved', '$820'],
                  ].map(([label, value]) => (
                    <View
                      key={label}
                      style={{
                        flex: 1,
                        borderRadius: 16,
                        backgroundColor: screenPalette.panelBg,
                        borderWidth: 1,
                        borderColor: screenPalette.panelBorder,
                        padding: 10,
                        gap: 3,
                      }}
                    >
                      <Text style={{ color: screenPalette.muted, fontSize: 11 }}>{label}</Text>
                      <Text weight="bold" style={{ color: screenPalette.text, fontSize: 15 }}>
                        {value}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={{ gap: 8 }}>
                  <Text weight="semibold" style={{ color: screenPalette.text, fontSize: 14 }}>
                    Recent activity
                  </Text>
                  {[
                    ['Design subscription', '-$24.00'],
                    ['Client payment', '+$1,240.00'],
                  ].map(([label, value]) => (
                    <View
                      key={label}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 14,
                        backgroundColor: screenPalette.panelBg,
                        borderWidth: 1,
                        borderColor: screenPalette.panelBorder,
                        padding: 11,
                      }}
                    >
                      <Text style={{ color: screenPalette.text, fontSize: 12 }}>{label}</Text>
                      <Text
                        weight="semibold"
                        style={{
                          color: value.startsWith('+') ? screenPalette.success : screenPalette.text,
                          fontSize: 12,
                        }}
                      >
                        {value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScreenContainer>
          </View>
        </View>
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
  const [copied, setCopied] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const docsTheme = useDocsTheme();
  const previewThemeStorage = useMemo<ThemeStorageAdapter>(
    () => ({
      getTheme: () => (docsTheme === 'dark' ? 'dark' : 'default'),
      setTheme: () => {},
    }),
    [docsTheme]
  );

  const copyPreviewCode = async () => {
    await navigator.clipboard.writeText(component.usage);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const previewPanelClassName = [
    'preview-panel',
    component.slug === 'bottom-sheet' && docsTheme === 'light' ? 'preview-panel-light' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={previewPanelClassName}>
      <div className="preview-stage">
        <div className="preview-canvas">
          <ThemeProvider key={docsTheme} storageAdapter={previewThemeStorage}>
            <ComponentExample component={component} />
          </ThemeProvider>
        </div>

        <div
          className={`preview-code-peek${isCodeVisible ? ' is-expanded' : ''}`}
          aria-label={`${component.name} usage preview`}
        >
          <div className="preview-code-toolbar">
            <span>tsx</span>
            <button
              type="button"
              aria-label={copied ? 'Preview code copied' : 'Copy preview code'}
              title={copied ? 'Copied' : 'Copy preview code'}
              onClick={copyPreviewCode}
            >
              <Copy size={14} aria-hidden="true" />
            </button>
          </div>
          <pre>
            <code>{component.usage}</code>
          </pre>
          <button
            className="preview-code-button"
            type="button"
            aria-expanded={isCodeVisible}
            onClick={() => setIsCodeVisible((value) => !value)}
          >
            {isCodeVisible ? 'Hide Code' : 'View Code'}
          </button>
        </div>
      </div>
      <div className="preview-notes">
        <span className="preview-chip">
          <Component size={14} aria-hidden="true" />
          Live component
        </span>
        <div className="preview-token-row">
          {highlightedVariants.map((variant) => (
            <span key={variant}>{variant}</span>
          ))}
        </div>
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
  );
}
