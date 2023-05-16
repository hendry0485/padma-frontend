import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Navbar';
import "./layout.css"
import Container from 'react-bootstrap/Container';


const MainLayout = () => {
  return (
    <>
      <div id="pageContainer" >
        <Navbar/>
        <Outlet/>
      </div>
    </>
  )
}

export default MainLayout;