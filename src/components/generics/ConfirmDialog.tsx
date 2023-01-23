import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { Col } from 'react-bootstrap';
import { BorderButton } from '../buttons/BorderButton';
import { SimpleButton } from '../buttons/SimpleButton';

export interface IConfirmDialogProps {
  title: string;
  message: string;
  actionBtnTitle: string;
  action?: any;
  open?: boolean;
  onClose?: any;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export function ConfirmDialog(props: IConfirmDialogProps) {
  //const style = `d-flex justify-content-end ${props.extraStyle}`;
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Button
        variant='outlined'
        onClick={handleClickOpen}
      >
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '300px!important',
          },
        }}
      >
        <DialogContent>
          <Col
            xs={12}
            className='justify-content-center '
          >
            <h5>{props.title}</h5>
          </Col>
          <Col
            xs={12}
            className='justify-content-center '
          >
            {props.message}
          </Col>
        </DialogContent>
        <DialogActions className='m-3 justify-content-center'>
          <Col xs={6}>
            <BorderButton
              variant='outlined'
              onClick={() => handleClose()}
            >
              Cancel
            </BorderButton>
          </Col>
          <Col xs={6}>
            <SimpleButton
              variant='contained'
              onClick={props.action}
            >
              {props.actionBtnTitle}
            </SimpleButton>
          </Col>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
