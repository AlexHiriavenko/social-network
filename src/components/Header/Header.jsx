import React from "react";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptios from "./HeaderOptions/HeaderOptions";
import HeaderLogo from "./HeaderLogo/HeaderLogo";

function Header() {
    return (
<<<<<<< HEAD
        <header>
            <nav>
                <ul className={s.navList}>
                    <li>
                        <NavLink to="/" className={s.navItemLink}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/watch" className={s.navItemLink}>
                            Watch Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/marketplace" className={s.navItemLink}>
                            Marketplace Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/groups" className={s.navItemLink}>
                            Groups Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={s.navItemLink}>
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
=======
        <AppBar position="sticky" color="inherit">
            <Container maxWidth="xl" sx={{ pl: { xs: 1, sm: 2 }, pr: { xs: 1, sm: 2 } }}>
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
>>>>>>> develop
    );
}
export default Header;
