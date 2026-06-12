import type { ColorValue } from 'react-native';

export type ContextMenuItem = {
  id: string;
  label: string;
  onPress: () => void | Promise<void>;
  checked?: boolean;
  destructive?: boolean;
  disabled?: boolean;
  icon?: string;
  iconColor?: ColorValue;
  separator?: boolean;
};

export type ContextMenuSection = {
  id: string;
  title?: string;
  items: ContextMenuItem[];
};

export type ContextMenuPosition = {
  x: number;
  y: number;
};

export type ContextMenuTriggerBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ContextMenuConfig = {
  dismissOnSelect?: boolean;
  items?: ContextMenuItem[];
  maxWidth?: number;
  position?: ContextMenuPosition;
  sections?: ContextMenuSection[];
  showIcons?: boolean;
  subtitle?: string;
  title?: string;
  triggerBounds?: ContextMenuTriggerBounds;
};
