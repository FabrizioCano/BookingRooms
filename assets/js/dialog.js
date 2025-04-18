

import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function ConfirmationDialog({ title, content,onConfirm, onCancel,open,setOpen }) {
  

    const handleClose = () => {
        setOpen(false);
        if (onCancel) onCancel();
    };

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
    };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}