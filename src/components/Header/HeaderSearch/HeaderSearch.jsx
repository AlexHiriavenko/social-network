import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Divider, Box } from "@mui/material/";
import Search from "./SeacrhComponents/Search";
import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";
import DrawerHead from "./SeacrhComponents/DrawerHead";
import DrawerBody from "./SeacrhComponents/DrawerBody";

function HeaderSearch() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);
    const [foundUser, setFoundUser] = useState([]);
    const toggleDrawer = () => dispatch(toggleVisible());

    return (
        <Box sx={isDrawerOpen ? { visibility: "hidden" } : {}}>
            <Search
                inputId="header-search"
                onClick={toggleDrawer}
                inputClass="header__input"
                searchIconWrapClass="header__search-icon-wrap"
                setFoundUser={setFoundUser}
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
                }}>
                <DrawerHead
                    toggleDrawer={toggleDrawer}
                    setFoundUser={setFoundUser}
                />
                <Divider
                    sx={{
                        backgroundColor:
                            theme.palette.backgroundColor.pageSeparator,
                    }}
                />
                <DrawerBody foundUser={foundUser} />
            </Drawer>
        </Box>
    );
}

export default HeaderSearch;
