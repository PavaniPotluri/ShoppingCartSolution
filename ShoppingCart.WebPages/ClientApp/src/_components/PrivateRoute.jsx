import React from 'react';
import { Route, RouteProps } from "react-router";
import { Login } from '../LoginPage';

export function PrivateRoute({ children, ...rest }){

    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem('auth') ? (
                    children
                ) : <Login />
            }
        />
    );
}