import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { DecodedToken} from "../Interfaces/Interfaces"; 


export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
        const decodedToken = jwtDecode<DecodedToken>(encodedToken);
        localStorage.setItem('userData' , JSON.stringify(decodedToken))
      setLoginData(decodedToken);
    }
  };

  useEffect(() => {
    saveLoginData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginData, saveLoginData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
