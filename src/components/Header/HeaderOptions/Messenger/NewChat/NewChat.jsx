import { useState } from "react";
import { Box } from "@mui/material";
import SearchForHomePage from "../../../../Search/SearchForHomePage";
import GlobalUsersList from "./GlobalUsersList";
import NewChatHead from "./NewChatHead";

function NewChat(props) {
    const { setNewMessageModal } = props;
    const [foundUser, setFoundUser] = useState([]);

    return (
        <>
            <NewChatHead setNewMessageModal={setNewMessageModal} />
            <Box sx={{ p: 1 }}>
                <SearchForHomePage setFoundUser={setFoundUser} />
                <GlobalUsersList users={foundUser} setNewMessageModal={setNewMessageModal} />
            </Box>
        </>
    );
}

export default NewChat;
