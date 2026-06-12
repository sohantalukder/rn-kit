import Dialog from '../../components/atoms/dialog/Dialog';
import React, { memo, useEffect, useState } from 'react';
import type { DialogManagerProps } from './types';
import { getDialogManager, setDialogManager } from './dialogManager';

const DialogContainer: React.FC = memo(() => {
  const [currentDialog, setCurrentDialog] = useState<DialogManagerProps | null>(
    null
  );
  useEffect(() => {
    setDialogManager(setCurrentDialog);

    return () => {
      setDialogManager(null);
    };
  }, []);

  return (
    <Dialog
      {...currentDialog}
      visible={!!currentDialog}
      onDismiss={() => getDialogManager().hide()}
    />
  );
});

export default DialogContainer;
