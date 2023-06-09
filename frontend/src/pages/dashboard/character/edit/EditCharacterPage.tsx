import React, { useEffect, useState } from 'react';
import "./EditCharacterPage.css";
import { useParams } from "react-router-dom";
import Sidebar from '../../../../components/common/Sidebar.tsx';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, Grid, TextField, Typography, createTheme } from '@mui/material';
import testimage from '../../../../assets/images/nathan-poole-asset.jpg';
import strength from '../../../../assets/images/strength.png';
import charisma from '../../../../assets/images/charisma.png';
import dexterity from '../../../../assets/images/dexterity.png';
import hp from '../../../../assets/images/hp.png';
import intelligence from '../../../../assets/images/intelligence.png';
import proficiency from '../../../../assets/images/proficiency.png';
import speed from '../../../../assets/images/speed.png';
import wisdom from '../../../../assets/images/wisdom.png';
import constitution from '../../../../assets/images/constitution.png';
import Cookies from 'js-cookie';
import { DoubleBubble }
  from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css'

function CharacterPage() {
  const [charData, setCharData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let url = window.location.href;

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let url_string = url.split('/');
    url = url_string[url_string.length - 1]; //parse char id
    try {
      const response = await fetch('http://localhost:8000/api/character/' + url, {
        method: "GET",
        headers: {
          'auth': Cookies.get("Token"),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      const jsonData = await response.json();
      setCharData(jsonData);
      console.log(jsonData)
      setIsLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const typographyStyle = {
    fontFamily: 'Josefin Sans',
    fontSize: '18px',
    paddingTop: '10px'
  };
  const typographyStyleBold = {
    fontFamily: 'Josefin Sans',
    fontSize: '25px',
    fontWeight: 'bold',
    paddingTop: '10px'
  };

  if (isLoading) {
    return (
      <><DoubleBubble center={true} width={"300px"} height={"300px"} /><p style={{ fontSize: '40px', textAlign: "center", alignItems: "center", alignContent: "center", paddingTop: 250, paddingLeft: 220 }}>Loading...</p></>
    )

  }

  function handleChange(event): void {
    console.log(event.target.id);   
    console.log("a change");
    console.log(event.target.value);  
    console.log(charData.information.name)
    console.log(event.target.value == charData.information.name)
    updateCharacterInfo(charData,event.target.id);   

  }

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
          A editar a personagem "{charData.information.name}"
        </Typography>
        <Grid container spacing={2} padding={2} paddingTop={2} alignItems="center" justifyContent="center">
          <Grid item>
            <Card sx={{ maxWidth: 900, minHeight: 500 }}>
              <CardMedia
                component="img"
                height="300"
                image={testimage}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                  Nome da Personagem
                </Typography>
                <TextField
                  id="information/name"
                  variant="outlined"
                  defaultValue={charData.information.name}                   
                  onBlur={handleChange}/>
                <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                  Bio</Typography>
                <TextField 
                  id="character_bio"
                  multiline
                  fullWidth 
                  rows={4}
                  defaultValue={charData.information.bio}
                  variant="filled"
                />
              </CardContent>

              <Grid container spacing={5} padding={2} paddingTop={2} direction="row" alignItems="center" justifyContent="center">
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Strength

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={strength}
                    />
                    <div >0</div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Dexterity

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={dexterity}
                    />
                    <div >0</div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Constitution

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={constitution}
                    />
                    <div >0</div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Intelligence

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={intelligence}
                    />
                    <div >0</div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Wisdom

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={wisdom}
                    />
                    <div >0</div>
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Charisma

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={charisma}
                    />
                    <div >0</div>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={15} direction="row" alignItems="center" justifyContent='center'>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Health
                    <div>25 / 100 </div>

                    <Grid container spacing={15} alignItems="center" justifyContent='center'>
                      <Grid item>
                        <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                          component="img"

                          image={hp}
                        />

                        <div className='buttoncontainer'><Button variant="contained" color="success">  Heal  </Button>
                          <TextField sx={{ width: 60 }} hiddenLabel id="filled-hidden-label-small" defaultValue="0" variant="filled" size="small" />
                          <Button variant="contained" color="error">Damage</Button></div>


                      </Grid>
                    </Grid>


                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={15} paddingTop={5} direction="row" alignItems="center" justifyContent='center'>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>

                    Proficiency
                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"

                      image={proficiency}
                    />
                    <div >0</div>

                    Bonus
                  </Box>
                </Grid>
                <Grid item>
                  <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                    Walking

                    <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                      component="img"
                      image={speed}

                    />
                    <div >30ft</div>
                    Speed
                  </Box>

                </Grid>


              </Grid>

              <Button
                type="submit"

                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Atualizar Informações de Personagem
              </Button>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}


async function updateCharacterInfo(charData,typeOfInfo) {
  
  try {
    const response = await fetch('http://localhost:8000/api/character/' + charData._id +"/" + typeOfInfo, {
      method: "GET",
      headers: {
        'auth': Cookies.get("Token"),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response;
    console.log(jsonData);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default CharacterPage;
