import { Avatar, Drawer, List, ListItemButton, ListItemIcon, Stack, Toolbar } from '@mui/material';
import React, { useEffect } from 'react'
import sizeConfigs from '../../config/sizeConfig.ts';
import colorConfigs from '../../config/colorConfig.ts';
import appRoutes from '../../routes/appRoutes.tsx';
import assets from '../../assets/index.ts';
import SidebarItem from './SidebarItem.tsx';
import SidebarItemCollapse from './SidebarItemCollapse.tsx';
import Cookies from 'js-cookie';

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
        console.log(jsonData)

    } catch (error) {
        console.error('Error fetching data:', error);
        window.location.href = '/login';
    }
}

const Sidebar = () => {
    useEffect(() => {
        getUserStatus()
    }, []);

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
                        <a href="/dashboard"  >
                            <img src={assets.images.logo} width={142} height={75} alt="Coding Beauty logo"></img></a>

                    </Stack>
                </Toolbar>
                {appRoutes.map((route, index) => (
                    route.sidebarProps ? (
                        route.child ? (
                            <SidebarItemCollapse item={route} key={index} />
                        ) : (
                            <SidebarItem item={route} key={index} />
                        )
                    ) : null
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar