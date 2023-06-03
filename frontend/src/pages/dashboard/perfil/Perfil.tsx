import React from 'react';
import Sidebar from '../../../components/common/Sidebar.tsx';
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
import './Perfil.css';
import profilepic from '../../../assets/images/chryspfp.png';

const defaultTheme = createTheme();
type Props = {}
const Perfil = (props: Props) => {
  return (

    <><Sidebar /><div className="DashBoard">
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
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontFamily="Josefin Sans"
            >
              O meu perfil
            </Typography>
            <Avatar src= {profilepic} sx={{ width: 75, height: 75 }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Chrystello
            </Typography>

            <Typography component="h1" variant="h6" fontSize={20}>
              Sua subscrição atual: Grátis
            </Typography>
            <Typography component="h1" variant="h6" fontSize={15}>
              Duração restante - 26:30:00 (1 Dia, 1 Hora e 30 Minutos)
            </Typography>
            <Grid container direction={"column"} spacing={2} alignItems={'center'} paddingTop={5}>
              <Grid item>
                O Seu Email
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  id="filled-disabled"
                  label="teste@teste.pt"
                  defaultValue="teste@teste.pt"
                  variant="filled"
                />
              </Grid>
              <Grid item>
                A Sua Password
              </Grid>
              <Grid item>
                <TextField
                  id="filled-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  variant="filled"
                />
              </Grid>
              <Grid item>
                <Button variant="contained">Alterar Password</Button>
              </Grid>
            </Grid>



          </Box>


        </Container>
      </ThemeProvider>

    </div></>

  );
};

export default Perfil;