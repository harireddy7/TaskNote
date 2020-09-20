import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
  Button,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  content: {
    padding: '0.5rem 1rem'
  },
  controls: {
    justifyContent: 'center',
    paddingBottom: '1rem'
  }
}));

const ConfirmDialog = ({ message, confirmYes, confirmNo }) => {
  const classes = useStyles();
  return (
    <Dialog open>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>{message} ?</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.controls}>
        <Button variant="contained" color="secondary" size="small" onClick={confirmYes}>
          Sure
        </Button>
        <Button variant="contained" color="primary" size="small" onClick={confirmNo}>
          Dont
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
