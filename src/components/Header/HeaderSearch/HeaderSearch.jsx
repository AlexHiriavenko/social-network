import { useSelector, useDispatch } from "react-redux";
import { Drawer, Divider, Box, Button, Typography } from "@mui/material/";
import Search from "./SeacrhComponents/Search";
import ListRecentSearches from "./SeacrhComponents/ListRecentSearches";
import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";
import BtnArrowBack from "../../Buttons/BtnArrowBack";
import { useTheme } from "@mui/material/styles";
import {useState} from "react";
import SearchForHomePage from "../../Search/SearchForHomePage.jsx";

function HeaderSearch() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);
    const[foundUser,setFoundUser] = useState([])
    const toggleDrawer = () => {
        dispatch(toggleVisible());
    };

    return (
        <><Search
            inputId="header-search"
            onClick={toggleDrawer}
            inputClass="header__input"
            searchIconWrapClass="header__search-icon-wrap"
        />

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer}
                slotProps={{
                    backdrop: {
                        style: { opacity: 0 },
                        onClick: toggleDrawer,
                    },
                }}
                ModalProps={{
                    onBackdropClick: toggleDrawer,
                    classes: {
                        root: "custom-backdrop",
                    },
                }}
            >
                <Box
                    sx={{
                        width: { xs: "320px", sm: "360px" },
                        backgroundColor: theme.palette.backgroundColor.section,
                        minHeight: "100%",
                    }}
                >
                    <Box sx={{ display: "flex", p: 1 }}>
                        <BtnArrowBack
                            onClick={toggleDrawer}
                            color={theme.palette.textColor.secondary}
                            hoverColor={theme.palette.input.mainBackground}
                        />
                        <Search
                            inputClass="header__drawer-searh-input"
                            searchIconWrapClass="drawer__search-icon-wrap"
                            inputId="header-drawer-search"
                        />

                    </Box>
                    <Divider sx={{ mt: "4px" }} />
                    <Box>
                        <Typography
                            sx={{
                                flexGrow: 1,
                                p: 2,
                                fontFamily: "Segoe UI Bold",
                                color: theme.palette.textColor.content,
                            }}
                            component="h3"
                            variant="h6"
                        >
                            Recent searches

                        </Typography>

                        <SearchForHomePage

                            setFoundUser ={setFoundUser}/>

                        <ListRecentSearches onClick={toggleDrawer} users={foundUser} />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default HeaderSearch;
/*
 */