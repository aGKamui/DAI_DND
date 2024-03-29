import * as React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Pricing from './pages/dashboard/pricing/Pricing.tsx';
import EditCharacterPage from './pages/dashboard/character/edit/EditCharacterPage.tsx';
import CreateNewCharacterPage from './pages/dashboard/character/add/NewCharacterPage.tsx';
import CreateNewCampaignPage from './pages/dashboard/campaigns/NewCampaignPage.tsx';
import Logout from './pages/dashboard/logout.tsx';



function App() {
  return (
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DefaultPage />} />
        <Route path="/dashboard/myCharacters" element={<NewCharacterPage />} />

        <Route path="/dashboard/newCharacter" element={<CreateNewCharacterPage />} />
        <Route path="/dashboard/newCampaign" element={<CreateNewCampaignPage />} />
        <Route path="/dashboard/MyCampaigns" element={<NewCampaignPage />} />
        <Route path="/dashboard/payments" element={<Pricing />} />
        <Route path="/dashboard/myCharacters/:id" element={<EditCharacterPage />} />
        {/*<Route path='*' element={<Navigate to="/login" replace={true} />} /> */}
        <Route path="/dashboard/profile" element={<Perfil />} />
        <Route path="/dashboard/logout" element={<Logout />} />
      </Routes>
  );
}

export default App;