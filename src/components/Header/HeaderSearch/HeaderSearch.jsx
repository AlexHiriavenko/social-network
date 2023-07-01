import React, { useState } from "react";
import { Drawer, List, Divider, Box, ListItem, Button } from "@mui/material/";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Search from "./Search";

function HeaderSearch() {
    const [state, setState] = useState(false);

    const toggleDrawer = (open) => () => {
        setState(open);
    };

    const handleBackdropClick = () => {
        setState(false);
    };

    const list = (
        <div style={{ backgroundColor: "green", opacity: 1 }}>
            <Search></Search>
        </div>
    );

    return (
        <>
            <Search
                onClick={toggleDrawer(true)}
                inputClass="header__input"
                searchIconWrapClass="header__search-icon-wrap"
            />
            <Drawer
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
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
                {" "}
                <Box sx={{ width: "320px" }}>
                    <List>
                        <ListItem sx={{ p: 0 }}>
                            <Button
                                onClick={handleBackdropClick}
                                sx={{ minWidth: "44px", minHeight: "44px", borderRadius: "50%" }}
                            >
                                <ArrowBackIcon
                                    style={{
                                        color: "rgb(101, 103, 107)",
                                        minWidth: "24px",
                                    }}
                                />
                            </Button>
                            <Search inputClass="header__drawer-searh-input"></Search>
                        </ListItem>
                        <Divider sx={{ mt: "12px" }}></Divider>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default HeaderSearch;
