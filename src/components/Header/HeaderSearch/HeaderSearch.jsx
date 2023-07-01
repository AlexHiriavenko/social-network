// import React, { useState } from "react";
// import { Drawer, List, Divider, Box, ListItem, Button } from "@mui/material/";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Search from "./Search";
// import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";
// import { useSelector, useDispatch } from "react-redux";

// function HeaderSearch() {
//     const dispatch = useDispatch();
//     const toggleDrawer = () => {
//         dispatch(toggleVisible());
//     };

//     // const [state, setState] = useState(false);

//     // const toggleDrawer = (open) => () => {
//     //     setState(open);
//     // };

//     // const handleBackdropClick = () => {
//     //     setState(false);
//     // };

//     return (
//         <>
//             <Search
//                 onClick={toggleDrawer(true)}
//                 inputClass="header__input"
//                 searchIconWrapClass="header__search-icon-wrap"
//             />
//             <Drawer
//                 anchor="left"
//                 open={state}
//                 onClose={toggleDrawer(false)}
//                 slotProps={{
//                     backdrop: {
//                         style: { opacity: 0 },
//                         className: "header__search-drawer",
//                         onClick: handleBackdropClick,
//                     },
//                 }}
//                 ModalProps={{
//                     onBackdropClick: handleBackdropClick,
//                     classes: {
//                         root: "custom-backdrop",
//                     },
//                 }}
//             >
//                 {" "}
//                 <Box sx={{ width: "320px" }}>
//                     <Box sx={{ display: "flex", p: 1 }}>
//                         <Button
//                             onClick={handleBackdropClick}
//                             sx={{
//                                 minWidth: "44px",
//                                 minHeight: "44px",
//                                 borderRadius: "50%",
//                                 "&:hover": {
//                                     backgroundColor: "#F0F2F5",
//                                 },
//                             }}
//                         >
//                             <ArrowBackIcon
//                                 style={{
//                                     color: "rgb(101, 103, 107)",
//                                     minWidth: "24px",
//                                 }}
//                             />
//                         </Button>
//                         <Search inputClass="header__drawer-searh-input"></Search>
//                     </Box>
//                     <Divider sx={{ mt: "4px" }}></Divider>
//                     {/* <List>
//                         <ListItem sx={{ p: 0 }}></ListItem>
//                     </List> */}
//                 </Box>
//             </Drawer>
//         </>
//     );
// }

// export default HeaderSearch;

import React from "react";
import { Drawer, List, Divider, Box, ListItem, Button } from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "./Search";
import { toggleVisible } from "../../../redux/searchDrawer.slice/headerSearch.slice";
import { useSelector, useDispatch } from "react-redux";

function HeaderSearch() {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.searchDrawer.isVisible);

    const toggleDrawer = () => {
        dispatch(toggleVisible());
    };

    const handleBackdropClick = () => {
        dispatch(toggleVisible());
    };

    return (
        <>
            <Search
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
                        className: "header__search-drawer",
                        onClick: handleBackdropClick,
                    },
                }}
                ModalProps={{
                    onBackdropClick: handleBackdropClick,
                    classes: {
                        root: "custom-backdrop",
                    },
                }}
            >
                <Box sx={{ width: "320px" }}>
                    <Box sx={{ display: "flex", p: 1 }}>
                        <Button
                            onClick={handleBackdropClick}
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
                        <Search inputClass="header__drawer-searh-input"></Search>
                    </Box>
                    <Divider sx={{ mt: "4px" }}></Divider>
                </Box>
            </Drawer>
        </>
    );
}

export default HeaderSearch;
