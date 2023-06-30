import React, { useState } from "react";
import { Drawer, List, Divider, Box } from "@mui/material/";
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
                classes={{
                    modal: "custom-drawer-paper",
                }}
                anchor="left"
                open={state}
                onClose={toggleDrawer(false)}
                slotProps={{
                    backdrop: {
                        className: "custom-backdrop",
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
                        {" "}
                        <Search inputClass="test"></Search>
                        <Divider sx={{ mt: "12px" }}></Divider>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}

export default HeaderSearch;
