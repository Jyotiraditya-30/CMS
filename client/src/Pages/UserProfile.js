import React from "react";
import Box from '@mui/material/Box';

import SideBar from "../components/Sidenav.js"
import NavBar from '../components/Navbar.js'

import DeleteAccount from "../components/User/AccoutDelete.js";
import UpdateAccount from "../components/User/AccountUpdate.js";

function UserProfile() {

    return (
        <>
        <NavBar />
        <Box height = {30} />
          <Box sx = {{display: "flex"}}>
            <SideBar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <UpdateAccount />
                <DeleteAccount/>                
            </Box>
            </Box> 
        </>

    )
}

export default UserProfile;
