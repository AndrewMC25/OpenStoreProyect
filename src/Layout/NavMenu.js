"use client"
import { Box } from "@mui/material"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import { useState } from "react"

const NavMenu = () => {
    const [navMenu, setNavMenu] = useState(false)

    return(
        <Box>
            <Navbar navMenu={navMenu} setNavMenu={setNavMenu} />
            <Sidebar navMenu={navMenu} setNavMenu={setNavMenu} />
        </Box>
    )
}

export default NavMenu