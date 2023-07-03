import { useSelector, useDispatch } from "react-redux";
import { Drawer, Divider, Box, Button, Typography } from "@mui/material/";
import Search from "./SeacrhComponents/Search";
import ListRecentSearches from "./SeacrhComponents/ListRecentSearches";
import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";
import BtnArrowBack from "../../Buttons/BtnArrowBack";

function HeaderSearch() {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);

    const toggleDrawer = () => {
        dispatch(toggleVisible());
    };

    return (
        <>
            <Search
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
                <Box sx={{ width: "320px" }}>
                    <Box sx={{ display: "flex", p: 1 }}>
                        <BtnArrowBack onClick={toggleDrawer} />
                        <Search
                            inputClass="header__drawer-searh-input"
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
                            }}
                            component="h3"
                            variant="h6"
                        >
                            Recent searches
                        </Typography>
                        <ListRecentSearches onClick={toggleDrawer} />
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default HeaderSearch;
