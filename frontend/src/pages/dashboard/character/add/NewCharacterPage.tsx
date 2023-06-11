import React, { useEffect, useRef, useState } from 'react';
import "./NewCharacterPage.css";
import { json, useParams } from "react-router-dom";
import Sidebar from '../../../../components/common/Sidebar.tsx';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, TextField, Tooltip, Typography, createTheme } from '@mui/material';

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


function CreateNewCharacterPage() {

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
  const [isLoading, setIsLoading] = useState(false);
  const [amountDamage, setAmountDamage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [classData, setClassData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [classSubData, setClassSubData] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [tooltipContent, setTooltipContent] = useState('Loading...');
  const [equipmentTooltipContent, setEquipmentTooltipContent] = useState('Loading...');

  const [skillTooltipContent, setSkillTooltipContent] = useState('Loading...');


  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [con, setCon] = useState(0);
  const [int, setInt] = useState(0);
  const [wis, setWis] = useState(0);
  const [cha, setCha] = useState(0);
  const [maxHP, setMaxHP] = useState(0);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");



  const [invent, setInvent] = useState([]);




  const [errorMsg, setErrorMsg] = useState("");


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

  let url = window.location.href;



  const handleClassChange = (event: SelectChangeEvent) => {
    setSelectedCheckboxes([]);
    setSelectedClass(event.target.value as string);
    getClassSubInfoAPI(event.target.value)
  };


  useEffect(() => {
    if (selectedTab === 1) {
      setIsLoading(false)
    }
  }, [classData]);

  useEffect(() => {
    if (selectedTab === 1) {
      setIsLoading(false)
    }
  }, [classSubData]);

  useEffect(() => {
    if (selectedTab === 1 && tooltipContent === "Loading...") {
      setTooltipContent("Loading...")
    }
  }, [tooltipContent]);



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

  async function updateCharacterSkill(charData) {
    let mySkills = charData.spells;
    if (!mySkills.includes(selectedSkill)) {
      console.log(charData.spells.includes(selectedSkill))
      mySkills = [...charData.spells, selectedSkill];

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
              "spells": mySkills
            }
          ),

        })
        const jsonData = response;
        charData.spells = [...charData.spells, selectedSkill];


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }



  async function createCharacter() {

    let acrobatics = ""
    let animalhandling = ""
    let arcana = ""
    let athletics = ""
    let deception = ""
    let history = ""
    let insight = ""
    let intimidation = ""
    let investigation = ""
    let medicine = ""
    let nature = ""
    let perception = ""
    let performance = ""
    let persuasion = ""
    let religion = ""
    let sleightofhand = ""
    let stealth = ""
    let survival = ""

    let baseProfs = []

    function labelCleaner(label) {
      console.log("teste")
      baseProfs.push(label);
      label = label.replace('Skill: ', '').replace(' ', '').toLowerCase();
      eval(label + "= \"t\"");

    }

    Object.values(selectedCheckboxes).map((label, index) => (
      labelCleaner(label)
    ))

    

    if (name === "") {
      setErrorMsg("Erro - Nome Vazio")

    } else if (bio === "") {
      setErrorMsg("Erro - Bio Vazia")
    } else if (selectedClass === "") {
      setErrorMsg("Erro - Não selecionou classe.")
    } else {
      console.log(Object.values(selectedCheckboxes))

      let starterProficienciesArray = [];
      classSubData.proficiencies.map((item, index) => {
        console.log(item)
        starterProficienciesArray.push(item.name);
      })

      baseProfs.map((prof, index) => (
        logProf(prof)
      ))

      function logProf(prof){
        starterProficienciesArray.push(prof);
      }

      let equipmentArray = [];
      classSubData.starting_equipment.map((item, index) => {
        console.log(item)
        equipmentArray.push(item.equipment.name);
      })
      console.log(equipmentArray)

      
      console.log(classSubData)

      try {

        const response = await fetch('http://localhost:8000/api/character/', {
          method: "POST",
          headers: {
            'auth': Cookies.get("Token"),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              "hitpoints": [
                maxHP,
                maxHP,
              ],
              "equipment": equipmentArray
              ,
              "proficiencies": starterProficienciesArray
              ,
              "senses": [
                "Darkvision",
                "Low-Light Vision"
              ],
              "speedtypes": {
                "walk": 30,
                "burrow": 0,
                "climb": 0,
                "fly": 0,
                "swim": 0
              },
              "abilityscores": {
                "str": str,
                "dex": dex,
                "con": con,
                "int": int,
                "wis": wis,
                "cha": cha
              },
              "ancestryfeatures": [
                ""
              ],
              "classfeatures": [
                ""
              ],
              "coreskills": {
                "perception": perception,
                "animalHandling": animalhandling,
                "history": history,
                "insight": insight,
                "acrobatics": acrobatics,
                "arcana": arcana,
                "athletics": athletics,
                "sleightofHand": sleightofhand,
                "deception": deception,
                "persuasion": persuasion,
                "intimidation": intimidation,
                "medicine": medicine,
                "nature": nature,
                "investigation": investigation,
                "performance": performance,
                "religion": religion,
                "stealth": stealth,
                "survival": survival,
                "lore": {
                  "alkenstar": "t"
                },
                "weapon": {
                  "advanced": "u",
                  "martial": "u",
                  "simple": "t",
                  "unarmed": "t"
                },
                "armor": {
                  "heavy": "u",
                  "medium": "u",
                  "light": "u",
                  "unarmored": "u"
                }
              },
              "information": {
                "name": name,
                "bio": bio,
                "ancestry": "Elf",
                "heritage": "Dhampir",
                "class": selectedClass,
                "background": "Wanted Witness",
                "gender/pronouns": "Male He/Him",
                "age": "189",
                "height": "6'8",
                "weight": "220 lbs",
                "ethnicity": "Kyonin",
                "nationality": "Geb/Alkenstar",
                "size": 1,
                "languages": [
                  "Common",
                  "Dwarven",
                  "Elven",
                  "Halfling",
                  "Kelish",
                  "Necril"
                ],
                "deity": "",
                "allignment": "Chaotic Neutral",
                "image": "imageurl"
              },
              "inventory": [""],
              "spells": [
                ""
              ],
              "weaknesses": {
                "fire": 5,
                "cold": 2
              },
              "resistances": {
                "thunder": 10
              },
              "immunities": [
                "Poison",
                "Paralyzed"
              ]
            }
          ),

        })
        const jsonData = response;
        if (response.ok) {
          setErrorMsg("A personagem foi criada com sucesso!")
          resetPage()
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
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




  if (isLoading) {
    return (
      <><DoubleBubble center={true} width={"300px"} height={"300px"} /><p style={{ fontSize: '40px', textAlign: "center", alignItems: "center", alignContent: "center", paddingTop: 250, paddingLeft: 220 }}>Loading...</p></>
    )

  }

  function updateName(value) {
    setName(value)
  }

  function updateBio(value) {
    setBio(value)
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

  const getSkillTooltip = (apiURL) => {
    setSkillTooltipContent("Loading...")
    setTimeout(() => {
      getSkillTooltipInfoAPI(apiURL.target.outerText);
    }, 225);

  };




  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 1) {
      getClassInfoAPI();
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
          A Criar uma personagem
        </Typography>
        <div>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label="Visão Geral" />
            <Tab label="Classe" />
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
                    defaultValue={name}
                    onChange={(event) => { updateName(event.target.value) }}
                  />
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Bio</Typography>
                  <TextField
                    id="character_bio"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue={bio}
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
                          defaultValue={0}
                          type="number"
                          id="information/name"
                          variant="outlined"
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
                          defaultValue={0}
                          type="number"
                          id="information/name"
                          variant="outlined"
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
                          defaultValue={0}
                          type="number"
                          id="information/name"
                          variant="outlined"
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
                          defaultValue={0}
                          type="number"
                          id="information/name"
                          variant="outlined"
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
                          defaultValue={0}
                          type="number"
                          id="information/name"
                          variant="outlined"
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
                          defaultValue={0}
                          type="number"
                          id="information/name"
                          variant="outlined"
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
                      <div id='hpdisplay'>0 / <TextField
                        defaultValue={0}
                        type="number"
                        id="information/name"
                        variant="outlined"
                        onChange={(event) => { setMaxHP(parseInt(event.target.value)) }}
                      /></div>

                      <Grid container spacing={15} alignItems="center" justifyContent='center'>
                        <Grid item>
                          <CardMedia sx={{ maxWidth: 64, margin: 'auto' }}
                            component="img"

                            image={hp}
                          />
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
                    Classe
                  </Typography>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">A minha classe</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedClass}
                        label="A minha classe"
                        onChange={handleClassChange}
                      >
                        {classData.map((item, index) => (
                          <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  {selectedClass !== "" && <>
                    <p style={{ paddingTop: 10 }}>{classSubData.proficiency_choices[0].desc}</p>
                    <p>{classSubData.name} </p><img src={classImages[classSubData.name]} style={{ maxWidth: '100%', maxHeight: '100%' }} alt={classSubData.name} />



                    <FormGroup style={{ display: 'flex', flexDirection: "row" }}>
                      {classSubData.proficiency_choices[0].from.options.map((item, index) => (

                        <Grid item key={index}>
                          <Tooltip title={tooltipContent} arrow onMouseEnter={getProficiencyTooltip}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value={`checkbox${index}`}
                                  onChange={(event) => handleChange(event, classSubData.name, item.item.name)}
                                  checked={selectedCheckboxes.hasOwnProperty(`checkbox${index}`)}
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
                  </>
                  }

                </CardContent>
              </Card>
            </Grid>
          </Grid>
        }
        {errorMsg === "A personagem foi criada com sucesso!" ? (
          <p style={{ paddingTop: 1, fontSize: 25, color: "green" }}>{errorMsg}</p>
        ) : (
          <p style={{ paddingTop: 1, fontSize: 25, color: "red" }}>{errorMsg}</p>
        )}
        <Button
          type="submit"
          onClick={() => createCharacter()}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Criar Personagem
        </Button>








      </div >
    </>
  );
}
function resetPage() {
  setTimeout(() => { 
    //window.location.reload()  
  }, 1000);
}


export default CreateNewCharacterPage;

