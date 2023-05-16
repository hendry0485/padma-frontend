import flattenDeep from "lodash/flattenDeep";
import React from "react";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes";

const generateFlattenRoutes = (routes) =>{
    if (!routes) {
        return []
    }
    return flattenDeep(routes.map(({routes: subRoutes, ...rest})=>[rest,generateFlattenRoutes(subRoutes)]));
}

const renderRoutes = (mainRoutes) => {
    const Routes = ({isAuthorized}) => {
        const layouts = mainRoutes.map(({layout: Layout, routes}, index)=>{
            const subRoutes = generateFlattenRoutes(routes);
            return (
                <Route key={index} element={<Layout/>}>
                    <Route key={index} element={<ProtectedRoute isAuthorized={isAuthorized} />}>
                        {subRoutes.map(({component: Component, path, name, title})=>{
                            let breadcrumb = [];
                            if (typeof path !== 'undefined') {
                                breadcrumb = path.split('/');
                            }
                            return (
                                Component && path && (<Route key={name} element={<Component title={title} breadcrumb={breadcrumb}/>} path={path} />)
                            )
                        })}
                    </Route>
                </Route>
            )
        });

        return <ReactRoutes>{layouts}</ReactRoutes>
    }

    return Routes;
}

export default renderRoutes;