import React from 'react'
import './Sidebar.css'
import { Button } from '@mui/material'
// import "../../../../App.css";

export default function Sidebar() {

  const logOut = () => {
    return localStorage.removeItem('token')
  }

  return (
    <>
      Sidebar 
      <Button onClick={logOut}>logOut</Button>
    </>
    
  )
}
