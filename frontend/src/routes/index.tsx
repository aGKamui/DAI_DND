import { RouteType } from "./config.ts";
import React from 'react';
import { ReactNode } from "react";
import { Route } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper.tsx";
import appRoutes from "./appRoutes.tsx";

const generateRoute = (routes: RouteType[]): ReactNode => {
    return routes.map((route, index) => (
        route.index ? (
        <Route
            index
            path={ route.path }
            element={ <PageWrapper state={route.state}>
                {route.element}
            </PageWrapper>}
        />
        ) : (
            <Route
                path={route.path}
                element={
                <PageWrapper state={route.state ?? undefined}>
                    {route.element}
                </PageWrapper>
                }
                key={index}
            >
                {route.child && (
                    generateRoute(route.child)
                )}
            </Route>
        )
    ));
};

export const routes: ReactNode = generateRoute(appRoutes)

