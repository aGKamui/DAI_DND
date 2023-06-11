import React, { useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Sidebar from '../../../components/common/Sidebar.tsx';
import Cookies from 'js-cookie';
import { CardMedia } from '@mui/material';
import mbway from '../../../assets/images/mbway.png';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();







function CreateNewCharacterPage() {
    const [myStatus, setMyStatus] = useState("");
    const [freeText, setFreeText] = useState("-------");
    const [dolphinText, setDolphinText] = useState("-------");
    const [whaleText, setWhaleText] = useState("-------");
    const [preco, setPreco] = useState(0);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const tiers = [
        {
            title: 'Utilizador Normal',
            idref: 'Free',
            price: '0',
            description: [
                '2 Slots Para Personagens',
                'Imagem Das Personagens Limitado a 150KB',
                'Não pode criar campanhas',
            ],
            buttonText: freeText,
            buttonVariant: 'outlined',
        },
        {
            title: 'Pacote D&Ducks',
            subheader: 'Mais popular',
            idref: 'Dolphin',
            price: '10',
            description: [
                '10 Slots Para Personagens',
                'Imagem Das Personagens Limitado a 5MB',
                'Pode Criar Campanhas',
                'Dados D&D Mensais',
            ],
            buttonText: dolphinText,
            buttonVariant: 'contained',
        },
        {
            title: 'Pacote dos Deuses',
            price: '30',
            idref: 'Whale',
            description: [
                'Slots Ilimitados para Personagens',
                'Imagem Das Personagens Limitado 25MB',
                'Pode Criar Campanhas',
                'Dados D&D Mensais',
                'Dados D&D Mensais Premium Foil',
            ],
            buttonText: whaleText,
            buttonVariant: 'contained',
            buttonColor: 'success',
        },

    ];

    async function getUserStatus() {
        try {
            const response = await fetch('http://localhost:8000/api/user/type', {
                method: "GET",
                headers: {
                    'auth': Cookies.get("Token"),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            const jsonData = await response.json();
            setMyStatus(jsonData);
            console.log(jsonData)



        } catch (error) {
            console.error('Error fetching data:', error);
            window.location.href = '/login';
        }
    }

    async function paymentUpdate(event) {
        console.log(event.target.value)
        if (event.target.value === "Free") {
            setPreco(0)
        } else if (event.target.value === "Dolphin") {
            setPreco(10)
        } else if (event.target.value === "Whale") {
            setPreco(30)
        }
        console.log(myStatus)
        if (event.target.value !== myStatus) {
            try {
                const response = await fetch('http://localhost:8000/api/user/update', {
                    method: "PUT",
                    headers: {
                        'auth': Cookies.get("Token"),
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "type": event.target.value
                        }
                    ),
                })
                paymentProcessingVariable()


            } catch (error) {
                console.error('Error fetching data:', error);
                window.location.href = '/login';
            }
        }

    }




    useEffect(() => {
        if (myStatus === "Free") {
            setFreeText("O SEU TIER")
            setDolphinText("SUBSCREVER")
            setWhaleText("SUBSCREVER")
        } else if (myStatus === "Dolphin") {
            setFreeText("CANCELAR SUBSCRIÇÃO")
            setDolphinText("O SEU TIER")
            setWhaleText("SUBSCREVER")
        } else if (myStatus === "Whale") {
            setFreeText("CANCELAR SUBSCRIÇÃO")
            setDolphinText("REDUZIR A SUA SUBSCRIÇÃO")
            setWhaleText("O SEU TIER")
        }

    }, [myStatus]);

    useEffect(() => {
        getUserStatus()
    }, []);

  
    function paymentProcessingVariable() {
        setPaymentProcessing(!paymentProcessing) 
        //window.location.href = '/dashboard/payments';        
    }
    function resetPage() {
        window.location.reload()     
    }

   
    if (!paymentProcessing) {
        return (


            < ThemeProvider theme={defaultTheme} >
                <Sidebar />
                <div className="DashBoard">
                    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                    <CssBaseline />
                    {/* Hero unit */}
                    <Container disableGutters maxWidth="md" component="main" sx={{ pt: 2, pb: 6 }}>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                            fontFamily="Josefin Sans"
                        >
                            Subscrições
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" component="p">
                            Subscreva ao nosso serviço e desvende um mundo de aventuras ilimitadas.
                            Com a possibilidade de criar as suas próprias campanhas, terá a total liberdade para dar vida a histórias épicas,
                            desafiar seus amigos e mergulhar num universo fantástico de heróis e monstros.
                        </Typography>
                    </Container>
                    {/* End hero unit */}
                    <Container maxWidth="lg" component="main">
                        <Grid container spacing={5} alignItems="center" justifyContent="center">
                            {tiers.map((tier) => (
                                // Enterprise card is full width at sm breakpoint
                                <Grid
                                    item
                                    key={tier.title}
                                    xs={12}
                                    md={4}
                                >
                                    <Card>
                                        <CardHeader
                                            title={tier.title}
                                            subheader={tier.subheader}
                                            titleTypographyProps={{ align: 'center' }}
                                            action={tier.title === 'Pacote D&Ducks' ? <StarIcon /> : null}
                                            subheaderTypographyProps={{
                                                align: 'center',
                                            }}
                                            sx={{
                                                backgroundColor: (theme) =>
                                                    theme.palette.mode === 'light'
                                                        ? theme.palette.grey[200]
                                                        : theme.palette.grey[700],
                                            }}
                                        />
                                        <CardContent>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'baseline',
                                                    mb: 2,
                                                }}
                                            >
                                                {tier.price == 0 ? (
                                                    <Typography variant="h6" color="text.secondary">
                                                        Grátis
                                                    </Typography>
                                                ) : (
                                                    <Typography variant="h6" color="text.secondary">
                                                        €{tier.price}/por mês
                                                    </Typography>
                                                )}





                                            </Box>
                                            <ul>
                                                {tier.description.map((line) => (
                                                    <Typography
                                                        component="li"
                                                        variant="subtitle1"
                                                        align="center"
                                                        key={line}
                                                    >
                                                        {line}
                                                    </Typography>
                                                ))}
                                            </ul>
                                        </CardContent>
                                        <CardActions>
                                            <Button fullWidth variant={tier.buttonVariant} value={tier.idref} onClick={paymentUpdate} color={tier.buttonColor}>
                                                {tier.buttonText}
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="h6" align="center" color="text.secondary" component="p" paddingTop={5}>

                            Prepare-se para uma jornada emocionante onde sua imaginação é o único limite.
                        </Typography>
                    </Container>
                </div>
            </ThemeProvider >
        );
    } else {
        return (
            < ThemeProvider theme={defaultTheme} >
                <Sidebar />
                <div className="DashBoard">
                    <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                    <CssBaseline />
                    {/* Hero unit */}
                    <Container disableGutters maxWidth="md" component="main" sx={{ pt: 2, pb: 6 }}>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                            fontFamily="Josefin Sans"
                        >
                            Referencia
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                            fontFamily="Josefin Sans"
                        >
                            9874416
                        </Typography>
                        <Typography variant="h6" align="center" color="text.secondary" component="p">
                            Detalhes da ordem:
                        </Typography>
                        <Typography paddingTop={2} variant="h4" align="center" component="p" fontFamily="Josefin Sans">
                            Custo {preco} € [Custo Mensal]
                        </Typography>
                        <Typography paddingTop={2} variant="h6" align="center" color="text.secondary" component="p">
                            Receberá uma notificação na aplicação MBWAY para que confirme o pagamento utilizando o seu PIN MBWAY.
                            Após completar esta confirmação o pagamento está concluido.
                        </Typography>
                    </Container>
                    <CardMedia sx={{ maxWidth: 256, margin: 'auto' }}
                        component="img"

                        image={mbway}
                    />

                    <Button variant="contained" fullWidth onClick={resetPage} color="success" style={{ marginLeft: 10 }}>
                        Concluir Pagamento
                    </Button>
                </div>
            </ThemeProvider >
        );
    }

}


export default CreateNewCharacterPage;