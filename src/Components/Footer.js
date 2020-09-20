import React from 'react';
import { AppBar, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footerContainer: {
    padding: '0rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#333',
    color: '#fff',
    '& .heart': {
      color: 'red'
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.footerContainer}>
      {/* <Toolbar> */}
      <Typography variant="caption">
        Made with <span className="heart">❤</span> in India | Hari Kotha
      </Typography>
      {/* </Toolbar> */}
    </AppBar>
  );
};

export default Footer;
