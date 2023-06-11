import { Avatar, Drawer, List, ListItemButton, ListItemIcon, Stack, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import sizeConfigs from '../../config/sizeConfig.ts';
import colorConfigs from '../../config/colorConfig.ts';
import appRoutes from '../../routes/appRoutes.tsx';
import assets from '../../assets/index.ts';
import SidebarItem from './SidebarItem.tsx';
import SidebarItemCollapse from './SidebarItemCollapse.tsx';
import Cookies from 'js-cookie';



const Sidebar = () => {
const [tierInfo, setTierInfo] = useState("");
  useEffect(() => {
    getUserStatus();
  }, []);
  async function getUserStatus() {
    try {
      const response = await fetch('http://localhost:8000/api/user/type', {
        method: "GET",
        headers: {
          'auth': Cookies.get("Token"),
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const jsonData = await response.json();
        setTierInfo(jsonData)
        console.log(typeof(jsonData));
    
  
    } catch (error) {
      console.error('Error fetching data:', error);
      window.location.href = '/login';
    }
  }
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            justifyContent="center"
          >
            <a href="/dashboard">
              <img src={assets.images.logo} width={142} height={75} alt="Coding Beauty logo" />
            </a>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => {
          const currentRoute = route; // Store the route in a variable
          console.log(currentRoute); // Log the route
          if (tierInfo === "Free" && currentRoute.child) {
            currentRoute.child = currentRoute.child.filter(child => child.path !== "/dashboard/newCampaign");
          }
          return (
            currentRoute.sidebarProps ? (
              currentRoute.child ? (
                <SidebarItemCollapse item={currentRoute} key={index} />
              ) : (
                <SidebarItem item={currentRoute} key={index} />
              )
            ) : null
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;