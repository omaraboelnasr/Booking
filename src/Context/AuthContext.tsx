import { createContext, PropsWithChildren, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { AuthForContext , DecodedToken} from "../Interfaces/Interfaces"; 



// Initial value for the AuthContext
export const AuthContext = createContext<AuthForContext>({
  loginData: null,
  saveLoginData: () => {},
  baseUrl: "",
  requestHeaders: {},
});

export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);
  const baseUrl = "https://upskilling-egypt.com:3003/api/v1";
  const requestHeaders = {
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };

  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("token");
    if (encodedToken) {
        const decodedToken = jwtDecode<DecodedToken>(encodedToken);
        localStorage.setItem('userData' , JSON.stringify(decodedToken))
      setLoginData(decodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) saveLoginData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loginData, saveLoginData, baseUrl, requestHeaders }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
