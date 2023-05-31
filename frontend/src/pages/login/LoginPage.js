import * as React from 'react';
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
import $ from "jquery";
import { useEffect } from 'react';
import { Route, Routes, BrowserRouter  } from 'react-router-dom';
import Register from './RegisterPage.js';

const defaultTheme = createTheme();

function SignIn() {

  const sendToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    $.ajax({
      method: 'POST',
      dataType: 'json',
      url: 'http://localhost:8000/api/auth/login',
      contentType: 'application/json',
      headers: {
        'Access-Control-Allow-Credentials' : true ,
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'GET,OPTIONS,PATCH,DELETE,POST,PUT' ,
        'Access-Control-Allow-Headers' : 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
    },
      cache: false,
      data: JSON.stringify({ username: data.get('email'), password: data.get('password') }),
      success: function() {
        sendToDashboard()    
      },
      error: function(xhr, status, error) { console.log(error); }
    });

  };
  return (
        
    <ThemeProvider theme={defaultTheme}>
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Efetuar Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email de Utilizador"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar este computador"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não tem uma conta? Efetue o Registo!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
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
