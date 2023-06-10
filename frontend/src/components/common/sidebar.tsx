import { Avatar, Drawer, List, ListItemButton, ListItemIcon, Stack, Toolbar } from '@mui/material';
import React from 'react'
import sizeConfigs from '../../config/sizeConfig.ts';
import colorConfigs from '../../config/colorConfig.ts';
import appRoutes from '../../routes/appRoutes.tsx';
import assets from '../../assets/index.ts';
import SidebarItem from './SidebarItem.tsx';
import SidebarItemCollapse from './SidebarItemCollapse.tsx';
const Sidebar = () => {
   
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
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent="center"
                    >
                        <a href="/dashboard"  >
                        <img src={assets.images.logo}  width={142} height={75} alt="Coding Beauty logo"></img></a>
                     
                    </Stack>
                </Toolbar>
                {appRoutes.map((route, index) => (
                    route.sidebarProps ? (
                        route.child ? (
                            <SidebarItemCollapse item={route} key={index}/>
                        ) : (
                            <SidebarItem item={route} key={index}/>
                        )
                    ) : null
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar