import { commonIconNames } from './CommonIcons.names';

export const iconNames = [
  ...commonIconNames,
  'cancel',
  'check',
  'delete',
  'downArrow',
  'emptyContent',
  'error',
  'eyeOff',
  'eyeOn',
  'language',
  'leftArrow',
  'loader',
  'lock',
  'logout',
  'more',
  'noInternet',
  'notification',
  'placeholder',
  'profile',
  'refresh',
  'reset',
  'search',
  'send',
  'share',
  'success',
  'theme',
] as const;

export type IconName = (typeof iconNames)[number];
