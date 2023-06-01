import React from "react";
import HomePage from "../pages/home/HomePage";
import { RouteType } from "./config";
import DashboardOutLinedIcon from "@mui/icons-material/DashboardOutlined.js";
import DashboardPageLayout from "../pages/dashboard/DashboardPageLayout";
import DefaultPage from "../pages/dashboard/DefaultPage";
import DashboardIndex from "../pages/dashboard/DashboardIndex";
import ChangelogPage from "../pages/changelog/ChangelogPage";

const appRoutes: RouteType[] = [
    {
        index: true,
        element: <HomePage />,
        state: "home"
    },
    {
        path: "/dashboard",
        element: <DashboardPageLayout/>,
        state: "dashboard",
        sidebarProps: {
            displayText: "Dashboard",
            icon: <DashboardOutLinedIcon/>
        }, child: [
            {
                index: true,
                element: <DashboardIndex/>,
                state: "dashboard.index"
            },
            {
                path: "/dashboard/default",
                element: <DefaultPage/>,
                state: "dashboard.default",
                sidebarProps: {
                    displayText: "Default"
                }
            }
        ]
    },
    {
        path: "/changelog",
        element: <ChangelogPage/>,
        state: "changelog",
        sidebarProps: {
            displayText: "Changelog",
            icon: <DashboardOutLinedIcon/>
        }
    }
];

export default appRoutes;