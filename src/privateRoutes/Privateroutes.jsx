import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuth); // Adjust this based on your Redux state

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoutes;