import React from "react";
import HomePage from "../pages/home/HomePage.tsx";
import { RouteType } from "./config.ts";
import DashboardOutLinedIcon from "@mui/icons-material/DashboardOutlined.js";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout.tsx";
import DefaultPage from "../pages/dashboard/DefaultPage.tsx";
import DashboardIndex from "../pages/dashboard/DashboardIndex.tsx";
import ChangelogPage from "../pages/changelog/ChangelogPage.tsx";

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
                path: "/dashboard/testepage",
                element: <DefaultPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Continuar Campanha"
                }
            },
            {
                path: "/dashboard/testepage",
                element: <DefaultPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Criar Campanha"
                }
            },
            {
                path: "/dashboard/testepage",
                element: <DefaultPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Eliminar Campanhas"
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
                path: "/dashboard/testepage",
                element: <DefaultPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Criar nova personagem"
                }
            },
            {
                path: "/dashboard/testepage",
                element: <DefaultPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Editar personagem"
                }
            },
            {
                path: "/dashboard/testepage",
                element: <DefaultPage/>,
                state: "dashboard.testepage",
                sidebarProps: {
                    displayText: "Eliminar personagem"
                }
            }
        ]
    },    
    {
        path: "/changelog",
        element: <ChangelogPage/>,
        state: "changelog",
        sidebarProps: {
            displayText: "Subscrição",
            icon: <DashboardOutLinedIcon/>
        }
    }
];

export default appRoutes;