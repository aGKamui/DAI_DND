import React, { useState } from "react";
import { ListItemButton, ListItemIcon, Link, ListItemText, Typography } from "@mui/material";
import { RouteType } from "../../routes/config.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import colorConfigs from "../../config/colorConfig.ts";

type Props = {
    item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
    const { appState } = useSelector((state: RootState) => state.appState)
    return (
        item.sidebarProps && item.path ? (
            <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                    "&: hover": {
                        backgroundColor: colorConfigs.sidebar.hoverBg
                    },
                    backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg
                    : "unset",
                    paddingY: "12px",
                    paddingX: "24px"
                }}
            >
                <ListItemIcon sx={{
                    color: colorConfigs.sidebar.color
                }}>
                    {item.sidebarProps.icon && item.sidebarProps.icon}
                </ListItemIcon>
                {item.sidebarProps.displayText}
            </ListItemButton>
        ) : null
    );
};

export default SidebarItem;