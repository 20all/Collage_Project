import React, { Component } from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";


export const protectedRoute = ({element: Component}) => {
    const location = useLocation()
    return ApiService.isAuthenticated() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{from: location}} />
    )
}

export const MerchantRoute = ({element: Component}) => {
    const location = useLocation()
    return ApiService.isMerchant() ? (
        Component
    ) : (
        <Navigate to="/login" replace state={{from: location}} />
    )
}