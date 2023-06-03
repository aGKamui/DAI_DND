import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
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
import MainLayout from './components/layout/MainLayout.tsx';
import HomePage from './pages/home/HomePage.tsx';
import { routes } from './routes/index.tsx';
import $ from "jquery";
import SignIn from './pages/login/LoginPage.js';
import Register from './pages/login/RegisterPage.js';
import DefaultPage from './pages/dashboard/DefaultPage.tsx';
import Perfil from './pages/dashboard/perfil/Perfil.tsx';
import NewCharacterPage from './pages/dashboard/character/edit/MyCharacterPage.tsx';
import NewCampaignPage from './pages/dashboard/campaigns/MyCampaignPage.tsx';
import Pricing from './pages/dashboard/pricing/Pricing.js';

function App() {
  return (
      <Routes>      
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />}/>  
        <Route path="/dashboard" element={<DefaultPage />}/> 
        <Route path="/dashboard/newCharacter" element={<NewCharacterPage />}/>  
        <Route path="/dashboard/MyCampaigns" element={<NewCampaignPage />}/>  
        <Route path="/dashboard/payments" element={<Pricing />}/>  
        
        
        <Route path='*' element={<Navigate to="/login" replace={true} />} /> 
        <Route path="/dashboard/profile" element={<Perfil />}/> 
      </Routes>
  );
}

export default App;