import * as React from 'react';
import './MyCharacterPage.css';
import Sidebar from '../../../../components/common/Sidebar.tsx';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, Typography, createTheme } from '@mui/material';
import testimage from '../../../../assets/images/nathan-poole-asset.jpg';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import ConfirmationModal from './ConfirmationModal';

type Props = {}
const NewCharacterPage = (props: Props) => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = (itemID) => {
        // Perform the action on confirmation
        // ...
        deleteCharacterInfo(itemID)
        setShowModal(false); // Close the modal
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('http://localhost:8000/api/character/', {
                method: "GET",
                headers: {
                    'auth': Cookies.get("Token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const jsonData = await response.json();
            console.log("teste")
            setData(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const editCharacterInfo = (char_id) => {
        window.location.href = '/dashboard/myCharacters/' + char_id;
    };
    async function deleteCharacterInfo(char_id) {

        try {
            const response = await fetch('http://localhost:8000/api/character/' + char_id, {
                method: "DELETE",
                headers: {
                    'auth': Cookies.get("Token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const jsonData = await response.json();
            console.log(jsonData)
            window.location.href = '/dashboard/myCharacters/'
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
                                        {item.information.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" style={typographyStyle}>
                                        {item.information.bio}
                                    </Typography>
                                </CardContent>

                                <CardActions >
                                    <div className="EditButton">
                                        <Button size="small" onClick={() => editCharacterInfo(item._id)}>Editar</Button>

                                    </div>
                                    <div className="DeleteButton">
                                        <Button size="small" onClick={() => setShowModal(true)}>Eliminar</Button>
                                        <ConfirmationModal
                                            isOpen={showModal}
                                            onRequestClose={() => setShowModal(false)}
                                            onConfirm={handleConfirm}
                                            itemID={item._id} // Pass the item ID as a prop
                                        />
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

export default NewCharacterPage;