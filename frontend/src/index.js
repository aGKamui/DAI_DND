import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './pages/login/LoginPage.js';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals.js';
import { CssBaseline } from '@mui/material';
import { store } from './redux/store.ts';
import App from './App';
import { Route, Routes, BrowserRouter  } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <BrowserRouter>
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline/>
      <App />
    </Provider>
  </React.StrictMode>
  
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
