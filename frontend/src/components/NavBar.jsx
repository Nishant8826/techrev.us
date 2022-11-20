import React from 'react'
import {AppBar,Toolbar,styled} from "@mui/material"
import {Link} from "react-router-dom"

const Header=styled(AppBar)`
    background:rgb(185, 64, 16);
    position:static;
`
const Tab=styled(Link)`
    color:white;
    margin:0px 20px;
    cursor:pointer;
    text-decoration:none;
`
const NavBar = () => {
  return (
    <div >
      <Header>
        <Toolbar>
            <Tab to={"/"}>AllUser</Tab>
            <Tab to={"/adduser"}>AddUser</Tab>
            <Tab to={"/deleteuser"}>DeleteUser</Tab>
            <Tab to={"/updateuser"}>UpdateUser</Tab>
        </Toolbar>
      </Header>
    </div>
  )
}

export default NavBar
