import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authService from '../services/authService';

// PUBLIC_INTERFACE
/**
 * A component to protect routes that require authentication.
 * If the user is not authenticated, it redirects to the /login page.
 * Otherwise, it renders the child routes.
 */
const ProtectedRoute = () => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
