import * as React from 'react';
import './MyCharacterPage.css';
import Sidebar from '../../../../components/common/Sidebar.tsx';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography, createTheme } from '@mui/material';
import testimage from '../../../../assets/images/nathan-poole-asset.jpg';


type Props = {}
const NewCharacterPage = (props: Props) => {
    const editCharacterInfo = () => {
        window.location.href = '/dashboard/myCharacters/teste';
      };

    const typographyStyle = {
        fontFamily: 'Josefin Sans',
        fontSize: '18px',
    };
    const typographyStyleBold = {
        fontFamily: 'Josefin Sans',
        fontSize: '25px',
        fontWeight: 'bold',
    };

    return (
        <><Sidebar />
            <div className="Body">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    fontFamily="Josefin Sans"
                >
                    A editar as suas personagens
                </Typography>
                <Grid container spacing={2} padding={2} paddingTop={10} alignItems="center" justifyContent="center">
                    <Grid item>
                        <Card sx={{ maxWidth: 345, minHeight: 300 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={testimage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                                    Teste Nome 1
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                                    Venho por este meio escrever esta bio deste character para dizer que sou omegasexy e vou dar roll 20 7.4x seguidas
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <div className="EditButton">
                                    <Button size="small" onClick={editCharacterInfo}>Editar</Button>
                                </div>
                                <div className="DeleteButton">
                                    <Button size="small" >Eliminar</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item >
                        <Card sx={{ maxWidth: 345, minHeight: 300 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={testimage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                                    NOME CHARACTER
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                                    Venho por este meio escrever esta bio deste character para dizer que sou omegasexy e vou dar roll 20 7.4x seguidas
                                </Typography>
                            </CardContent>

                            <CardActions >
                                <div className="EditButton">
                                    <Button size="small">Editar</Button>
                                </div>
                                <div className="DeleteButton">
                                    <Button size="small" >Eliminar</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>

        </>



    );
};

export default NewCharacterPage;