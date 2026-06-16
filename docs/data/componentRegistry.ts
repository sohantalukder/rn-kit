export type ComponentDoc = {
  name: string;
  slug: string;
  summary: string;
  importName: string;
  primaryProps: string[];
  variants: string[];
  bestPractices: string[];
  usage: string;
};

export const packageInfo = {
  name: '@sohantalukder/rn-kit',
  slug: 'rn-kit',
  version: '0.1.1',
  summary:
    'A typed React Native UI kit with theme primitives, polished components, and overlay providers.',
  install: 'npm install @sohantalukder/rn-kit',
  peerInstall:
    'npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-svg',
};

const usageExamples = {
  button: `import { useState } from 'react';
import { Button, toast } from '@sohantalukder/rn-kit';

export function SaveButton() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    toast.show({ type: 'success', title: 'Saved' });
    setTimeout(() => setIsSaving(false), 800);
  };

  return (
    <Button
      text="Save changes"
      accessibilityLabel="Save changes"
      isLoading={isSaving}
      disabled={isSaving}
      onPress={handleSave}
    />
  );
}`,
  iconButton: `import { useState } from 'react';
import { IconButton } from '@sohantalukder/rn-kit';

export function NotificationAction() {
  const [isActive, setIsActive] = useState(false);

  return (
    <IconButton
      icon={isActive ? 'check' : 'notification'}
      accessibilityLabel="Notifications"
      size="medium"
      showDot={!isActive}
      onPress={() => setIsActive((value) => !value)}
    />
  );
}`,
  ripple: `import { View } from 'react-native';
import { Ripple, Text, toast, useTheme } from '@sohantalukder/rn-kit';

export function PressableRow() {
  const { borders, gutters } = useTheme();

  return (
    <Ripple
      accessibilityRole="button"
      accessibilityLabel="Open account details"
      onPress={() => toast.show({ type: 'info', title: 'Opening details' })}
    >
      <View style={[gutters.padding_16, borders.rounded_12]}>
        <Text weight="semibold">Account details</Text>
        <Text color="secondary">Tap to review the latest activity.</Text>
      </View>
    </Ripple>
  );
}`,
  loader: `import { View } from 'react-native';
import { Loader, Text, useTheme } from '@sohantalukder/rn-kit';

export function LoadingState() {
  const { gutters, layout } = useTheme();

  return (
    <View style={[layout.itemsCenter, gutters.gap_12, gutters.padding_24]}>
      <Loader size={32} />
      <Text color="secondary">Loading transactions...</Text>
    </View>
  );
}`,
  statusBar: `import { StatusBar } from '@sohantalukder/rn-kit';

export function ScreenChrome() {
  return (
    <StatusBar
      bgColor="#FFFFFF"
      showHeader
      translucent={false}
    />
  );
}`,
  textInput: `import { useState } from 'react';
import { TextInput } from '@sohantalukder/rn-kit';

export function EmailField() {
  const [email, setEmail] = useState('');
  const error =
    email.length > 0 && !email.includes('@')
      ? 'Enter a valid email address.'
      : undefined;

  return (
    <TextInput
      label="Email"
      placeholder="you@example.com"
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      errorMessage={error}
      onChangeText={(value) => setEmail(value)}
    />
  );
}`,
  multilineInput: `import { useState } from 'react';
import { MultilineInput } from '@sohantalukder/rn-kit';

export function NotesField() {
  const [notes, setNotes] = useState('');

  return (
    <MultilineInput
      label="Notes"
      animatedLabel
      placeholder="Add delivery instructions"
      numberOfLines={4}
      height={120}
      value={notes}
      onChangeText={(value) => setNotes(value)}
    />
  );
}`,
  otpInput: `import { useState } from 'react';
import { Text, OTPInput } from '@sohantalukder/rn-kit';

export function VerifyCode() {
  const [code, setCode] = useState('');

  return (
    <>
      <OTPInput length={6} callback={setCode} />
      <Text color="secondary">Entered code: {code || 'Waiting...'}</Text>
    </>
  );
}`,
  bottomSheet: `import { useState } from 'react';
import { View } from 'react-native';
import { BottomSheet, Button, Text, useTheme } from '@sohantalukder/rn-kit';

export function FilterSheetExample() {
  const [visible, setVisible] = useState(false);
  const { gutters } = useTheme();

  return (
    <>
      <Button text="Open filters" onPress={() => setVisible(true)} />
      <BottomSheet
        visible={visible}
        onRequestClose={() => setVisible(false)}
        maxHeight={420}
        enableSwipeToClose
      >
        <View style={[gutters.gap_12, gutters.padding_16]}>
          <Text variant="heading3" weight="semibold">Filters</Text>
          <Text color="secondary">Choose the options for this list.</Text>
          <Button text="Apply" onPress={() => setVisible(false)} />
        </View>
      </BottomSheet>
    </>
  );
}`,
  text: `import { Text } from '@sohantalukder/rn-kit';

export function SectionTitle() {
  return (
    <>
      <Text variant="heading3" weight="semibold">
        Payment methods
      </Text>
      <Text color="secondary">
        Manage saved cards and bank accounts.
      </Text>
    </>
  );
}`,
  checkbox: `import { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Text, useTheme } from '@sohantalukder/rn-kit';

export function TermsCheckbox() {
  const [accepted, setAccepted] = useState(false);
  const { gutters, layout } = useTheme();

  return (
    <View style={[layout.row, layout.itemsCenter, gutters.gap_10]}>
      <Checkbox
        checked={accepted}
        accessibilityLabel="Accept terms"
        onPress={() => setAccepted((value) => !value)}
      />
      <Text>I agree to the terms</Text>
    </View>
  );
}`,
  radio: `import { useState } from 'react';
import { View } from 'react-native';
import { Radio, Text, useTheme } from '@sohantalukder/rn-kit';

export function PlanOptions() {
  const [plan, setPlan] = useState('standard');
  const { gutters, layout } = useTheme();

  return (
    <View style={gutters.gap_12}>
      <View style={[layout.row, layout.itemsCenter, gutters.gap_10]}>
        <Radio
          checked={plan === 'standard'}
          accessibilityLabel="Standard plan"
          onChange={() => setPlan('standard')}
        />
        <Text>Standard</Text>
      </View>
      <View style={[layout.row, layout.itemsCenter, gutters.gap_10]}>
        <Radio
          checked={plan === 'priority'}
          accessibilityLabel="Priority plan"
          onChange={() => setPlan('priority')}
        />
        <Text>Priority</Text>
      </View>
    </View>
  );
}`,
  switch: `import { useState } from 'react';
import { View } from 'react-native';
import { Switch, Text, useTheme } from '@sohantalukder/rn-kit';

export function NotificationSwitch() {
  const [enabled, setEnabled] = useState(true);
  const { gutters, layout } = useTheme();

  return (
    <View style={[layout.row, layout.itemsCenter, gutters.gap_12]}>
      <Switch
        value={enabled}
        name="notifications"
        onPress={(nextValue) => setEnabled(nextValue)}
      />
      <Text>Push notifications</Text>
    </View>
  );
}`,
  image: `import { Image } from '@sohantalukder/rn-kit';

export function ProfilePhoto() {
  return (
    <Image
      source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }}
      width={96}
      height={96}
      borderRadius={48}
      resizeMode="cover"
      accessibilityLabel="Profile photo"
    />
  );
}`,
  skeleton: `import { View } from 'react-native';
import { Skeleton, useTheme } from '@sohantalukder/rn-kit';

export function ProfileSkeleton() {
  const { gutters } = useTheme();

  return (
    <View style={gutters.gap_12}>
      <Skeleton width={64} height={64} borderRadius={32} />
      <Skeleton width="80%" height={16} />
      <Skeleton width="55%" height={16} />
    </View>
  );
}`,
  slider: `import { useState } from 'react';
import { View } from 'react-native';
import { Slider, Text, useTheme } from '@sohantalukder/rn-kit';

export function BudgetSlider() {
  const [budget, setBudget] = useState(50);
  const { gutters } = useTheme();

  return (
    <View style={gutters.gap_12}>
      <Text weight="semibold">Budget: {budget}</Text>
      <Slider
        min={0}
        max={100}
        initialValue={budget}
        value={budget}
        onValueChange={setBudget}
      />
    </View>
  );
}`,
  card: `import { Card, Text, useTheme } from '@sohantalukder/rn-kit';

export function AccountCard() {
  const { gutters } = useTheme();

  return (
    <Card variant="outlined" style={gutters.gap_8}>
      <Text variant="heading3" weight="semibold">Savings</Text>
      <Text color="secondary">Available balance</Text>
      <Text variant="heading2" weight="bold">$2,450.00</Text>
    </Card>
  );
}`,
  divider: `import { View } from 'react-native';
import { Divider, Text, useTheme } from '@sohantalukder/rn-kit';

export function SettingsGroup() {
  const { gutters } = useTheme();

  return (
    <View style={gutters.gap_12}>
      <Text>Profile</Text>
      <Divider />
      <Text>Notifications</Text>
      <Divider />
      <Text>Security</Text>
    </View>
  );
}`,
  iconByVariant: `import { View } from 'react-native';
import { IconByVariant, Text, useTheme } from '@sohantalukder/rn-kit';

export function SearchHint() {
  const { gutters, layout } = useTheme();

  return (
    <View style={[layout.row, layout.itemsCenter, gutters.gap_8]}>
      <IconByVariant path="search" height={24} width={24} />
      <Text color="secondary">Search customers</Text>
    </View>
  );
}`,
  badge: `import { Badge, toast } from '@sohantalukder/rn-kit';

export function StatusBadge() {
  return (
    <Badge
      text="Active"
      size="medium"
      onPress={() => toast.show({ type: 'success', title: 'Status active' })}
    />
  );
}`,
  dialog: `import { useState } from 'react';
import { Button, Dialog } from '@sohantalukder/rn-kit';

export function DeleteDialog() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button text="Delete item" variant="error" onPress={() => setVisible(true)} />
      <Dialog
        visible={visible}
        title="Delete item?"
        description="This action cannot be undone."
        onDismiss={() => setVisible(false)}
        buttons={[
          { label: 'Cancel', type: 'outline', onPress: () => setVisible(false) },
          { label: 'Delete', type: 'error', onPress: () => setVisible(false) },
        ]}
      />
    </>
  );
}`,
  toast: `import { useState } from 'react';
import { Toast, Button } from '@sohantalukder/rn-kit';

export function InlineToastExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button text="Show toast" onPress={() => setVisible(true)} />
      {visible ? (
        <Toast
          type="success"
          title="Saved"
          onDismiss={() => setVisible(false)}
        />
      ) : null}
    </>
  );
}`,
  passwordInput: `import { useState } from 'react';
import { PasswordInput } from '@sohantalukder/rn-kit';

export function PasswordField() {
  const [password, setPassword] = useState('');
  const error =
    password.length > 0 && password.length < 8
      ? 'Use at least 8 characters.'
      : undefined;

  return (
    <PasswordInput
      label="Password"
      placeholder="Enter password"
      required
      value={password}
      errorMessage={error}
      onChangeText={(value) => setPassword(value)}
    />
  );
}`,
  searchBar: `import { useState } from 'react';
import { SearchBar, Text } from '@sohantalukder/rn-kit';

export function CustomerSearch() {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar
        placeholder="Search customers"
        value={query}
        onSearch={setQuery}
        onSubmitSearch={(value) => setQuery(value)}
        onClear={() => setQuery('')}
      />
      <Text color="secondary">Searching for: {query || 'All customers'}</Text>
    </>
  );
}`,
  photoCarousel: `import { PhotoCarousel } from '@sohantalukder/rn-kit';

const photos = [
  {
    id: 'front',
    uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    accessibilityLabel: 'Front view',
  },
  {
    id: 'inside',
    uri: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
    accessibilityLabel: 'Interior view',
  },
];

export function ListingPhotos() {
  return (
    <PhotoCarousel
      photos={photos}
      carouselHeight={220}
      onPhotoChange={(index) => console.log('Current photo', index)}
    />
  );
}`,
  clickableText: `import { ClickableText, toast } from '@sohantalukder/rn-kit';

export function TermsLink() {
  return (
    <ClickableText
      textColor="primary"
      onPress={() => toast.show({ type: 'info', title: 'Opening terms' })}
    >
      View terms and conditions
    </ClickableText>
  );
}`,
  emptyContent: `import { useState } from 'react';
import { View } from 'react-native';
import { Button, EmptyContent, useTheme } from '@sohantalukder/rn-kit';

export function EmptyResults() {
  const [hasResetFilters, setHasResetFilters] = useState(false);
  const { gutters, layout } = useTheme();

  return (
    <View style={[layout.itemsCenter, gutters.gap_16, gutters.padding_24]}>
      <EmptyContent
        title="No results"
        description="Try changing your filters or search term."
        icon="emptyContent"
      />
      <Button
        text={hasResetFilters ? 'Filters reset' : 'Reset filters'}
        variant="outline"
        disabled={hasResetFilters}
        onPress={() => setHasResetFilters(true)}
      />
    </View>
  );
}`,
  avatar: `import { View } from 'react-native';
import { Avatar, Text, useTheme } from '@sohantalukder/rn-kit';

export function UserSummary() {
  const { gutters, layout } = useTheme();

  return (
    <View style={[layout.row, layout.itemsCenter, gutters.gap_12]}>
      <Avatar
        imageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
        height={48}
        width={48}
        borderRadius={24}
      />
      <Text weight="semibold">Nadia Rahman</Text>
    </View>
  );
}`,
  noInternet: `import { NoInternet, toast } from '@sohantalukder/rn-kit';

export function OfflineScreen() {
  return (
    <NoInternet
      text="No connection"
      description="Check your internet connection and try again."
      onRetry={() => toast.show({ type: 'info', title: 'Retrying connection' })}
    />
  );
}`,
  multiSelect: `import { useState } from 'react';
import { MultiSelect } from '@sohantalukder/rn-kit';

const items = [
  { key: 'design', value: 'Design' },
  { key: 'mobile', value: 'Mobile' },
  { key: 'backend', value: 'Backend', disabled: true },
];

export function SkillPicker() {
  const [selected, setSelected] = useState<(string | number)[]>([]);

  return (
    <MultiSelect
      label="Skills"
      placeholder="Choose skills"
      data={items}
      selectedValues={selected}
      setSelected={(values) => setSelected(values ?? [])}
      save="key"
      search
    />
  );
}`,
  selectList: `import { useState } from 'react';
import { SelectList, Text } from '@sohantalukder/rn-kit';

const items = [
  { key: 'draft', value: 'Draft' },
  { key: 'active', value: 'Active' },
  { key: 'archived', value: 'Archived', disabled: true },
];

export function StatusSelect() {
  const [status, setStatus] = useState<string | number | undefined>();

  return (
    <>
      <SelectList
        label="Status"
        placeholder="Select status"
        data={items}
        setSelected={setStatus}
        save="key"
        search
      />
      <Text color="secondary">Selected: {status ?? 'None'}</Text>
    </>
  );
}`,
  slideModal: `import { useRef } from 'react';
import { Button, SlideModal, Text } from '@sohantalukder/rn-kit';

export function SlideModalExample() {
  const modalRef = useRef<{
    openModal: () => void;
    closeModal: () => void;
  } | null>(null);

  return (
    <>
      <Button text="Open modal" onPress={() => modalRef.current?.openModal()} />
      <SlideModal ref={modalRef}>
        <Text variant="heading3" weight="semibold">
          Complete profile
        </Text>
        <Button
          text="Close"
          variant="outline"
          onPress={() => modalRef.current?.closeModal()}
        />
      </SlideModal>
    </>
  );
}`,
  screenContainer: `import { ScreenContainer, Text, useTheme } from '@sohantalukder/rn-kit';

export function DashboardScreen() {
  const { gutters } = useTheme();

  return (
    <ScreenContainer
      showHeader
      containerStyle={gutters.padding_20}
    >
      <Text variant="heading2" weight="semibold">
        Dashboard
      </Text>
      <Text color="secondary">Your account overview is ready.</Text>
    </ScreenContainer>
  );
}`,
} as const;

export const components: ComponentDoc[] = [
  {
    name: 'Button',
    slug: 'button',
    summary: 'Primary action component with variants, icons, loading, disabled, and custom colors.',
    importName: 'Button',
    primaryProps: ['text', 'variant', 'icon', 'isLoading', 'disabled', 'onPress'],
    variants: ['primary', 'secondary', 'outline', 'error', 'disable'],
    bestPractices: ['Use one primary button per decision area.', 'Prefer `isLoading` over changing labels during async work.'],
    usage: usageExamples.button,
  },
  {
    name: 'IconButton',
    slug: 'icon-button',
    summary: 'Compact icon-only action button with sizes, states, and accessible labels.',
    importName: 'IconButton',
    primaryProps: ['icon', 'size', 'showDot', 'disabled', 'bgColor', 'iconColor', 'onPress'],
    variants: ['small', 'medium', 'large', 'disabled'],
    bestPractices: ['Always provide an accessibility label.', 'Use recognizable icons for repeated toolbar actions.'],
    usage: usageExamples.iconButton,
  },
  {
    name: 'Ripple',
    slug: 'ripple',
    summary: 'Pressable wrapper that adds a configurable ripple interaction.',
    importName: 'Ripple',
    primaryProps: ['children', 'rippleColor', 'duration', 'disabled', 'onPress'],
    variants: ['default', 'custom color', 'disabled'],
    bestPractices: ['Wrap simple pressable content.', 'Keep ripple contrast visible in both themes.'],
    usage: usageExamples.ripple,
  },
  {
    name: 'Loader',
    slug: 'loader',
    summary: 'Animated loading indicator for inline and blocking loading states.',
    importName: 'Loader',
    primaryProps: ['size', 'color', 'style'],
    variants: ['small', 'medium', 'large', 'custom color'],
    bestPractices: ['Pair long waits with descriptive text.', 'Use inside buttons only when the action is already submitted.'],
    usage: usageExamples.loader,
  },
  {
    name: 'StatusBar',
    slug: 'status-bar',
    summary: 'Theme-aware status bar adapter for React Native screens.',
    importName: 'StatusBar',
    primaryProps: ['barStyle', 'bgColor', 'translucent', 'showHeader'],
    variants: ['light', 'dark', 'translucent'],
    bestPractices: ['Configure per screen when backgrounds change.', 'Preview in native apps for exact platform behavior.'],
    usage: usageExamples.statusBar,
  },
  {
    name: 'TextInput',
    slug: 'text-input',
    summary: 'Single-line input with labels, icons, validation, errors, and disabled state.',
    importName: 'TextInput',
    primaryProps: ['label', 'animatedLabel', 'placeholder', 'value', 'errorMessage', 'disabled', 'required'],
    variants: ['default', 'controlled', 'error', 'disabled', 'with icons'],
    bestPractices: ['Use controlled values for forms.', 'Show validation copy close to the input.'],
    usage: usageExamples.textInput,
  },
  {
    name: 'MultilineInput',
    slug: 'multiline-input',
    summary: 'Text area input for longer values with labels and validation support.',
    importName: 'MultilineInput',
    primaryProps: ['label', 'animatedLabel', 'placeholder', 'numberOfLines', 'height', 'value'],
    variants: ['default', 'controlled', 'custom height', 'disabled'],
    bestPractices: ['Set a predictable height for forms.', 'Use character limits for user-generated descriptions.'],
    usage: usageExamples.multilineInput,
  },
  {
    name: 'OTPInput',
    slug: 'otp-input',
    summary: 'One-time password input with configurable length and completion callback.',
    importName: 'OTPInput',
    primaryProps: ['length', 'callback', 'style'],
    variants: ['4 digits', '6 digits', 'custom style'],
    bestPractices: ['Keep OTP length aligned with backend policy.', 'Move focus automatically only when the user enters valid digits.'],
    usage: usageExamples.otpInput,
  },
  {
    name: 'BottomSheet',
    slug: 'bottom-sheet',
    summary: 'Local modal bottom sheet with overlay, gestures, and configurable heights.',
    importName: 'BottomSheet',
    primaryProps: ['visible', 'onRequestClose', 'children', 'maxHeight', 'enableSwipeToClose'],
    variants: ['default', 'custom content', 'no swipe close'],
    bestPractices: ['Use for contextual tasks, not full navigation.', 'Keep destructive actions visually separated.'],
    usage: usageExamples.bottomSheet,
  },
  {
    name: 'Text',
    slug: 'text',
    summary: 'Theme-aware typography primitive with variants, colors, and font weights.',
    importName: 'Text',
    primaryProps: ['children', 'variant', 'color', 'weight'],
    variants: ['headings', 'body', 'colors', 'weights'],
    bestPractices: ['Use semantic variants consistently.', 'Avoid one-off font sizes inside screens.'],
    usage: usageExamples.text,
  },
  {
    name: 'Checkbox',
    slug: 'checkbox',
    summary: 'Animated checkbox with selected, disabled, and label support.',
    importName: 'Checkbox',
    primaryProps: ['checked', 'disabled', 'size', 'onPress'],
    variants: ['unchecked', 'checked', 'disabled'],
    bestPractices: ['Use checkboxes for independent binary choices.', 'Keep labels explicit and tappable.'],
    usage: usageExamples.checkbox,
  },
  {
    name: 'Radio',
    slug: 'radio',
    summary: 'Radio control for mutually exclusive selections.',
    importName: 'Radio',
    primaryProps: ['checked', 'disabled', 'onChange'],
    variants: ['unselected', 'selected', 'disabled'],
    bestPractices: ['Use radios for small visible option sets.', 'Use one selected value per group.'],
    usage: usageExamples.radio,
  },
  {
    name: 'Switch',
    slug: 'switch',
    summary: 'Theme-aware switch for immediate on/off settings.',
    importName: 'Switch',
    primaryProps: ['value', 'name', 'activeColor', 'onPress'],
    variants: ['off', 'on', 'disabled'],
    bestPractices: ['Use for settings that take effect immediately.', 'Avoid using switches for form submission.'],
    usage: usageExamples.switch,
  },
  {
    name: 'Image',
    slug: 'image',
    summary: 'React Native image wrapper with placeholder, loading, fallback, and resize options.',
    importName: 'Image',
    primaryProps: ['source', 'width', 'height', 'resizeMode', 'borderRadius'],
    variants: ['remote image', 'placeholder', 'rounded'],
    bestPractices: ['Set explicit dimensions to avoid layout shift.', 'Use placeholders for optional remote media.'],
    usage: usageExamples.image,
  },
  {
    name: 'Skeleton',
    slug: 'skeleton',
    summary: 'Placeholder block for loading layouts.',
    importName: 'Skeleton',
    primaryProps: ['width', 'height', 'borderRadius', 'style'],
    variants: ['line', 'avatar', 'card'],
    bestPractices: ['Match the final content shape.', 'Use sparingly on fast transitions.'],
    usage: usageExamples.skeleton,
  },
  {
    name: 'Slider',
    slug: 'slider',
    summary: 'Gesture-driven slider for numeric range input.',
    importName: 'Slider',
    primaryProps: ['min', 'max', 'initialValue', 'value', 'onValueChange'],
    variants: ['default', 'stepped', 'disabled'],
    bestPractices: ['Show the selected value near the control.', 'Use steps for financial or count inputs.'],
    usage: usageExamples.slider,
  },
  {
    name: 'Card',
    slug: 'card',
    summary: 'Content surface with variants, elevation, borders, and optional press behavior.',
    importName: 'Card',
    primaryProps: ['variant', 'padding', 'elevation', 'pressable', 'children'],
    variants: ['default', 'elevated', 'outlined', 'filled', 'pressable'],
    bestPractices: ['Use cards for repeated content groups.', 'Keep nested card structures out of app screens.'],
    usage: usageExamples.card,
  },
  {
    name: 'Divider',
    slug: 'divider',
    summary: 'Simple horizontal or vertical separator.',
    importName: 'Divider',
    primaryProps: ['width', 'height', 'color', 'style'],
    variants: ['horizontal', 'vertical', 'custom color'],
    bestPractices: ['Use to separate related groups, not every row.', 'Prefer spacing when hierarchy is already clear.'],
    usage: usageExamples.divider,
  },
  {
    name: 'IconByVariant',
    slug: 'icon-by-variant',
    summary: 'Local SVG icon registry renderer.',
    importName: 'IconByVariant',
    primaryProps: ['path', 'height', 'width', 'color'],
    variants: ['registry grid', 'custom color', 'different sizes'],
    bestPractices: ['Use registry keys for consistent icons.', 'Pass accessible labels on the surrounding action.'],
    usage: usageExamples.iconByVariant,
  },
  {
    name: 'Badge',
    slug: 'badge',
    summary: 'Small label or status pill with sizes, colors, and optional press handling.',
    importName: 'Badge',
    primaryProps: ['text', 'size', 'bgColor', 'disabled', 'onPress'],
    variants: ['small', 'medium', 'large', 'filled', 'disabled'],
    bestPractices: ['Use short labels.', 'Do not use badges as the only status signal when color matters.'],
    usage: usageExamples.badge,
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    summary: 'Dialog content component for confirmations and alerts.',
    importName: 'Dialog',
    primaryProps: ['visible', 'title', 'description', 'buttons', 'icon', 'onDismiss'],
    variants: ['success', 'error', 'confirmation'],
    bestPractices: ['Reserve dialogs for decisions that interrupt flow.', 'Keep button labels action-oriented.'],
    usage: usageExamples.dialog,
  },
  {
    name: 'Toast',
    slug: 'toast',
    summary: 'Inline toast visual for success, error, and info messages.',
    importName: 'Toast',
    primaryProps: ['type', 'title', 'onDismiss'],
    variants: ['success', 'error', 'info'],
    bestPractices: ['Keep messages brief.', 'Do not use toasts for required decisions.'],
    usage: usageExamples.toast,
  },
  {
    name: 'PasswordInput',
    slug: 'password-input',
    summary: 'Password field with visibility toggle, label, required, and error support.',
    importName: 'PasswordInput',
    primaryProps: ['label', 'animatedLabel', 'placeholder', 'value', 'errorMessage', 'required'],
    variants: ['default', 'controlled', 'error', 'custom style'],
    bestPractices: ['Pair with validation copy.', 'Avoid pre-filling sensitive values in examples.'],
    usage: usageExamples.passwordInput,
  },
  {
    name: 'SearchBar',
    slug: 'search-bar',
    summary: 'Theme-aware search input built on TextInput with search and clear actions.',
    importName: 'SearchBar',
    primaryProps: ['placeholder', 'animatedLabel', 'value', 'onSearch', 'onSubmitSearch', 'clearable', 'disabled'],
    variants: ['default', 'controlled', 'clearable', 'disabled'],
    bestPractices: ['Use for filtering lists and local search.', 'Keep placeholder text tied to the searched content.'],
    usage: usageExamples.searchBar,
  },
  {
    name: 'PhotoCarousel',
    slug: 'photo-carousel',
    summary: 'Swipeable image carousel with pagination dots and optional auto-scroll.',
    importName: 'PhotoCarousel',
    primaryProps: ['photos', 'carouselHeight', 'autoScroll', 'onPhotoChange'],
    variants: ['default', 'single image', 'auto scroll'],
    bestPractices: ['Use consistent image aspect ratios.', 'Avoid auto-scroll on dense forms.'],
    usage: usageExamples.photoCarousel,
  },
  {
    name: 'ClickableText',
    slug: 'clickable-text',
    summary: 'Text rendered as a pressable action.',
    importName: 'ClickableText',
    primaryProps: ['children', 'onPress', 'variant', 'textColor', 'disabled'],
    variants: ['default', 'inline link', 'disabled'],
    bestPractices: ['Use for small text actions.', 'Prefer buttons for primary actions.'],
    usage: usageExamples.clickableText,
  },
  {
    name: 'EmptyContent',
    slug: 'empty-content',
    summary: 'Empty state layout with icon, title, description, and action.',
    importName: 'EmptyContent',
    primaryProps: ['title', 'description', 'icon', 'isLoading'],
    variants: ['default', 'with action', 'custom icon'],
    bestPractices: ['Explain what happened and what to do next.', 'Use one clear recovery action.'],
    usage: usageExamples.emptyContent,
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    summary: 'Avatar image wrapper with size and rounded presentation.',
    importName: 'Avatar',
    primaryProps: ['imageUrl', 'height', 'width', 'borderRadius'],
    variants: ['image', 'small', 'large', 'placeholder'],
    bestPractices: ['Use stable square dimensions.', 'Provide fallbacks for missing user images.'],
    usage: usageExamples.avatar,
  },
  {
    name: 'NoInternet',
    slug: 'no-internet',
    summary: 'Network failure state with icon, copy, animation, and retry action.',
    importName: 'NoInternet',
    primaryProps: ['text', 'description', 'onRetry', 'animated', 'iconSize'],
    variants: ['default', 'static', 'custom copy'],
    bestPractices: ['Provide a retry path.', 'Use clear offline copy without blame.'],
    usage: usageExamples.noInternet,
  },
  {
    name: 'MultiSelect',
    slug: 'multi-select',
    summary: 'Searchable multi-select dropdown with badges, disabled items, and async loading support.',
    importName: 'MultiSelect',
    primaryProps: ['data', 'selectedValues', 'setSelected', 'search', 'placeholder'],
    variants: ['default', 'controlled', 'with disabled items', 'loading'],
    bestPractices: ['Use for longer option sets.', 'Keep selected badges scannable.'],
    usage: usageExamples.multiSelect,
  },
  {
    name: 'SelectList',
    slug: 'select-list',
    summary: 'Searchable single-select dropdown with default option and disabled item support.',
    importName: 'SelectList',
    primaryProps: ['data', 'setSelected', 'defaultOption', 'search', 'placeholder'],
    variants: ['default', 'searchable', 'disabled items', 'no search'],
    bestPractices: ['Use when options do not need to be visible all at once.', 'Provide a meaningful placeholder.'],
    usage: usageExamples.selectList,
  },
  {
    name: 'SlideModal',
    slug: 'slide-modal',
    summary: 'Animated slide-up modal for composed flows.',
    importName: 'SlideModal',
    primaryProps: ['children', 'ref'],
    variants: ['default', 'custom content'],
    bestPractices: ['Use for short focused flows.', 'Keep close behavior predictable.'],
    usage: usageExamples.slideModal,
  },
  {
    name: 'ScreenContainer',
    slug: 'screen-container',
    summary: 'Screen layout wrapper with safe spacing, loading, and error-friendly composition.',
    importName: 'ScreenContainer',
    primaryProps: ['children', 'containerStyle', 'bgColor', 'showHeader'],
    variants: ['default', 'scrollable content', 'custom background'],
    bestPractices: ['Use as the first layer inside app screens.', 'Keep screen-level padding consistent.'],
    usage: usageExamples.screenContainer,
  },
];

export const findComponent = (slug: string) =>
  components.find((component) => component.slug === slug);
