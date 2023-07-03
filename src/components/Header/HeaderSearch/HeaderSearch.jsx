import { useSelector, useDispatch } from "react-redux";
import {
    Drawer,
    List,
    Divider,
    Box,
    ListItem,
    Button,
    Typography,
    Avatar,
} from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "./SeacrhComponents/Search";
import ListRecentSearches from "./SeacrhComponents/ListRecentSearches";
import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";

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
                        <Button
                            onClick={toggleDrawer}
                            sx={{
                                minWidth: "44px",
                                minHeight: "44px",
                                borderRadius: "50%",
                                "&:hover": {
                                    backgroundColor: "#F0F2F5",
                                },
                            }}
                        >
                            <ArrowBackIcon
                                style={{
                                    color: "rgb(101, 103, 107)",
                                    minWidth: "24px",
                                }}
                            />
                        </Button>
                        <Search
                            inputClass="header__drawer-searh-input"
                            inputId="header-drawer-search"
                        ></Search>
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
