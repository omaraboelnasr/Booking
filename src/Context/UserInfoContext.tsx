import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./ApiContext";
import { AuthContext } from "./AuthContext";
import axios from "axios";


export const UserInfoContext = createContext(null);
export default function UserInfoContextProvider(props) {
    const [userInfoData, setUserInfoData] = useState(null)
    const { baseUrl, authorization } = useContext(ApiContext);
    const { loginData } = useContext(AuthContext);

    const getUserInfo = async () => {
        if(loginData)
                try {
                    const response = await axios.get(`${baseUrl}/admin/users/${loginData?._id}`,
                        {
                            headers: authorization
                        })
                        console.log(response);
                    setUserInfoData(response.data.data.user)
                } catch (error) {
                    console.log(error);
                }
    }
    useEffect(()=>{
        if(loginData){
            getUserInfo()
        }
    },[loginData])
    return (
        <UserInfoContext.Provider
            value={{ userInfoData, getUserInfo }}
        >
            {props.children}
        </UserInfoContext.Provider>
    );
}