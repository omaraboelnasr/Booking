
     import { createContext } from 'react'

     export const ApiContext = createContext(null);

     export default function ApiContextProvider (props:any) {

     let baseUrl = 'https://upskilling-egypt.com:3000/api/v0'
         
     let authorization = `${localStorage.getItem('token')}`

     return (
     <ApiContext.Provider value = {{ baseUrl , authorization }}>
     {props.children}
     </ApiContext.Provider>
     ) 
    }