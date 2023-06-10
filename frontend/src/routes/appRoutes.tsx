import React from "react";
import HomePage from "../pages/home/HomePage.tsx";
import { RouteType } from "./config.ts";
import DashboardOutLinedIcon from "@mui/icons-material/DashboardOutlined.js";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout.tsx";
import DefaultPage from "../pages/dashboard/DefaultPage.tsx";
import DashboardIndex from "../pages/dashboard/DashboardIndex.tsx";
import Pricing from "../pages/dashboard/pricing/Pricing.js";
import MyCharacterPage from "../pages/dashboard/character/edit/MyCharacterPage.tsx";
import MyCampaignPage from "../pages/dashboard/campaigns/MyCampaignPage.tsx";
import Perfil from "../pages/dashboard/perfil/Perfil.tsx";
import NewCharacterPage from "../pages/dashboard/character/edit/MyCharacterPage.tsx";
import NewCampaignPage from "../pages/dashboard/campaigns/MyCampaignPage.tsx";


const appRoutes: RouteType[] = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },    
    {
        element: <DashboardPageLayout/>,
        state: "dashboard",
        sidebarProps: {
            displayText: "As Minhas Campanhas",
            icon: <DashboardOutLinedIcon/>
        }, child: [
            {
                index: true,
                element: <DashboardIndex/>,
                state: "dashboard.index"
            },
            {
                path: "/dashboard/myCampaigns",
                element: <MyCampaignPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Ver Campanhas"
                }
            },
            {
                path: "/dashboard/newCampaign",
                element: <DefaultPage/>,
                state: "dashboard.newCampaign",
                sidebarProps: {
                    displayText: "Criar Campanha"
                }
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardPageLayout/>,
        state: "dashboard",
        sidebarProps: {
            displayText: "As minhas personagens",
            icon: <DashboardOutLinedIcon/>
        }, child: [
            {
                index: true,
                element: <DashboardIndex/>,
                state: "dashboard.index"
            },
            {
                path: "/dashboard/newCharacter",
                element: <NewCharacterPage/>,
                state: "dashboard.newCharacter",
                sidebarProps: {
                    displayText: "Criar nova personagem"
                }
            },
            {
                path: "/dashboard/myCharacters",
                element: <MyCharacterPage/>,
                state: "dashboard.Mycharacterpage",
                sidebarProps: {
                    displayText: "Editar personagens"
                }
            }
        ]
    },    
    {
        path: "/dashboard/payments",
        element: <Pricing/>,
        state: "changelog",
        sidebarProps: {
            displayText: "Subscrição",
            icon: <DashboardOutLinedIcon/>
        }
    },
    {
        path: "/dashboard/profile",
        element: <Perfil/>,
        state: "dashboard.testepage",
        sidebarProps: {
            displayText: "Perfil",
            icon: <DashboardOutLinedIcon/>
        }
    }
];

export default appRoutes;