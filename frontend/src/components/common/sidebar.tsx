import { Drawer, List, ListItemButton, ListItemIcon } from "@mui/material";
import sizeConfigs from "../../configs/sizeConfigs";

const Sidebar = () => {
    return (
        <Drawer
            variant = ""
            sx={{
                width: sizeConfigs.sidebar.width,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: sizeConfigs.sidebar.width,
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: colorConfigs.sidebar.bg
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
                    <ListItemButton>
                        <ListItemIcon>
                            {route.sidebarProps.icon && route.sidebarProps.icon}
                        </ListItemIcon>
                        {route.sidebarProps.displayText}
                </ListItemButton>
                ))}
                
            </List>
        </Drawer>
    );
};

export default Sidebar