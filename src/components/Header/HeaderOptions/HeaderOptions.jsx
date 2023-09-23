import React from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import HeaderUserOtions from "./User/HeaderUserOtions";
import HeaderNotifyOptions from "./Notify/HeaderNotifyOptions";
import HeaderMessageOptions from "./Messenger/HeaderMessageOptions";
import HeaderCreateOptions from "./Create/HeaderCreateOptions";

function HeaderOptions() {
    const location = useLocation();
    const isChatsPage = location.pathname === "/chats";

    return (
        <Box sx={{ display: "flex" }}>
            <HeaderCreateOptions />
            {!isChatsPage && <HeaderMessageOptions />}
            <HeaderNotifyOptions />
            <HeaderUserOtions />
        </Box>
    );
}

export default HeaderOptions;
