import React from "react";
import { Box } from "@mui/material";
import HeaderUserOtions from "./User/HeaderUserOtions";
import HeaderNotifyOptions from "./Notify/HeaderNotifyOptions";
import HeaderMessageOptions from "./Messenger/HeaderMessageOptions";
import HeaderCreateOptions from "./Create/HeaderCreateOptions";
import HeaderMenuOptions from "./Menu/HeaderMenuOptions";

function HeaderOptions() {
    return (
        <Box sx={{ display: "flex" }}>
            <HeaderMenuOptions />
            <HeaderCreateOptions />
            <HeaderMessageOptions />
            <HeaderNotifyOptions />
            <HeaderUserOtions />
        </Box>
    );
}

export default HeaderOptions;
