import React, { useEffect, useState } from "react";
import { ListItemButton, ListItemIcon, Link, ListItemText, Typography, Collapse, List } from "@mui/material";
import { RouteType } from "../../routes/config.ts";
import colorConfigs from "../../config/colorConfig.ts";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SidebarItem from "./SidebarItem.tsx";
import { useSelector } from "react-redux";
import appRoutes from "../../routes/appRoutes.tsx";
import { RootState } from "../../redux/store.ts";

type Props = {
    item: RouteType;
};

const SidebarItemCollapse = ({ item }: Props) => {
    const [ open, setOpen ] = useState(false);

    const { appState } = useSelector((state: RootState) => state.appState)
    
    useEffect(() => {
        if (appState.includes(item.state)) {
            setOpen(true)
        }
    }, [appState, item]);

    return (
        item.sidebarProps ? (
            <>
            <ListItemButton
                onClick={() => setOpen(!open)}
                sx={{
                    "&: hover": {
                        backgroundColor: colorConfigs.sidebar.hoverBg
                    },
                    paddingY: "12px",
                    paddingX: "24px"
                }}
            >
                <ListItemIcon sx={{
                    color: colorConfigs.sidebar.color
                }}>
                    {item.sidebarProps.icon && item.sidebarProps.icon}
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography>
                            {item.sidebarProps.displayText}
                        </Typography>
                    }
                />
                {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List>
                {item.child?.map((route, index) => (
                    route.sidebarProps ? (
                        route.child ? (
                            <SidebarItemCollapse item={route} key={index}/>
                        ) : (
                            <SidebarItem item={route} key={index}/>
                        )
                    ) : null
                ))}
                </List>
            </Collapse>
            </>
        ) : null
    );
};

export default SidebarItemCollapse;