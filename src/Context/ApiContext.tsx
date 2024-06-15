
     import { createContext, useEffect, useState } from 'react'

     export const ApiContext = createContext(null);

     export default function ApiContextProvider (props:any) {
     const token = localStorage.getItem('token')
     const [authorization,setAuthorization]=useState(token)
     let baseUrl = 'https://upskilling-egypt.com:3000/api/v0'

     return (
     <ApiContext.Provider value = {{ baseUrl , authorization,setAuthorization }}>
     {props.children}
     </ApiContext.Provider>
     ) 
    }