import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Divider } from "@mui/material/";
import Search from "./SeacrhComponents/Search";
import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";
import DrawerHead from "./SeacrhComponents/DrawerHead";
import DrawerBody from "./SeacrhComponents/DrawerBody";

function HeaderSearch() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);
    const [foundUser, setFoundUser] = useState([]);
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
                    classes: {
                        root: "custom-backdrop",
                    },
                }}
            >
                <DrawerHead toggleDrawer={toggleDrawer} setFoundUser={setFoundUser} />
                <Divider
                    sx={{
                        mt: "4px",
                        backgroundColor: theme.palette.backgroundColor.pageSeparator,
                    }}
                />
                <DrawerBody toggleDrawer={toggleDrawer} foundUser={foundUser} />
            </Drawer>
        </>
    );
}

export default HeaderSearch;
