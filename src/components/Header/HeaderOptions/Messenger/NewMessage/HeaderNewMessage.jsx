import { useState } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchForHomePage from "../../../../Search/SearchForHomePage";
import GlobalUsersList from "./GlobalUsersList";
import NewMessageHeader from "./NewMessageHeader";

function HeaderNewMessage(props) {
    const theme = useTheme();
    const { setNewMessageModal } = props;
    const [foundUser, setFoundUser] = useState([]);

    return (
        <>
            <NewMessageHeader setNewMessageModal={setNewMessageModal} />
            <Box sx={{ p: 1 }}>
                <SearchForHomePage setFoundUser={setFoundUser} />
                <GlobalUsersList users={foundUser} />
            </Box>
        </>
    );
}

export default HeaderNewMessage;
