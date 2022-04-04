import React from 'react';
import { Modal } from '@mui/material';

interface DialogProps {
  isOpen: boolean;
  handleClose: VoidFunctionNoArgs;
  children: React.ReactElement;
}

type DialogModes = 'ADD' | 'EDIT' | 'CONFIRM';

export function useDialog<T extends DialogModes>(initialMode: T) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [dialogMode, setDialogMode] = React.useState<T>(initialMode);

  const handleClose = () => setIsOpen(false);

  const handleOpen = (openMode: T) => {
    setDialogMode(openMode);
    setIsOpen(true);
  };

  return {
    dialogMode,
    isOpen,
    handleClose,
    handleOpen
  };
}

export const DialogComponent = ({ isOpen, handleClose, children }: DialogProps): JSX.Element => (
  <Modal open={isOpen} onClose={handleClose}>
    <div>{children}</div>
  </Modal>
);
