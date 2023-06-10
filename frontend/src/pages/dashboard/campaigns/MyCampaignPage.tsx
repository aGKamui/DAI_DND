import * as React from 'react';
import './MyCampaignPage.css';
import Sidebar from '../../../components/common/Sidebar.tsx';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography, createTheme } from '@mui/material';
import testimage from '../../../assets/images/Fantasy_World.png';
import testimage2 from '../../../assets/images/Fantasy_World2.png';
import testimage3 from '../../../assets/images/Fantasy_World3.jpeg';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


type Props = {}
const NewCampaignPage = (props: Props) => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/api/campaign/', {
                method: "GET",
                headers: {
                    'auth': Cookies.get("Token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    
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
                    {data.map((item, index) => (
                        <Grid item >
                            <Card sx={{ maxWidth: 345, minHeight: 300 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={testimage}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                                        {item.bio}
                                    </Typography>
                                </CardContent>

                                <CardActions >
                                    <div className="EditButton">
                                        <Button size="small" >Continuar</Button>
                                        
                                    </div>
                                    <div className="DeleteButton">
                                        <Button size="small" >Eliminar</Button>
                                    </div>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>

        </>



    );
};

export default NewCampaignPage;