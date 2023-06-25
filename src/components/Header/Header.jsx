import React from "react";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptios from "./HeaderOptions/HeaderOptions";
import HeaderLogo from "./HeaderLogo/HeaderLogo";

function Header() {
    return (
        <AppBar position="sticky" color="inherit">
            <Container maxWidth="xl">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} disableGutters>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <HeaderLogo />
                        <HeaderSearch />
                    </Box>
                    <HeaderNavigation />
                    <HeaderOptios />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
