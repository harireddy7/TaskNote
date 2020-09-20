import React from 'react';
import { AppBar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  headerContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontWeight: '600',
    backgroundColor: '#4B0082'
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.headerContainer}>
      {/* <Toolbar> */}
      <Typography>TaskNote</Typography>
      {/* </Toolbar> */}
    </AppBar>
  );
};

export default Header;
