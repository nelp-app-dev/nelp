import { createMuiTheme, ThemeOptions, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as common from '@nelp/common';
// import * as common from '../../../common/dist/index';
// common.toto();

export const themeOptions: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#ff4e50',
    },
    background: {
      default: '#eeeeee',
      paper: '#ffffff',
    },
    action: {
      active: '#e87162',
    },
  },
  typography: {
    fontFamily: 'Titillium Web',
    fontWeightLight: 200,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 600,
    h1: {
      fontWeight: 200,
    },
  },
};

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createMuiTheme(themeOptions)}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
