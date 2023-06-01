import * as React from 'react';
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


const tiers = [
    {
        title: 'Utilizador Normal',
        price: '0',
        description: [
            '2 Slots Para Personagens',
            'Imagem Das Personagens Limitado a 150KB',
            'Não pode criar campanhas',
        ],
        buttonText: 'O seu tier',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pacote D&Ducks',
        subheader: 'Mais popular',
        price: '10',
        description: [
            '10 Slots Para Personagens',
            'Imagem Das Personagens Limitado a 5MB',
            'Pode Criar Campanhas',
            'Dados D&D Mensais',
        ],
        buttonText: 'Subscrever',
        buttonVariant: 'contained',
    },
    {
        title: 'Pacote dos Deuses',
        price: '30',
        description: [
            'Slots Ilimitados para Personagens',
            'Imagem Das Personagens Limitado 25MB',
            'Pode Criar Campanhas',
            'Dados D&D Mensais',
            'Dados D&D Mensais Premium Foil',
        ],
        buttonText: 'Subscrever',
        buttonVariant: 'contained',
        buttonColor: 'success',
    },

];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function PricingPage() {
    return (


        <ThemeProvider theme={defaultTheme}>
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
                                        <Button fullWidth variant={tier.buttonVariant} color={tier.buttonColor}>
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
        </ThemeProvider>
    );
}