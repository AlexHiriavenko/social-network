import { Toolbar, Container } from "@mui/material";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptios from "./HeaderOptions/HeaderOptions";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import { AppBarStyled, FlexCenter } from "./styledHeaderComponents";

function Header() {
    return (
        <AppBarStyled position="sticky">
            <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
                <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
                    <FlexCenter>
                        <HeaderLogo />
                        <HeaderSearch />
                    </FlexCenter>
                    <HeaderNavigation />
                    <HeaderOptios />
                </Toolbar>
            </Container>
        </AppBarStyled>
    );
}
export default Header;
