import { Avatar, Drawer, List, ListItemButton, ListItemIcon, Stack, Toolbar } from '@mui/material';
import React from 'react'
import sizeConfigs from '../../config/sizeConfig.ts';
import colorConfigs from '../../config/colorConfig.ts';
import appRoutes from '../../routes/appRoutes.tsx';
import assets from '../../assets/index.ts';
import SidebarItem from './SidebarItem.tsx';

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
                <Toolbar>
                    <Stack
                        sx={{width: "100%"}}
                        direction="row"
                        justifyContent="center"
                    >
                        <Avatar src={assets.images.logo}/>
                    </Stack>
                </Toolbar>
                {appRoutes.map((route, index) => (
                    route.sidebarProps ? (
                        <SidebarItem item={route}/>
                    ) : null
                ))}
            </List>
        </Drawer>
    );
};

export default Sidebar