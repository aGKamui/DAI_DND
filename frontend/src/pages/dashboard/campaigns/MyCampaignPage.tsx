import * as React from 'react';
import './MyCampaignPage.css';
import Sidebar from '../../../components/common/Sidebar.tsx';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography, createTheme } from '@mui/material';
import testimage from '../../../assets/images/Fantasy_World.png';
import testimage2 from '../../../assets/images/Fantasy_World2.png';
import testimage3 from '../../../assets/images/Fantasy_World3.jpeg';


type Props = {}
const NewCharacterPage = (props: Props) => {
    const typographyStyle = {
        fontFamily: 'Josefin Sans',
        fontSize: '18px',
        minHeight: '100px',
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
                    Seleccione uma das suas campanhas
                </Typography>
                <Grid container spacing={2} padding={2} paddingTop={10} alignItems="center" justifyContent="center">
                <Grid item>
                        <Card sx={{ maxWidth: 345, minHeight: 387 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={testimage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                                    Campanha UAC
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={typographyStyle} >
                                    Venho por este meio escrever esta bio deste character para dizer que sou omegasexy e vou dar roll 20 7.4x seguidas
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <div className="EditButton">
                                    <Button size="small">Continuar</Button>
                                </div>
                                <div className="DeleteButton">
                                    <Button size="small" >Eliminar</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item >
                        <Card sx={{ maxWidth: 345, minHeight: 387 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={testimage2}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                                    Campanha YAYA
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                                AYAYAAYAYAAYAYAAYAYAAY
                                </Typography>
                            </CardContent>

                            <CardActions >
                                <div className="EditButton">
                                    <Button size="small">Continuar</Button>
                                </div>
                                <div className="DeleteButton">
                                    <Button size="small" >Eliminar</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item >
                        <Card sx={{ maxWidth: 345, minHeight: 387 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={testimage3}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                                    Campanha Crazy Rabaça
                                </Typography>
                                <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                                    Campanha doida 3
                                </Typography>
                            </CardContent>

                            <CardActions >
                                <div className="EditButton">
                                    <Button size="small">Continuar</Button>
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