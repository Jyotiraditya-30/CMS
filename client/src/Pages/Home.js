import React from "react";
import Box from '@mui/material/Box';

import SideBar from "../components/Sidenav.js"
import NavBar from "../components/Navbar.js"

function Home() {
    
    return (
        <>
            <NavBar />
            <Box height={0} />
            <Box sx={{ display: "flex" }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                    <div>
                        <div style={styles.homeContainer}>
                            <div style={styles.logoContainer}>
                                <img src='./LoGo1.png' alt="Logo" style={styles.logoImage} />
                            </div>
                            <div style={styles.textContainer}>
                                <h1 style={styles.welcomeHeading}>Welcome to Contact Management System!</h1>
                                <p style={styles.description}>Please log in if you have an account, otherwise create an account.</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>
        </>

    )
}

export default Home;

const styles = {
    homeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
    },
    logoContainer: {
        marginBottom: '10px',
    },
    logoImage: {
        maxWidth: '150px',
        height: 'auto',
    },
    welcomeHeading: {
        fontSize: '32px',
        marginBottom: '10px',
    },
    description: {
        fontSize: '18px',
        color: '#666',
        textAlign: 'center',
    },
};
