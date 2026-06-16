export const gettingStarted = {
  title: 'Getting Started',
  code: `import { useState } from 'react';
import { View } from 'react-native';
import {
  ThemeProvider,
  UiPortalProvider,
  Button,
  Card,
  Text,
  TextInput,
  toast,
  useTheme,
} from '@sohantalukder/rn-kit';

function AccountScreen() {
  const [email, setEmail] = useState('');
  const { gutters, layout } = useTheme();

  const handleSubmit = () => {
    if (!email.includes('@')) {
      toast.show({ type: 'error', title: 'Enter a valid email' });
      return;
    }

    toast.show({ type: 'success', title: 'Profile saved' });
  };

  return (
    <View style={[layout.flex_1, layout.justifyCenter, gutters.padding_24]}>
      <Card variant="outlined" style={gutters.gap_16}>
        <Text variant="heading3" weight="semibold">
          Account setup
        </Text>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
        />
        <Button text="Save profile" onPress={handleSubmit} />
      </Card>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <AccountScreen />
      </UiPortalProvider>
    </ThemeProvider>
  );
}`,
  notes: [
    'Mount ThemeProvider once near the app root.',
    'Mount UiPortalProvider when using toast, dialog, bottom sheet, or context menu managers.',
    'Import public components from @sohantalukder/rn-kit.',
  ],
};
