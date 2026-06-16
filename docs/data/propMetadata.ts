import type { ComponentDoc } from './componentRegistry';

type PropMetadata = {
  type: string;
  defaultValue: string;
  description: string;
};

const metadataByProp: Record<string, PropMetadata> = {
  animated: {
    type: 'boolean',
    defaultValue: 'true',
    description: 'Enables or disables the animated presentation for the state view.',
  },
  autoScroll: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Automatically advances carousel items on an interval.',
  },
  backgroundColor: {
    type: 'ColorValue',
    defaultValue: 'theme',
    description: 'Overrides the native status bar background color.',
  },
  barStyle: {
    type: 'StatusBarStyle',
    defaultValue: 'theme',
    description: 'Controls light or dark status bar content.',
  },
  bgColor: {
    type: 'ColorValue',
    defaultValue: 'theme',
    description: 'Overrides the screen background color supplied by the theme.',
  },
  borderRadius: {
    type: 'number',
    defaultValue: '0',
    description: 'Controls corner rounding for image, avatar, or surface content.',
  },
  buttonText: {
    type: 'string',
    defaultValue: '-',
    description: 'Label rendered inside the optional action button.',
  },
  buttons: {
    type: 'DialogButton[]',
    defaultValue: '[]',
    description: 'Action definitions rendered in the dialog footer.',
  },
  callback: {
    type: '(value: string) => void',
    defaultValue: '-',
    description: 'Called when the input has collected the expected number of digits.',
  },
  checked: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the control as selected and updates its visual state.',
  },
  children: {
    type: 'ReactNode',
    defaultValue: '-',
    description: 'Content rendered inside the component surface.',
  },
  color: {
    type: 'ColorValue',
    defaultValue: 'theme',
    description: 'Overrides the component color while preserving layout and behavior.',
  },
  data: {
    type: 'SelectItem[]',
    defaultValue: '[]',
    description: 'Option collection used to render selectable dropdown rows.',
  },
  defaultOption: {
    type: 'SelectItem',
    defaultValue: '-',
    description: 'Initial selected option shown before the user chooses another value.',
  },
  description: {
    type: 'string',
    defaultValue: '-',
    description: 'Supporting copy shown below the title or primary message.',
  },
  disabled: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Prevents interaction and renders the disabled visual state.',
  },
  dotColor: {
    type: 'ColorValue',
    defaultValue: 'theme error',
    description: 'Overrides the notification dot color.',
  },
  dotSize: {
    type: 'number',
    defaultValue: '8',
    description: 'Sets the notification dot diameter.',
  },
  duration: {
    type: 'number',
    defaultValue: '300',
    description: 'Animation duration in milliseconds.',
  },
  elevation: {
    type: 'number',
    defaultValue: '0',
    description: 'Controls shadow depth for elevated card surfaces.',
  },
  enableSwipeToClose: {
    type: 'boolean',
    defaultValue: 'true',
    description: 'Allows the sheet to dismiss through a swipe gesture.',
  },
  errorMessage: {
    type: 'string',
    defaultValue: '-',
    description: 'Validation message rendered below the input.',
  },
  height: {
    type: 'number | string',
    defaultValue: '-',
    description: 'Sets the rendered height of the component.',
  },
  icon: {
    type: 'IconKey | ReactNode',
    defaultValue: '-',
    description: 'Icon rendered before content or as the primary visual affordance.',
  },
  iconColor: {
    type: 'ColorValue',
    defaultValue: 'theme',
    description: 'Overrides the icon fill or stroke color.',
  },
  iconSize: {
    type: 'number',
    defaultValue: 'theme',
    description: 'Sets the rendered icon dimensions.',
  },
  isLoading: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows a loading indicator and prevents duplicate submissions.',
  },
  animatedLabel: {
    type: 'boolean',
    defaultValue: 'component default',
    description: 'Floats the label inside the field when focused or filled.',
  },
  label: {
    type: 'string',
    defaultValue: '-',
    description: 'Human-readable text associated with the form control.',
  },
  length: {
    type: 'number',
    defaultValue: '6',
    description: 'Number of one-time-password digits to collect.',
  },
  max: {
    type: 'number',
    defaultValue: '100',
    description: 'Maximum value allowed by the slider.',
  },
  maxHeight: {
    type: 'number | string',
    defaultValue: '-',
    description: 'Maximum height the sheet can occupy before scrolling.',
  },
  message: {
    type: 'string',
    defaultValue: '-',
    description: 'Primary body message rendered inside feedback components.',
  },
  min: {
    type: 'number',
    defaultValue: '0',
    description: 'Minimum value allowed by the slider.',
  },
  numberOfLines: {
    type: 'number',
    defaultValue: '4',
    description: 'Preferred line count for multiline text entry.',
  },
  onChange: {
    type: '(value: boolean) => void',
    defaultValue: '-',
    description: 'Called when the selected state changes.',
  },
  onClose: {
    type: '() => void',
    defaultValue: '-',
    description: 'Called when the component requests to close.',
  },
  onDismiss: {
    type: '() => void',
    defaultValue: '-',
    description: 'Called after a transient message is dismissed.',
  },
  onPress: {
    type: '() => void',
    defaultValue: '-',
    description: 'Called when the pressable component is activated.',
  },
  onRequestClose: {
    type: '() => void',
    defaultValue: '-',
    description: 'Required close handler for modal and overlay dismissal.',
  },
  onRetry: {
    type: '() => void',
    defaultValue: '-',
    description: 'Called when the user taps the retry action.',
  },
  onValueChange: {
    type: '(value: number) => void',
    defaultValue: '-',
    description: 'Called as the slider value changes.',
  },
  padding: {
    type: 'number',
    defaultValue: 'theme',
    description: 'Overrides the internal spacing of the component surface.',
  },
  path: {
    type: 'IconKey',
    defaultValue: '-',
    description: 'Registry key used to resolve the local SVG icon.',
  },
  photos: {
    type: 'PhotoItem[]',
    defaultValue: '[]',
    description: 'Images rendered by the carousel.',
  },
  placeholder: {
    type: 'string',
    defaultValue: '-',
    description: 'Hint text shown before a value is entered or selected.',
  },
  pressable: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Makes the entire card surface respond to press events.',
  },
  required: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Marks the field as required in its label presentation.',
  },
  resizeMode: {
    type: 'ImageResizeMode',
    defaultValue: 'cover',
    description: 'Controls how the source image fits its bounds.',
  },
  rippleColor: {
    type: 'ColorValue',
    defaultValue: 'theme',
    description: 'Color used for the press feedback ripple.',
  },
  scrollable: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Wraps screen content in a scroll container when enabled.',
  },
  search: {
    type: 'boolean',
    defaultValue: 'true',
    description: 'Shows a text input for filtering dropdown options.',
  },
  selected: {
    type: 'string | number | boolean',
    defaultValue: '-',
    description: 'Current selected value for controlled selection components.',
  },
  selectedValues: {
    type: '(string | number)[]',
    defaultValue: '[]',
    description: 'Current selected values for controlled multi-select usage.',
  },
  setSelected: {
    type: '(value) => void',
    defaultValue: '-',
    description: 'Receives the selected option value when the user chooses an item.',
  },
  showDots: {
    type: 'boolean',
    defaultValue: 'true',
    description: 'Shows pagination dots beneath carousel content.',
  },
  showDot: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Shows a small notification dot on an icon button.',
  },
  size: {
    type: 'ComponentSize | number',
    defaultValue: 'medium',
    description: 'Controls the rendered component scale.',
  },
  source: {
    type: 'ImageSourcePropType',
    defaultValue: '-',
    description: 'Image source object or asset reference.',
  },
  step: {
    type: 'number',
    defaultValue: '1',
    description: 'Granularity used when moving between slider values.',
  },
  style: {
    type: 'StyleProp<ViewStyle>',
    defaultValue: '-',
    description: 'Additional style object merged into the root element.',
  },
  text: {
    type: 'string',
    defaultValue: '-',
    description: 'Primary text rendered by the component.',
  },
  textColor: {
    type: 'TextColor',
    defaultValue: 'primary',
    description: 'Overrides the clickable text color token.',
  },
  title: {
    type: 'string',
    defaultValue: '-',
    description: 'Short heading rendered at the top of the component.',
  },
  translucent: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Allows content to render underneath the status bar.',
  },
  type: {
    type: 'ToastType',
    defaultValue: 'info',
    description: 'Visual tone used for the feedback message.',
  },
  value: {
    type: 'string | number | boolean',
    defaultValue: '-',
    description: 'Controlled value rendered by the input or control.',
  },
  variant: {
    type: 'string',
    defaultValue: 'default',
    description: 'Selects the visual style variant for the component.',
  },
  visible: {
    type: 'boolean',
    defaultValue: 'false',
    description: 'Controls whether the overlay or modal is mounted and shown.',
  },
  weight: {
    type: 'TextWeight',
    defaultValue: 'regular',
    description: 'Font weight token applied to text content.',
  },
  width: {
    type: 'number | string',
    defaultValue: '-',
    description: 'Sets the rendered width of the component.',
  },
};

const componentOverrides: Record<string, Record<string, Partial<PropMetadata>>> = {
  checkbox: {
    checked: {
      description: 'Controls whether the checkbox is checked.',
    },
    onChange: {
      description: 'Receives the next checked value when the checkbox is toggled.',
    },
  },
  radio: {
    selected: {
      type: 'boolean',
      description: 'Controls whether this radio option is selected.',
    },
    onChange: {
      description: 'Called when the radio option is selected.',
    },
  },
  text: {
    variant: {
      type: 'TypographySize',
      description: 'Applies a typography preset from the theme.',
    },
    color: {
      type: 'TextColor',
      description: 'Applies a semantic text color token.',
    },
  },
};

function humanize(prop: string) {
  return prop.replace(/([A-Z])/g, ' $1').toLowerCase();
}

export function getPropMetadata(component: ComponentDoc, prop: string): PropMetadata {
  const base = metadataByProp[prop] ?? {
    type: 'unknown',
    defaultValue: '-',
    description: `Configures ${humanize(prop)} for ${component.name}.`,
  };
  const override = componentOverrides[component.slug]?.[prop] ?? {};

  if (prop === 'variant') {
    return {
      ...base,
      ...override,
      type: component.variants.map((variant) => `"${variant}"`).join(' | '),
    };
  }

  return {
    ...base,
    ...override,
  };
}
