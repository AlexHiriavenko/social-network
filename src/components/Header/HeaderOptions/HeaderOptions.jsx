import React, { useState } from "react";
import { Box } from "@mui/material";
import HeaderUserOtions from "./HeaderOptions/HeaderUserOtions";
import HeaderNotifyOptions from "./HeaderOptions/HeaderNotifyOptions";
import HeaderMessageOptions from "./HeaderOptions/HeaderMessageOptions";
import HeaderCreateOptions from "./HeaderOptions/HeaderCreateOptions";
import HeaderMenuOptions from "./HeaderOptions/HeaderMenuOptions";

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
