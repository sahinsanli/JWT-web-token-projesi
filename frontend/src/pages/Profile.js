import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  return user ? <h2>Merhaba, {user.name}!</h2> : <Navigate to="/login" />;
};

export default Profile;
