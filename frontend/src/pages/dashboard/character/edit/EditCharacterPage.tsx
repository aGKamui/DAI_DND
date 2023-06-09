import React, { useEffect, useRef, useState } from 'react';
import "./EditCharacterPage.css";
import { useParams } from "react-router-dom";
import Sidebar from '../../../../components/common/Sidebar.tsx';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, TextField, Typography, createTheme } from '@mui/material';

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
  const [amountDamage, setAmountDamage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);

  const [classData, setClassData] = useState([]);

  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [con, setCon] = useState(0);
  const [int, setInt] = useState(0);
  const [wis, setWis] = useState(0);
  const [cha, setCha] = useState(0);

  const [selectedClass, setSelectedClass] = useState('');

  const handleClassChange = (event: SelectChangeEvent) => {
    setSelectedClass(event.target.value as string);
  };

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

  const handleAmountChange = (event) => {
    setAmountDamage(event.target.value);
  };

  const handleHealClick = () => {
    updateHitPoints("Heal");
  };

  const handleDamageClick = () => {
    updateHitPoints("Damage");
  };


  const updateHitPoints = (type) => {
    const currentHitpoints = [...charData.hitpoints];
    let newHitpoints;
    if (type === "Heal") {
      newHitpoints = [currentHitpoints[0] + parseInt(amountDamage), currentHitpoints[1]];
      if (newHitpoints[0] > newHitpoints[1]) {
        newHitpoints = [currentHitpoints[1], currentHitpoints[1]]
      }

    } else if (type === "Damage") {
      newHitpoints = [currentHitpoints[0] - parseInt(amountDamage), currentHitpoints[1]];
      if (newHitpoints[0] < 0) {
        newHitpoints = [currentHitpoints[0], currentHitpoints[1]]
      }

    }


    setCharData((prevCharData) => ({
      ...prevCharData,
      hitpoints: newHitpoints,
    }));
  };



  async function updateCharacterInfo(charData) {
    try {
      const response = await fetch('http://localhost:8000/api/character/' + charData._id + "", {
        method: "PUT",
        headers: {
          'auth': Cookies.get("Token"),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "abilityscores": {
              "str": str,
              "dex": dex,
              "con": con,
              "int": int,
              "wis": wis,
              "cha": cha
            },
            "hitpoints": [charData.hitpoints[0], charData.hitpoints[1]],
            "information": charData.information
          }
        ),

      })
      const jsonData = await response;
      console.log(jsonData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, [classData]);
  async function getClassInfoAPI() {



    try {
      setIsLoading(true);
      const response = await fetch('https://www.dnd5eapi.co/api/classes', {
        method: "GET"
      })
      const jsonData = await response.json();
      setClassData(jsonData["results"]);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  if (isLoading) {
    return (
      <><DoubleBubble center={true} width={"300px"} height={"300px"} /><p style={{ fontSize: '40px', textAlign: "center", alignItems: "center", alignContent: "center", paddingTop: 250, paddingLeft: 220 }}>Loading...</p></>
    )

  }

  function updateName(value) {
    charData.information.name = value;
  }

  function updateBio(value) {
    charData.information.bio = value;
  }



  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    if (newValue === 2) {
      getClassInfoAPI();
    }

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
          A editar a personagem "{charData.information.name}"
        </Typography>
        <div id="xd">
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label="Visão Geral" />
            <Tab label="Equipamento" />
            <Tab label="Classe" />
            <Tab label="Ancestrais" />
            <Tab label="Habilidades" />
          </Tabs>
        </div>





        {selectedTab === 0 &&
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
                    onChange={(event) => { updateName(event.target.value) }}
                  />
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Bio</Typography>
                  <TextField
                    id="character_bio"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue={charData.information.bio}
                    onChange={(event) => { updateBio(event.target.value) }}
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
                      <div style={{ alignItems: 'center' }}>
                        <TextField
                          type="number"
                          id="information/name"
                          variant="outlined"
                          defaultValue={charData.abilityscores.str}
                          onChange={(event) => { setStr(parseInt(event.target.value)) }}
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                      Dexterity

                      <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                        component="img"

                        image={dexterity}
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          id="information/name"
                          variant="outlined"
                          defaultValue={charData.abilityscores.dex}
                          onChange={(event) => { setDex(parseInt(event.target.value)) }}
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                      Constitution

                      <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                        component="img"

                        image={constitution}
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          id="information/name"
                          variant="outlined"
                          defaultValue={charData.abilityscores.con}
                          onChange={(event) => { setCon(parseInt(event.target.value)) }}
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                      Intelligence

                      <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                        component="img"

                        image={intelligence}
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          id="information/name"
                          variant="outlined"
                          defaultValue={charData.abilityscores.int}
                          onChange={(event) => { setInt(parseInt(event.target.value)) }}
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                      Wisdom

                      <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                        component="img"

                        image={wisdom}
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          id="information/name"
                          variant="outlined"
                          defaultValue={charData.abilityscores.wis}
                          onChange={(event) => { setWis(parseInt(event.target.value)) }}
                        />
                      </div>
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                      Charisma

                      <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                        component="img"

                        image={charisma}
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                          type="number"
                          id="information/name"
                          variant="outlined"
                          defaultValue={charData.abilityscores.cha}
                          onChange={(event) => { setCha(parseInt(event.target.value)) }}
                        />
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={15} direction="row" alignItems="center" justifyContent='center'>
                  <Grid item>
                    <Box sx={{ color: 'text.primary', fontSize: 22, width: 110 }}>
                      Health
                      <div id='hpdisplay'>{charData.hitpoints[0]} / {charData.hitpoints[1]} </div>

                      <Grid container spacing={15} alignItems="center" justifyContent='center'>
                        <Grid item>
                          <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                            component="img"

                            image={hp}
                          />

                          <div className='buttoncontainer'>
                            <Button variant="contained" onClick={handleHealClick} color="success" style={{ marginRight: 10 }}>
                              Heal
                            </Button>
                            <TextField
                              id="amountDamage"
                              sx={{ width: 60 }}
                              hiddenLabel
                              defaultValue="0"
                              variant="filled"
                              size="small"
                              onChange={handleAmountChange}
                            />
                            <Button variant="contained" onClick={handleDamageClick} color="error" style={{ marginLeft: 10 }}>
                              Damage
                            </Button>


                          </div>
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
                  onClick={() => updateCharacterInfo(charData)}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Atualizar Informações da Personagem
                </Button>
              </Card>
            </Grid>

          </Grid>
        }

        {selectedTab === 2 &&
          <Grid container spacing={2} padding={2} paddingTop={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Card sx={{ maxWidth: 900, minHeight: 500 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={testimage}
                />
                <CardContent style={{ width: 892 }}>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Classe
                  </Typography>

                 


                </CardContent>

                <Grid container spacing={5} padding={2} paddingTop={2} direction="row" alignItems="center" justifyContent="center">
                  <Grid item>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        }











      </div>
    </>
  );
}


export default CharacterPage;
