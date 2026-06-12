export const gettingStarted = {
  title: 'Getting Started',
  code: `import {
  ThemeProvider,
  UiPortalProvider,
  Button,
  Text,
} from '@sohantalukder/rn-kit';

export function App() {
  return (
    <ThemeProvider>
      <UiPortalProvider>
        <Text variant="heading3" weight="semibold">
          Welcome
        </Text>
        <Button text="Continue" onPress={() => {}} />
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
