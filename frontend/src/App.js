import * as React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainLayout from './components/layout/MainLayout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
//function App() {
//  return (
//    <BrowserRouter>
//      <div>
//        <Routes>
//          <Route path="/" element={<Home />} />
//        </Routes>
//      </div>
//    </BrowserRouter>
//  );
//}

// export default App;
