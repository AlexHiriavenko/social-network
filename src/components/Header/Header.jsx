import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptios from "./HeaderOptions/HeaderOptions";
import HeaderLogo from "./HeaderLogo/HeaderLogo";

function Header() {
    const isSearchDrawerON = useSelector((state) => state.searchDrawer.isVisible);

    return (
        <AppBar position="sticky" color="inherit">
            <Container maxWidth="xl" sx={{ pl: { xs: 1, sm: 2 }, pr: { xs: 1, sm: 2 } }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} disableGutters>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <HeaderLogo />
                        <Box sx={isSearchDrawerON ? { visibility: "hidden" } : {}}>
                            <HeaderSearch />
                        </Box>
                    </Box>
                    <HeaderNavigation />
                    <HeaderOptios />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
