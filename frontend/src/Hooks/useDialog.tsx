import React from 'react';
import { Modal } from '@mui/material';

interface DialogProps {
  isOpen: boolean;
  handleClose: VoidFunctionNoArgs;
  children: React.ReactElement;
}

type DialogModes = 'ADD' | 'EDIT' | 'CONFIRM';
type Params = { [x: string]: any };

export function useDialog<T extends DialogModes>(initialMode: T) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [dialogMode, setDialogMode] = React.useState<T>(initialMode);
  const [params, setParams] = React.useState<Params>({});

  const handleClose = () => setIsOpen(false);

  const handleOpen = (openMode: T, newParams?: Params) => {
    if (newParams) {
      setParams(newParams);
    }

    setDialogMode(openMode);
    setIsOpen(true);
  };

  return {
    dialogMode,
    isOpen,
    params,
    handleClose,
    handleOpen
  };
}

export const DialogComponent = ({ isOpen, handleClose, children }: DialogProps): JSX.Element => (
  <Modal open={isOpen} onClose={handleClose}>
    <div>{children}</div>
  </Modal>
);
