import React, { useEffect, useRef, useState } from 'react';
import "./NewCampaignPage.css";
import { json, useParams } from "react-router-dom";
import Sidebar from '../../../components/common/Sidebar.tsx';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Checkbox, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Tab, Tabs, TextField, Tooltip, Typography, createTheme } from '@mui/material';

import testimage from '../../../assets/images/Fantasy_World.png';
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



function CreateNewCampaignPage() {

  let bioNew = "";
  let titleNew = "";

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

  function updateTitle(value) {
    titleNew = value;
  }

  function updateBio(value) {
     bioNew = value;
  }

  async function createCampaign(campData) {
    try {
      const response = await fetch('http://localhost:8000/api/campaign/', {
        method: "POST",
        headers: {
          'auth': Cookies.get("Token"),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "title": titleNew,
            "system": bioNew
          }
        ),

      })
      const jsonData = response;
      console.log(jsonData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
          A Criar uma campanha
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
                    Nome da Campanha
                  </Typography>
                  <TextField
                    id="information/name"
                    variant="outlined"
                    onChange={(event) => { }}
                  />
                  <Typography gutterBottom variant="h5" component="div" style={typographyStyleBold}>
                    Descrição</Typography>
                  <TextField
                    id="character_bio"
                    multiline
                    fullWidth
                    rows={4}
                    onChange={(event) => { }}
                    variant="filled"
                  />
                </CardContent>

                <Button
                  type="submit"
                  onClick={createCampaign}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Criar Campanha
                </Button>
              </Card>
              
            </Grid>
          </Grid>
             
      </div >
    </>
  );
}


export default CreateNewCampaignPage;
