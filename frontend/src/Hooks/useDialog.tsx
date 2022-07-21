import React from 'react';
import { Modal } from '@mui/material';

interface DialogProps {
  isOpen: boolean;
  handleClose: VoidFunctionNoArgs;
  children: React.ReactElement;
}

type DialogModes = 'ADD' | 'EDIT' | 'CONFIRM' | 'START' | 'END';
type Params = { [x: string]: any };

let resolve: (value: boolean | PromiseLike<boolean>) => void;

export function useDialog<T extends DialogModes>(initialMode: T) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [dialogMode, setDialogMode] = React.useState<T>(initialMode);
  const [params, setParams] = React.useState<Params>({});

  const handleClose = React.useCallback(() => {
    setParams({});
    setIsOpen(false);
    resolve(false);
  }, []);

  const handleSubmit = React.useCallback(() => {
    setParams({});
    setIsOpen(false);
    resolve(true);
  }, []);

  const handleOpen = React.useCallback((openMode: T, newParams?: Params): Promise<boolean> => {
    if (newParams) {
      setParams(newParams);
    }

    setDialogMode(openMode);
    setIsOpen(true);

    return new Promise((res) => {
      resolve = res;
    });
  }, []);

  return {
    dialogMode,
    isOpen,
    params,
    handleClose,
    handleOpen,
    handleSubmit
  };
}

export const DialogComponent = ({ isOpen, handleClose, children }: DialogProps): JSX.Element => (
  <Modal open={isOpen} onClose={handleClose}>
    <div>{children}</div>
  </Modal>
);
