import { useSelector } from "react-redux";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptios from "./HeaderOptions/HeaderOptions";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import { useTheme } from "@mui/material/styles";

function Header() {
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);
    const theme = useTheme();
    return (
        <AppBar
            position="sticky"
            color="inherit"
            sx={{
                backgroundColor: theme.palette.backgroundColor.section,
                boxShadow: theme.palette.shadow.down,
            }}
        >
            <Container maxWidth="xl" sx={{ pl: { xs: 1, sm: 2 }, pr: { xs: 1, sm: 2 } }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }} disableGutters>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <HeaderLogo />
                        <Box sx={isDrawerOpen ? { visibility: "hidden" } : {}}>
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
