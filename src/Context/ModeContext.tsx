     import { createContext, useState } from 'react'

     export const ModeContext = createContext(null);

     export default function ModeContextProvider (props:any) {

       let [mode, setMode] = useState('')
       
         return (
             <ModeContext.Provider value={{ mode , setMode  }}>
                 {props.children}
             </ModeContext.Provider>
      ) 
    }