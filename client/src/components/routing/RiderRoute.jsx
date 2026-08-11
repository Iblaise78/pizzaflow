import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export function RiderRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/rider/login" replace />;
  }
  if (user.role !== 'rider') {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

