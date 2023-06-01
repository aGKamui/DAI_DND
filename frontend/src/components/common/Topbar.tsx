import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import sizeConfigs from '../../config/sizeConfig';
import colorConfigs from '../../config/colorConfig';

const Topbar = () => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: 'calc(100% - ${sizeConfigs.sidebar.width})',
                ml: sizeConfigs.sidebar.width,
                boxShadow: "unset",
                backgroundColor: colorConfigs.topbar.bg,
                color: colorConfigs.topbar.color
            }}
        >

        </AppBar>
    );
};

export default Topbar;