import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'

export default function Layout() {
  return (
    <>
    <Navbar/> 
    <Outlet/>
    <Footer/>
    </>

  )
}
