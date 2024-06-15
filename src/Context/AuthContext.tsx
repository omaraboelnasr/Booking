import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { DecodedToken} from "../Interfaces/Interfaces"; 
import { ApiContext } from "./ApiContext";


export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  const {authorization}=useContext(ApiContext)

  useEffect(() => {
    if (authorization) {
        const decodedToken = jwtDecode<DecodedToken>(authorization);
        localStorage.setItem('userData' , JSON.stringify(decodedToken))
      setLoginData(decodedToken);
    }
  }, [authorization]);

  return (
    <AuthContext.Provider
      value={{ loginData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
