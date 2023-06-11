import React, { useEffect, useRef, useState } from 'react';
import "./EditCharacterPage.css";
import { json, useParams } from "react-router-dom";
import Sidebar from '../../../../components/common/Sidebar.tsx';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, TextField, Tooltip, Typography, createTheme } from '@mui/material';

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

interface CharData {
  abilityscores: {
    str: number;
    dex: number;
    con: number;
    wis: number;
    cha: number;
    int: number;
  };
}


function CharacterPage() {

  const [charData, setCharData] = useState<CharData>({
    "abilityscores": {
      "str": 0,
      "dex": 0,
      "con": 0,
      "wis": 0,
      "cha": 0,
      "int": 0,
    }
  });

  const isInitialRender = useRef(true);
  const [isLoading, setIsLoading] = useState(true);
  const [amountDamage, setAmountDamage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [classData, setClassData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [spellData, setSpellData] = useState([]);



  const [classSubData, setClassSubData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [tooltipContent, setTooltipContent] = useState('Loading...');
  const [equipmentTooltipContent, setEquipmentTooltipContent] = useState('Loading...');
  const [spellTooltipContent, setSpellTooltipContent] = useState('Loading...');

  const [skillTooltipContent, setSkillTooltipContent] = useState('Loading...');


  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [con, setCon] = useState(0);
  const [int, setInt] = useState(0);
  const [wis, setWis] = useState(0);
  const [cha, setCha] = useState(0);

  const classImages = {
    "Barbarian": "https://www.dndbeyond.com/avatars/thumbnails/6/342/420/618/636272680339895080.png",
    "Bard": "https://www.dndbeyond.com/avatars/thumbnails/6/369/420/618/636272705936709430.png",
    "Cleric": "https://www.dndbeyond.com/avatars/thumbnails/6/371/420/618/636272706155064423.png",
    "Druid": "https://www.dndbeyond.com/avatars/thumbnails/6/346/420/618/636272691461725405.png",
    "Fighter": "https://www.dndbeyond.com/avatars/thumbnails/6/359/420/618/636272697874197438.png",
    "Monk": "https://www.dndbeyond.com/avatars/thumbnails/6/342/420/618/636272680339895080.png",
    "Paladin": "https://www.dndbeyond.com/avatars/thumbnails/6/365/420/618/636272701937419552.png",
    "Ranger": "https://www.dndbeyond.com/avatars/thumbnails/6/367/420/618/636272702826438096.png",
    "Rogue": "https://www.dndbeyond.com/avatars/thumbnails/6/384/420/618/636272820319276620.png",
    "Sorcerer": "https://www.dndbeyond.com/avatars/thumbnails/6/485/420/618/636274643818663058.png",
    "Warlock": "https://www.dndbeyond.com/avatars/thumbnails/6/375/420/618/636272708661726603.png",
    "Wizard": "https://www.dndbeyond.com/avatars/thumbnails/6/357/420/618/636272696881281556.png"
  }


  const [selectedClass, setSelectedClass] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedSpell, setSelectedSpell] = useState('');

  let url = window.location.href;



  const handleClassChange = (classPicked) => {
    setSelectedCheckboxes([]);
    setSelectedClass(classPicked);
    getClassSubInfoAPI(classPicked)
  };

  const handleEquipmentAdd = (event: SelectChangeEvent) => {
    setSelectedEquipment(event.target.value as string);
  };

  const handleSkillAdd = (event: SelectChangeEvent) => {
    setSelectedSkill(event.target.value as string);
  };

  const handleSpellAdd = (event: SelectChangeEvent) => {
    setSelectedSpell(event.target.value as string);
  };



  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTab === 2) {
      setIsLoading(false)
      getClassSubInfoAPI(charData.information.class)
      let dynamicKey = ""
      Object.entries(charData.coreskills).forEach(([key, value]) => {
        if (value === 't') {
          const dynamicKey = "Skill: " + key.charAt(0).toUpperCase() + key.slice(1);
          if (!selectedCheckboxes.includes(dynamicKey)) {
            setSelectedCheckboxes(prevCheckboxes => [...prevCheckboxes, dynamicKey]);
          }
        }
      });


    }
  }, [classData]);

  useEffect(() => {
    if (selectedTab === 2) {
      setIsLoading(false)
    }
  }, [classSubData]);

  useEffect(() => {
    if (selectedTab === 2) {
      console.log(selectedCheckboxes)
    }
  }, [selectedCheckboxes]);

  useEffect(() => {
    if (selectedTab === 2 && tooltipContent === "Loading...") {
      setTooltipContent("Loading...")
    }
  }, [tooltipContent]);

  useEffect(() => {
    if (selectedTab === 1) {
      setIsLoading(false)
    }
  }, [equipmentData]);


  useEffect(() => {
    if (selectedTab === 4) {
      setIsLoading(false)
    }
  }, [skillData]);

  useEffect(() => {
    if (selectedTab === 4) {
      setIsLoading(false)
    }
  }, [spellData]);

  useEffect(() => {
    if (selectedTab === 4) {
      setIsLoading(false)
    }
  }, [charData]);


  useEffect(() => {
    if (selectedTab === 1 && equipmentTooltipContent === "Loading...") {
      setEquipmentTooltipContent("Loading...")
    }
  }, [equipmentTooltipContent]);


  async function getSkillAPI() {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.dnd5eapi.co/api/skills', {
        method: "GET"
      })
      const jsonData = await response.json();
      setSkillData(jsonData["results"]);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  async function getSpellAPI() {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.dnd5eapi.co/api/classes/'+charData.information.class.toLowerCase()+'/spells', {
        method: "GET"
      })
      const jsonData = await response.json();
      setSpellData(jsonData["results"]);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  async function getEquipmentInfoAPI() {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.dnd5eapi.co/api/equipment', {
        method: "GET"
      })
      const jsonData = await response.json();
      setEquipmentData(jsonData["results"]);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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

  async function getClassSubInfoAPI(chosenClass) {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.dnd5eapi.co/api/classes/' + chosenClass.toLowerCase(), {
        method: "GET"
      })
      const jsonData = await response.json();
      setClassSubData(jsonData);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



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
    paddingTop: '15px'
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


  async function updateCharacterInventory(charData) {
    let myEquips = charData.inventory;
    myEquips = [...charData.inventory, selectedEquipment];
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
            "inventory": myEquips
          }
        ),

      })
      const jsonData = response;
      console.log(jsonData);
      charData.inventory = [...charData.inventory, selectedEquipment];

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  
  async function updateCharacterSpell(charData) {
    let mySpells = charData.spells;
    if (!mySpells.includes(selectedSpell)) {
      console.log(charData.proficiencies.includes(selectedSpell))
      mySpells = [...charData.proficiencies, selectedSpell];

      try {
        const response = await fetch('http://localhost:8000/api/character/' + charData._id, {
          method: "PUT",
          headers: {
            'auth': Cookies.get("Token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              "spells": mySpells
            }
          ),

        })
        const jsonData = response;
        charData.spells = [...charData.spells, selectedSpell];


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  async function updateCharacterSkill(charData) {
    let myProfs = charData.proficiencies;
    if (!myProfs.includes("Skill: " + selectedSkill)) {
      console.log(charData.proficiencies.includes("Skill: " + selectedSkill))
      myProfs = [...charData.proficiencies, "Skill: " + selectedSkill];

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
              "proficiencies": myProfs
            }
          ),

        })
        const jsonData = response;
        charData.proficiencies = [...charData.proficiencies, "Skill: " + selectedSkill];


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

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
      const jsonData = response;
      console.log(jsonData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function getProficiencyInfoAPI(apiURL) {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api' + apiURL.replaceAll('Skill: ', '/skills/').replaceAll(' ', '-').toLowerCase(), {
        method: "GET"
      })
      const jsonData = await response.json();
      setTooltipContent(jsonData.desc)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  async function getSkillTooltipInfoAPI(apiURL) {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/skills/' + apiURL.replaceAll('(', '').replaceAll(' ', '-').replaceAll(')', '').replaceAll(',', '').replaceAll('\'', '').toLowerCase(), {
        method: "GET"
      })
      const jsonData = await response.json();
      setSkillTooltipContent(jsonData.desc)


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function getEquipmentTooltipInfoAPI(apiURL) {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/equipment/' + apiURL.replaceAll('(', '').replaceAll(':', '').replaceAll(' ', '-').replaceAll(')', '').replaceAll(',', '').replaceAll('\'', '').toLowerCase(), {
        method: "GET"
      })
      const jsonData = await response.json();
      if (Object.keys(jsonData.desc).length === 0) {
        setEquipmentTooltipContent("This item has no description.")
      } else {
        setEquipmentTooltipContent(jsonData.desc)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function getSpellTooltipInfoAPI(apiURL) {
    try {
      const response = await fetch('https://www.dnd5eapi.co/api/spells/' + apiURL.replaceAll('(', '').replaceAll(':', '').replaceAll(' ', '-').replaceAll(')', '').replaceAll(',', '').replaceAll('\'', '').toLowerCase(), {
        method: "GET"
      })
      const jsonData = await response.json();
      if (Object.keys(jsonData.desc).length === 0) {
        setSpellTooltipContent("This spell has no description.")
      } else {
        setSpellTooltipContent(jsonData.desc)
      }

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

  const getProficiencyTooltip = (apiURL) => {
    setTooltipContent("Loading...")
    setTimeout(() => {
      getProficiencyInfoAPI(apiURL.target.outerText);
    }, 225);

  };

  const getEquipmentTooltip = (apiURL) => {
    setTooltipContent("Loading...")
    setTimeout(() => {
      getEquipmentTooltipInfoAPI(apiURL.target.outerText);
    }, 225);

  };

  const getSpellTooltip = (apiURL) => {
    setTooltipContent("Loading...")
    setTimeout(() => {
      getSpellTooltipInfoAPI(apiURL.target.outerText);
    }, 225);

  };

  const getSkillTooltip = (apiURL) => {
    setSkillTooltipContent("Loading...")
    setTimeout(() => {
      getSkillTooltipInfoAPI(apiURL.target.outerText);
    }, 225);

  };




  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 1) {
      getEquipmentInfoAPI();
    } else if (newValue === 2) {
      getClassInfoAPI();
    } else if (newValue === 4) {
      getSkillAPI();
      getSpellAPI();
    }

  };



  const handleChange = (event, sel_class, itemLabel) => {

    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;
    let proficiencyCap = 2;
    if (sel_class === "Rogue") {
      proficiencyCap = 4;
    } else if (sel_class === "Bard" || sel_class === "Ranger") {
      proficiencyCap = 3;
    }

    if (isChecked) {
      if (Object.keys(selectedCheckboxes).length < proficiencyCap) {
        setSelectedCheckboxes(prevSelected => ({
          ...prevSelected,
          [checkboxValue]: itemLabel,
        }));
      }
    } else {
      setSelectedCheckboxes(prevSelected => {
        const updatedSelected = { ...prevSelected };
        delete updatedSelected[checkboxValue];
        return updatedSelected;
      });
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
        <div>
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
        {selectedTab === 1 &&

          <Grid container spacing={2} padding={2} paddingTop={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Card sx={{ maxWidth: 900, minHeight: 500 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={testimage}
                />
                <CardContent style={{ width: 892, justifyContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch", flexDirection: "column", alignContent: "center", flexWrap: "wrap" }}>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Equipamento (Atualmente Equipado)
                  </Typography>
                  <Box sx={{ minWidth: 120, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                    {charData.equipment.map((item, index) => (
                      <Grid item key={index}>
                        <Tooltip title={equipmentTooltipContent} arrow onMouseEnter={getEquipmentTooltip}>
                          <p style={{ fontSize: 18, paddingRight: 25 }}>{item}</p>
                        </Tooltip>
                      </Grid>
                    ))}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Inventário
                  </Typography>
                  <Box sx={{ minWidth: 120, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                    {charData.inventory.map((item, index) => (
                      <Grid item key={index}>
                        <Tooltip title={equipmentTooltipContent} arrow onMouseEnter={getEquipmentTooltip}>
                          <p style={{ fontSize: 18, paddingRight: 25 }}>{item}</p>
                        </Tooltip>

                      </Grid>
                    ))}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Adicionar Item ao Inventário
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Escolha um equipamento para adicionar</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedEquipment}
                      label="Escolha um equipamento para adicionar"
                      onChange={handleEquipmentAdd}
                    >
                      {equipmentData.map((item, index) => (
                        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {selectedEquipment !== "" &&
                    <><Button
                      type="submit"
                      onClick={() => updateCharacterInventory(charData)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Adicionar ao Inventário da Personagem
                    </Button></>
                  }



                </CardContent>
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
                <CardContent style={{ width: 892, justifyContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch", flexDirection: "column", alignContent: "center", flexWrap: "wrap" }}>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Classe
                  </Typography>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">A minha classe</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={charData.information.class}
                        label={charData.information.class}
                        disabled
                      //onChange={handleClassChange}
                      >
                        {classData.map((item, index) => (
                          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>Não pode alterar a sua classe.</FormHelperText>
                    </FormControl>
                  </Box>
                  <p>{classSubData.name} </p><img src={classImages[classSubData.name]} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={classSubData.name} />



                  <FormGroup style={{ display: 'flex', flexDirection: "row" }}>
                    {classSubData.proficiency_choices[0].from.options.map((item, index) => (

                      <Grid item key={index}>
                        <Tooltip title={tooltipContent} arrow onMouseEnter={getProficiencyTooltip}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={`checkbox${index}`}
                                onChange={(event) => handleChange(event, classSubData.name)}
                                checked={selectedCheckboxes.includes(item.item.name)}
                                disabled
                              />
                            }
                            label={item.item.name}
                          />
                        </Tooltip>
                      </Grid>
                    ))}
                  </FormGroup>
                  <p >Esta classe começa com as seguintes proficiencies:</p>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {classSubData.proficiencies.map((item, index) => (
                      <><p style={{ paddingTop: 2, fontSize: 18 }}>{item.name}  </p><p style={{ paddingTop: 2, fontSize: 18 }}> |  </p></>
                    ))}
                  </Box>
                  <p >Esta classe começa com o equipmento seguinte:</p>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {classSubData.starting_equipment.map((item, index) => (
                      <><p style={{ paddingTop: 2, fontSize: 18 }}>{item.equipment.name}  </p><p style={{ paddingTop: 2, fontSize: 18 }}> |  </p></>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
        {selectedTab === 4 &&

          <Grid container spacing={2} padding={2} paddingTop={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Card sx={{ maxWidth: 900, minHeight: 500 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={testimage}
                />
                <CardContent style={{ width: 892, justifyContent: "flex-start", justifyContent: "flex-start", alignItems: "stretch", flexDirection: "column", alignContent: "center", flexWrap: "wrap" }}>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Proficiencies
                  </Typography>
                  <Box sx={{ minWidth: 120, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                    {charData.proficiencies.map((item, index) => (
                      <Grid item key={index}>
                        <p style={{ fontSize: 18, paddingRight: 25 }}>{item}</p>
                      </Grid>
                    ))}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Adicionar Proficiency
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Escolha uma proficiency para adicionar</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedSkill}
                      label="Escolha um equipamento para adicionar"
                      onChange={handleSkillAdd}
                    >
                      {skillData.map((item, index) => (
                        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {selectedSkill !== "" &&
                    <><Button
                      type="submit"
                      onClick={() => updateCharacterSkill(charData)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2}}
                    >
                      Adicionar Proficiency à Personagem
                    </Button></>
                  }

                  <Typography gutterBottom variant="h5"  component="div" style={typographyStyleBold}></Typography>
                  <Typography gutterBottom variant="h5"  component="div" style={typographyStyleBold}>
                    Spells
                  </Typography>
                  <Box sx={{ minWidth: 120, display: "flex", flexDirection: "row", flexWrap: "wrap", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
                    {charData.spells.map((item, index) => (
                      <Grid item key={index}> 
                        <Tooltip title={spellTooltipContent} arrow onMouseEnter={getSpellTooltip}>
                        <p style={{ fontSize: 18, paddingRight: 25 }}>{item}</p>
                        </Tooltip>
                      </Grid>
                    ))}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Adicionar Spells
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Escolha uma habilidade para adicionar</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedSpell}
                      label="Escolha um equipamento para adicionar"
                      onChange={handleSpellAdd}
                    >
                      {spellData.map((item, index) => (
                        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <p style={{ fontSize: 18, paddingRight: 25 }}>A mostrar apenas Spells da classe {charData.information.class}</p>
                  {selectedSpell !== "" &&
                    <><Button
                      type="submit"
                      onClick={() => updateCharacterSpell(charData)}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Adicionar Spell à Personagem
                    </Button></>
                  }





                </CardContent>
              </Card>
            </Grid>
          </Grid>

        }











      </div >
    </>
  );
}


export default CharacterPage;
