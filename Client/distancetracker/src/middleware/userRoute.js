import React from 'react';
import jwt_decode from "jwt-decode";
import { Route } from 'react-router-dom';

export default function UserRoute({ Component, ...rest }) {
    return (
        <Route 
            {...rest}
            render={(props)=>{
                if(!localStorage.getItem('_jid')){
                    window.location.href = "/login";
                } else {
                    const decoded = jwt_decode(localStorage.getItem('_jid'));
                    if(decoded.role === "user" || decoded.role === "admin"){
                        return <Component />;
                    } else {
                        window.location.href = "/login";
                    }                       
                }
            }}
        />
    )
}
