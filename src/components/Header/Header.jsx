import { useSelector } from "react-redux";
import { AppBar, Toolbar, Container, Box } from "@mui/material";
import HeaderNavigation from "./HeaderNavigation/HeaderNavigation";
import HeaderSearch from "./HeaderSearch/HeaderSearch";
import HeaderOptios from "./HeaderOptions/HeaderOptions";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import { useTheme } from "@mui/material/styles";

function Header() {
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);
    const shadow =
        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.12), 0px 1px 6px 0px rgba(0,0,0,0.12)";
    const theme = useTheme();
    return (
        <AppBar
            position="sticky"
            color="inherit"
            // sx={{
            //   boxShadow: shadow,
            // }}
            sx={{ backgroundColor: (theme) => theme.palette.backgroundColor.section }}
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
