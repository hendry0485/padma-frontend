import { useState } from "react";
import { useMemo } from "react";
import { createContext, useContext } from "react"
import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext();

const AuthProvider = ({chidren}) => {
  const [user, setUser] = useLocalStorage("user",null);
  const navigate = useNavigate();

  const login = async(data) => {
    setUser(data);
    navigate("/dashboard",{replace:true});
  };

  const logout = () => {
    setUser(null);
    navigate("/login",{replace:true});
  }

  const value = useMemo(() => ({
    user,
    login,
    logout
  },[user]));

  return <AuthContext.Provider></AuthContext.Provider>
}

export default function useAuthUser() {
  
  return (
    <div>useAuthUser</div>
  )
}
