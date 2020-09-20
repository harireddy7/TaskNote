import React from 'react';
import { ThemeProvider, CssBaseline, createMuiTheme, makeStyles } from '@material-ui/core';

import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#4B0082',
      light: '#ACD7AE',
      // dark: '#FFA5A5',
      dark: '#6E67C2'
    },
    light: {
      main: '#FFF',
      light: '#EEF5FF',
      dark: '#D8DBF0'
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif"
  }
});

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateRows: '40px auto 40px'
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <div className={classes.container}>
        <Header />
        <Main />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
