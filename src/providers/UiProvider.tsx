import React from 'react';
import { ToastContainer } from './toast';
import { DialogContainer } from './dialog';
import { BottomSheetContainer } from './bottom-sheet';
import { ContextMenuContainer } from './context-menu';

const UiPortalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <DialogContainer />
      <ToastContainer />
      <ContextMenuContainer />
      <BottomSheetContainer />
      {children}
    </>
  );
};

export default UiPortalProvider;
