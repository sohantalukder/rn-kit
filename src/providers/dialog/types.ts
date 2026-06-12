import type { DialogProps } from '../../components/atoms/dialog/Dialog';

export type DialogManagerProps = Omit<DialogProps, 'visible' | 'onDismiss'>;
