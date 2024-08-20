import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken") !== null) {
    return props.children;
  } else {
    alert("You must be logged in to view this page.");
    return <Navigate to={'/login'} />;
  }
}
